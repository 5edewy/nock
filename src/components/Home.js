import React, { Component } from 'react';
import {
    View, Text, Image, TouchableWithoutFeedback, Animated, Alert, Easing, FlatList, Modal, KeyboardAvoidingView, Platform, Linking
} from 'react-native'
import { Button, Card, Container, Content, Icon, Input, Row, Thumbnail } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { Actions } from 'react-native-router-flux';

import { userApi, otherApi, changeValue, clearUser } from '../actions';
import { Spinner } from './Assets/common';
import { connect } from 'react-redux';
import { L } from '../Config';
import AsyncStorage from '@react-native-community/async-storage';
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';

const linkData = [
    { name: 'textme', key: 'textme', image: require('./Assets/images/text.png'), link: 'sms:', pattern: '' },
    { name: 'contact', key: 'contact', image: require('./Assets/images/contact.png'), link: 'tel:', pattern: '' },
    { name: 'E-mail', key: 'mail', image: require('./Assets/images/email.png'), link: 'mailto:', pattern: '' },
    {
        name: 'WhatsApp', key: 'wechat', image: require('./Assets/images/wechat.png'),
        link: 'https://wa.me/', pattern: ''
    },
    {
        name: 'Location', key: 'Location', image: require('./Assets/images/Location.png'),
        link: 'https://', pattern: 'https://'
    },
    {
        name: 'Facebook', key: 'face', image: require('./Assets/images/facebook.png'),
        link: 'https://facebook.com/', pattern: '.com/'
    },
    {
        name: 'Linkedin', key: 'Linkedin', image: require('./Assets/images/Linkedin.png'),
        link: 'https://linkedin.com/in/', pattern: 'in/'
    },
    {
        name: 'Instagram', key: 'insta', image: require('./Assets/images/insta.png'),
        link: 'https://instagram.com/', pattern: '.com/'
    },
    {
        name: 'Snap chat', key: 'snap', image: require('./Assets/images/Snapchat.png'),
        link: 'https://snapchat.com/add/', pattern: 'add/'
    },
    {
        name: 'Twitter', key: 'twit', image: require('./Assets/images/twiiter.png'),
        link: 'https://twitter.com/', pattern: '.com/'
    },
    {
        name: 'Youtube', key: 'Youtube', image: require('./Assets/images/Youtube.png'),
        link: 'https://www.youtube.com/channel/', pattern: 'channel/'
    },
    {
        name: 'Sound Cloud', key: 'sound', image: require('./Assets/images/sound.png'),
        link: 'https://soundcloud.com/', pattern: '.com/'
    },
    {
        name: 'tik-tok', key: 'tik-tok', image: require('./Assets/images/tik-tok.png'),
        link: 'https://vm.tiktok.com/', pattern: '.com/'
    },
    {
        name: 'Othet link', key: 'otherlink', image: require('./Assets/images/otherlink.png'),
        link: 'https://', pattern: 'https://'
    },
    {
        name: 'Website', key: 'Website', image: require('./Assets/images/website.png'),
        link: 'https://', pattern: 'https://'
    },
    {
        name: 'Resume', key: 'Resume', image: require('./Assets/images/Resume.png'),
        link: 'https://', pattern: 'https://'
    },
    {
        name: 'Menu', key: 'Menu', image: require('./Assets/images/menu_f.png'),
        link: 'https://', pattern: 'https://'
    },
]
function buildUrlPayload(valueToWrite) {
    return Ndef.encodeMessage([
        Ndef.uriRecord(valueToWrite),
    ]);
}
class Home extends Component {

    state = {
        scanButton: new Animated.Value(wp(L('scanOpenStart'))),
        openSideMenu: new Animated.Value(wp(L("sidemenu"))),
        addLinkModal: false,
        selectedLink: null,
        selectedLinkImage: {},
        modalPage: 1,
        log: "Ready...",
        text: "",
        key: '',
        social: [],
        nockedTag: false,
        nockedSocail: []
    }
    async componentDidMount() {


        NfcManager.start();
        try {
            const val = await AsyncStorage.getItem('user')
            const user = JSON.parse(val)
            // console.log(user);
            if (user) {

                this.props.changeValue({ user })
                this.getData()


                Animated.timing(this.state.scanButton, {
                    toValue: wp(L('scanOpen')), duration: 1000, easing: Easing.ease, useNativeDriver: true
                }).start()
            }
        } catch (error) {

        }

    }
    getData() {
        const { user, userApi } = this.props
        userApi('GET', 'getSocialMedia/' + user.username, '', user.access, 'socail')
    }

    onChangeText = (text) => {
        this.setState({
            text
        })
    }
    saveSocial2() {
        let { text, key } = this.state
        let { minSocial, changeValue } = this.props
        this.removeSocail(key, true)


        if (text) {
            const object = this.filterObject(key)
            if (object && object.pattern != '') {
                const urlArr = text.split(object.pattern)
                if (urlArr && urlArr.length > 1) {
                    text = urlArr[1]
                } else {
                    text = urlArr[0]
                }
            }
            if (typeof (text) == 'number') {
                text = text.toString()
            }
            // console.log(typeof (text) == 'number');
            const data = { media_name: key, account: text }
            minSocial.push(data)
            changeValue({ minSocial })
            this.setState({ modalPage: 1, text: '', selectedLink: null, key: '' })

        } else {
            this.setState({ modalPage: 1, text: '', selectedLink: null, key: '' })
        }

    }

    writeData = async () => {
        const { user } = this.props

        if (!user.username) {
            Alert.alert("Nothing to write");
            return;
        }
        try {
            let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {

                alertMessage: 'Ready to write some NFC tags!'
            });

            // console.log(resp);
            let ndef = await NfcManager.getNdefMessage();
            // console.log(ndef);
            let bytes = buildUrlPayload("https://nockapp.net/ar/users/shipProfile/" + user.username);
            await NfcManager.writeNdefMessage(bytes);
            // console.log('successfully write ndef');
            await NfcManager.setAlertMessageIOS('Your Ship Is Ready To Use');
            Actions.pop()
            this._cleanUp();
        } catch (ex) {
            await NfcManager.setAlertMessageIOS(ex.toString());
            // console.log('ex', ex);
            this._cleanUp();
        }
    }
    componentWillUnmount() {
        this._cleanUp();
    }

    _cleanUp = () => {
        NfcManager.cancelTechnologyRequest().catch(() => 0);
    }

    // componentDidUpdate() {
    //     const { nockedSocail, updateNocked, changeValue, nockedSocailUser } = this.props
    //     if (nockedSocail && updateNocked) {

    //         Actions.push('Myprofile', { profile: nockedSocail, userProfile: nockedSocailUser })
    //         changeValue({ updateNocked: false, nockedSocail: null, userProfile: null })
    //         // this.setState({ nockedTag: true })
    //     }
    // }
    _sidemenuOn() {
        Animated.timing(this.state.openSideMenu, {
            toValue: L("sidemenuTovalue"), duration: 500, useNativeDriver: true, easing: Easing.ease
        }).start()
    }
    _sidemenuOff() {
        Animated.timing(this.state.openSideMenu, {
            toValue: wp(L("sidemenu")), duration: 300, useNativeDriver: true, easing: Easing.back()
        }).start()
    }


    _renderSocialMedia = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={() => this.setState({
                selectedLink: item.name,
                selectedLinkImage: item.image,
                key: item.key,
                modalPage: 2
            })}>
                <View style={{ marginVertical: hp(2), marginHorizontal: wp(4) }}>
                    {/* <Thumbnail source={item.image} /> */}
                    <Image source={item.image} style={styles.socialImage} />
                </View>
            </TouchableWithoutFeedback>
        )
    }
    removeSocail(key, update) {
        let { minSocial, changeValue } = this.props
        for (let i = 0; i < minSocial.length; i++) {
            const element = minSocial[i];
            if (key == element.media_name) {
                minSocial.splice(i, 1)
            }
        }
        changeValue({ minSocial })
        if (!update) {
            this.setState({ modalPage: 1, text: '', selectedLink: null, key: '' })
        }
    }
    handelOpenUrl(url, type) {
        const object = this.filterObject(type)
        if (object && object.link) {
            let link = object.link + url
            if (object.pattern != '') {
                const urlArr = url.split(object.pattern)
                if (urlArr && urlArr.length > 1) {
                    link = object.link + urlArr[1]
                }
                // console.log(link, url, object, urlArr);
            }

            Linking.openURL(link)
        }

    }
    filterObject(item, type) {
        let object = null
        if (type == 'socail') {
            object = linkData.filter((it) => it.key == item && it.key != "textme" && it.key != "contact")[0]
        } else if (type == 'textme') {
            object = linkData.filter((it) => it.key == item && it.key == "textme")[0]
        } else if (type == 'contact') {
            object = linkData.filter((it) => it.key == item && it.key == "contact")[0]
        } else {
            object = linkData.filter((it) => it.key == item)[0]
        }
        // console.clear();
        // console.log(item, object);
        return object
    }
    filterSocail(item) {
        const { minSocial } = this.props
        let object
        object = minSocial.filter((it) => it.media_name == item)[0]
        // console.clear();
        // console.log(object);
        return object
    }
    _renderLoading() {
        const { loading, loadingOthers } = this.props

        return <Spinner size='large' visible={loading || loadingOthers ? true : false} />;

    }
    saveSocial() {
        const { userApi, minSocial, user } = this.props
        if (!user) {
            Alert.alert(L('loginFirst'))
            return
        }
        userApi('POST', 'addSocialMedia', { social: minSocial }, user.access, 'socail')
        this.setState({ modalPage: 1, text: '', selectedLink: null, key: '', addLinkModal: false })
    }
    async outLog() {
        // console.log('sdds');
        try {
            await AsyncStorage.removeItem('user');
            this.props.clearUser()
            Actions.reset('auth');
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        const { key, text, nockedTag } = this.state
        const { user, minSocial, nockedSocail, nockedSocailUser } = this.props
        // console.log(user);
        return (
            <Container>


                <View style={styles.blackViewForHome}>


                    <View>
                        <TouchableWithoutFeedback onPress={() => this._sidemenuOn()}>
                            <Image style={styles.SideMenuIcon}
                                source={require('./Assets/images/menu.png')} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={styles.personalImage}
                            source={
                                user && user.photo ? { uri: user.photo } : require('./Assets/images/man.png')
                            } />
                        <View style={{ marginHorizontal: wp(2) }}>
                            <Text style={styles.regWhiteText} >{user && user.name}</Text>
                            <Text style={styles.regWhiteText}>{user && user.nock_count} Nock</Text>
                        </View>
                    </View>
                    {user ?
                        <TouchableWithoutFeedback onPress={this.writeData/*Actions.push('Scan', { user })*/}>
                            <View>
                                <Image style={styles.SideMenuIcon}
                                    source={require('./Assets/images/scan.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                        : <View />}

                </View>
                <Content>

                    <View style={{ ...styles.View90, marginTop: hp(3) }}>



                        <Text style={styles.boldDarkText} >{L('My Social Links')}</Text>

                        <View style={styles.viewForSocialImage}>
                            {minSocial.map((item, index) => {
                                const social = this.filterObject(item.media_name, 'socail')
                                if (social) {
                                    return (
                                        <TouchableWithoutFeedback key={index} onPress={() => this.handelOpenUrl(item.account, item.media_name == 'mail' ? 'mail' : item.media_name)}>
                                            <View style={{ marginVertical: hp(1), marginHorizontal: wp(1) }}>
                                                <Image source={social.image} style={styles.socialImage} />
                                                {/* <Thumbnail source={social.image} /> */}
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                }

                            })}
                        </View>
                        <TouchableWithoutFeedback onPress={() => this.setState({ addLinkModal: true })}>
                            <View style={styles.addLinkView}>
                                <Image style={styles.addImage}
                                    source={require('./Assets/images/addLink.png')} />
                                <Text style={{
                                    ...styles.lightDarkText,
                                    fontSize: wp(3.1), paddingLeft: wp(1)
                                }}>{L('Add Link')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{ marginTop: hp(2) }}>
                            <Text style={styles.boldDarkText} >{L('Text me')}</Text>
                            <View style={styles.viewForSocialImage}>
                                {minSocial.map((item, index) => {
                                    const social = this.filterObject(item.media_name, 'textme')
                                    if (social) {
                                        return (
                                            <TouchableWithoutFeedback key={index} onPress={() => this.handelOpenUrl(item.account, "textme")}>
                                                <View style={{ marginVertical: hp(1), marginHorizontal: wp(1) }}>
                                                    {/* <Thumbnail source={social.image} /> */}
                                                    <Image source={social.image} style={styles.socialImage} />
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    }

                                })}
                            </View>

                        </View>

                        <View style={{ marginTop: hp(2) }}>
                            <Text style={styles.boldDarkText} >{L('My Contacts')}</Text>
                            <View style={styles.viewForSocialImage}>
                                {minSocial.map((item, index) => {
                                    const social = this.filterObject(item.media_name, 'contact')
                                    if (social) {
                                        return (
                                            <TouchableWithoutFeedback key={index} onPress={() => this.handelOpenUrl(item.account, 'contact')}>
                                                <View style={{ marginVertical: hp(1), marginHorizontal: wp(1) }}>
                                                    <Image source={social.image} style={styles.socialImage} />
                                                    {/* <Thumbnail source={social.image} /> */}
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    }

                                })}
                            </View>
                        </View>


                    </View>

                </Content>

                <Animated.View style={{
                    ...styles.sidemenuAnimatedView,
                    transform: [{ translateX: this.state.openSideMenu }]
                }} >
                    <Card style={styles.sideMenuContent}>


                        <View style={styles.dairaSwda} />
                        <View style={styles.viewForSideMenu}>

                            <View style={{
                                flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                alignSelf: 'center', borderRadius: wp(8), borderWidth: 2, borderColor: '#fff'
                            }}>
                                <Image style={styles.personalImage}
                                    source={
                                        user && user.photo ? { uri: user.photo } : require('./Assets/images/man.png')
                                    } />
                                <View style={{ marginHorizontal: wp(2) }}>
                                    <Text style={styles.regDarlText} >{user && user.name}</Text>
                                    {/* <Text style={styles.regDarlText}>43 pops</Text> */}
                                </View>
                            </View>
                            <View style={styles.lineGray} />

                            <Button onPress={() => { this._sidemenuOff(), Actions.BuyChips() }}
                                style={styles.sideMenuButton}>
                                <Image style={styles.iconInButton}
                                    source={require('./Assets/images/buy.png')} />
                                <Text style={{ ...styles.midWhiteTextForMainButton, fontSize: wp(3.8) }}>{L('Buy Chips')}</Text>
                            </Button>


                            <View style={styles.lineForImageandName}>
                                <Image style={styles.pageIcon}
                                    source={require('./Assets/images/homei.png')} />
                                <Text style={styles.regDarlText}>{L('Home')}</Text>
                            </View>
                            {user ?
                                <View style={{ alignSelf: 'flex-start', justifyContent: 'flex-end' }}>
                                    <TouchableWithoutFeedback onPress={this.writeData/*() => Actions.push('Scan', { user })*/}>
                                        <View style={styles.lineForImageandName}>
                                            <Icon name="qrcode" type='FontAwesome5' style={{ fontSize: wp(6), marginRight: wp(5) }} />
                                            <Text style={styles.regDarlText}>{L('Activate Nock')}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => Actions.push('EditMyProfile')}>
                                        <View style={styles.lineForImageandName}>
                                            <Icon name="user-edit" type='FontAwesome5' style={{ fontSize: wp(6), marginRight: wp(5) }} />
                                            <Text style={styles.regDarlText}>{L('My Profile')}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => Actions.push('MyAdress')}>
                                        <View style={styles.lineForImageandName}>
                                            <Icon name="address" type='Entypo' style={{ fontSize: wp(6), marginRight: wp(5) }} />
                                            <Text style={styles.regDarlText}>{L('My Address')}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => Actions.push('MyOrders')}>
                                        <View style={styles.lineForImageandName}>
                                            <Icon name="shopping-cart" type='FontAwesome' style={{ fontSize: wp(6), marginRight: wp(5) }} />
                                            <Text style={styles.regDarlText}>{L('My Orders')}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => Actions.push('Favorite')}>
                                        <View style={styles.lineForImageandName}>
                                            <Icon name="bookmark" type='FontAwesome5' style={{ fontSize: wp(6), marginRight: wp(5) }} />
                                            <Text style={styles.regDarlText}>{L('favorite')}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View> :

                                <TouchableWithoutFeedback onPress={() => Actions.reset('auth')}>
                                    <View style={styles.lineForImageandName}>
                                        <Icon name="user-o" type='FontAwesome' style={{ fontSize: wp(6), marginRight: wp(5) }} />
                                        <Text style={styles.regDarlText}>{L('SignUp')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>

                            }

                            <TouchableWithoutFeedback onPress={() => Actions.reset('language')}>
                                <View style={styles.lineForImageandName}>
                                    <Icon name="language" type='FontAwesome' style={{ fontSize: wp(6), marginRight: wp(5) }} />
                                    <Text style={styles.regDarlText}>{L('Language')}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => Actions.push('ConactUS')}>
                                <View style={styles.lineForImageandName}>
                                    <Icon name="phone" type='FontAwesome' style={{ fontSize: wp(6), marginRight: wp(5) }} />
                                    <Text style={styles.regDarlText}>{L('Contact US')}</Text>
                                </View>
                            </TouchableWithoutFeedback>



                            {/* <TouchableWithoutFeedback onPress={() => { this._sidemenuOff(), Actions.Rests() }}>
                                <View style={styles.lineForImageandName}>
                                    <Image style={styles.pageIcon}
                                        source={require('./Assets/images/salad.png')} />
                                    <Text style={styles.regDarlText}>Restaurants</Text>
                                </View>
                            </TouchableWithoutFeedback> */}




                            <View style={{ ...styles.lineGray, marginTop: hp(8) }} />
                            {user ?
                                <TouchableWithoutFeedback onPress={() => this.outLog()}>
                                    <View style={{ ...styles.lineForImageandName, alignSelf: 'center', marginTop: hp(1) }}>
                                        <Image style={styles.pageIcon}
                                            source={require('./Assets/images/out.png')} />
                                        <Text style={styles.regDarlText}>{L('Logout')}</Text>
                                    </View>
                                </TouchableWithoutFeedback> : null}

                        </View>
                    </Card>
                    <TouchableWithoutFeedback
                        onPress={() => this._sidemenuOff()}>
                        <View style={{ width: wp(30), height: hp(100), }} />


                    </TouchableWithoutFeedback>
                </Animated.View>
                {/*user ?
                    <Animated.View style={{ position: 'absolute', top: hp(25), justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', transform: [{ translateX: this.state.scanButton }] }} >
                        <TouchableWithoutFeedback onPress={this.readData}>


                            <View style={{ width: wp(11), height: wp(11), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: wp(2) }}>
                                <Image style={styles.SideMenuIcon}
                                    source={require('./Assets/images/scan.png')} />
                            </View>

                        </TouchableWithoutFeedback>
                </Animated.View> : null*/}
                <Modal
                    presentationStyle="overFullScreen"
                    animationType="slide"
                    transparent={true}
                    visible={this.state.addLinkModal}
                // onRequestClose={() => {
                //     Alert.alert("Modal has been closed.");
                // }}
                >
                    <View style={styles.modalViewI}>
                        <TouchableWithoutFeedback onPress={() => this.setState({
                            addLinkModal: false,
                            modalPage: 1
                        })}>
                            <View style={{ height: hp(40) }}></View>
                        </TouchableWithoutFeedback>
                        <KeyboardAvoidingView behavior='padding' >


                            <View style={styles.modalViewII}>
                                {this.state.modalPage == 2 ?
                                    <View>
                                        <Text style={{
                                            ...styles.boldDarkText, marginLeft: wp(5),
                                            marginVertical: hp(2)
                                        }}>{L('Enter your')} {this.state.selectedLink} {L('link')}</Text>

                                        <View style={styles.modalViewIII}>
                                            {/* <Thumbnail source={this.state.selectedLinkImage} /> */}
                                            <Image source={this.state.selectedLinkImage} style={styles.socialImage} />
                                            <Input
                                                style={{
                                                    width: wp(70), marginLeft: wp(1), ...styles.lightDarkText
                                                }}
                                                value={this.filterSocail(key) ? this.filterSocail(key).account : text}
                                                editable={this.filterSocail(key) && this.filterSocail(key).account ? false : true}
                                                onChangeText={this.onChangeText}
                                                placeholder={this.state.selectedLink + " link..."}
                                                placeholderTextColor="#adb0b4" />
                                        </View>
                                        {this.filterSocail(key) && this.filterSocail(key).account ?
                                            <View style={{ ...styles.rowAlignsentre, width: wp(84), alignSelf: 'center', marginTop: hp(3) }}>
                                                <TouchableWithoutFeedback onPress={() => this.handelOpenUrl(this.filterSocail(key).account, key)}>
                                                    <View style={{ ...styles.rowAlignsentre }}>
                                                        <Image style={styles.icondelete}
                                                            source={require('./Assets/images/link.png')} />
                                                        <Text style={{ ...styles.regDarlText }}>{L('Open Link')}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                <TouchableWithoutFeedback onPress={() => this.removeSocail(key)}>
                                                    <View style={{
                                                        ...styles.rowAlignsentre, marginLeft: wp(6),
                                                    }} >
                                                        <Image style={styles.icondelete}
                                                            source={require('./Assets/images/delete.png')} />
                                                        <Text style={{ ...styles.regDarlText, color: '#e44040' }}>{L('Delete')}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                            : null}
                                        <Button style={{ ...styles.mainDarkButton, marginTop: hp(15), marginBottom: hp(3) }} onPress={() => this.saveSocial2()}>
                                            <Text style={styles.midWhiteTextForMainButton}>{L('Save Link')}</Text>
                                        </Button>


                                    </View>
                                    : this.state.modalPage == 1 ? <View>
                                        <Text style={{
                                            ...styles.boldDarkText, marginLeft: wp(5),
                                            marginVertical: hp(2)
                                        }}>{L('Choose a social link to add')}</Text>




                                        <FlatList
                                            style={{ alignSelf: 'center' }}
                                            data={linkData}
                                            numColumns={4}
                                            renderItem={this._renderSocialMedia}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                        <Button style={{ ...styles.mainDarkButton, marginTop: hp(15), marginBottom: hp(3) }} onPress={() => this.saveSocial()}>
                                            <Text style={styles.midWhiteTextForMainButton}>{L('Save Link')}</Text>
                                        </Button>
                                    </View> : null}


                            </View>




                        </KeyboardAvoidingView>
                    </View>
                </Modal>

                {this._renderLoading()}
            </Container>
        );
    }
}
const mapStateToProps = ({ auth }) => {
    const { user, loading, minSocial, updateNocked, nockedSocailUser, nockedSocail } = auth

    return { user, loading, minSocial, updateNocked, nockedSocailUser, nockedSocail };
};

export default connect(mapStateToProps, { userApi, otherApi, changeValue, clearUser })(Home);

