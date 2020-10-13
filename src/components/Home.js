import React, { Component } from 'react';
import {
    View, Text, Image, TouchableWithoutFeedback, Animated, Alert, Easing, FlatList, Modal, TextInput, Platform, Linking
} from 'react-native'
import { Button, Card, Container, Content, Input, Row } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { Actions } from 'react-native-router-flux';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { joinArrayObjs, convertArrayObjs, buildUrlPayload, byteToString } from '../Config';
import { userApi, otherApi, changeValue } from '../actions';
import { Spinner } from './Assets/common';
import { connect } from 'react-redux';
import { L } from '../Config';
import AsyncStorage from '@react-native-community/async-storage';

const linkData = [
    { name: 'Snap chat', key: 'snap', image: require('./Assets/images/Snapchat.png') },
    { id: 2, name: 'Apple', key: 'apple', image: require('./Assets/images/Apple.png') },
    // { id: 3, name: 'Android', key: 'android', image: require('./Assets/images/Android.png') },
    // { id: 4, name: 'Html5', key: 'html', image: require('./Assets/images/html.png') },
    // { id: 5, name: 'Bitcoin', key: 'bitccoin', image: require('./Assets/images/Bitcoin.png') },
    { name: 'contact', key: 'contact', image: require('./Assets/images/contact.png') },
    // { name: 'Apple', key: 'apple', image: require('./Assets/images/Apple.png') },
    { name: 'Spotify', key: 'spotify', image: require('./Assets/images/Spotify.png') },
    { name: 'Telegram', key: 'telgram', image: require('./Assets/images/Telegram.png') },
    { name: 'textme', key: 'textme', image: require('./Assets/images/textme.png') },
    { name: 'google', key: 'google', image: require('./Assets/images/googlr.png') },
    { name: 'Dropbox', key: 'dropbox', image: require('./Assets/images/Dropbox.png') },
    // { id: 13, name: 'html', key: 'html', image: require('./Assets/images/html.png') },
    { name: 'mail', key: 'mail', image: require('./Assets/images/mail.png') },
    { name: 'Skype', key: 'sky', image: require('./Assets/images/Skype.png') },
    { name: 'Linkedin', key: 'linkedin', image: require('./Assets/images/Linkedin.png') },
    { name: 'Facebook', key: 'face', image: require('./Assets/images/face.png') },
    { name: 'Twitter', key: 'twit', image: require('./Assets/images/twit.png') },
    { name: 'Instagram', key: 'insta', image: require('./Assets/images/insta.png') },


]
class Home extends Component {

    state = {
        scanButton: new Animated.Value(wp(100)),
        openSideMenu: new Animated.Value(wp(-100)),
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
    componentDidMount() {
        const { user, userApi } = this.props
        userApi('GET', 'getSocialMedia/' + user.username, '', user.access, 'socail')
        NfcManager.start();

        Animated.timing(this.state.scanButton, {
            toValue: wp(88), duration: 1000, easing: Easing.ease, useNativeDriver: true
        }).start()
    }
    componentWillUnMount() {
        this.cleanUp();
    }
    cleanUp = () => {
        NfcManager.cancelTechnologyRequest().catch(() => 0);
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
            // console.log(typeof (text), typeof (text) == "number");
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


    readData = async () => {
        try {
            let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
            let resp = await NfcManager.requestTechnology(tech, {
                alertMessage: "Ready for magic"
            });
            let cmd = Platform.OS === 'ios' ? NfcManager.sendMifareCommandIOS : NfcManager.transceive;
            // console.log(resp);
            resp = await cmd([0x3A, 4, 4])
            let payloadLength = parseInt(resp.toString().split(",")[1]);
            let payloadPages = Math.ceil(payloadLength / 4);
            let startPage = 5;
            let endPage = startPage + payloadPages - 1;
            resp = await cmd([0x3A, startPage, endPage]);
            // console.log('resp', resp);
            let bytes = resp.toString().split(",");
            let text = ""
            for (let i = 0; i < bytes.length; i++) {
                if (i < 5) {
                    continue;
                }
                if (parseInt(bytes[i]) === 254) {
                    break;
                }
                text = text + String.fromCharCode(parseInt(bytes[i]));
            }
            if (text) {
                console.log(text);
                this.getNockedTag(text)
                // console.log(convertArrayObjs(text));
                // this.setState({ nockedSocail: convertArrayObjs(text), nockedTag: true })
            }

            // console.log(convertArrayObjs(JSON.parse(text)));

            this.cleanUp();
        } catch (error) {
            console.log(error.toString());
            this.cleanUp();
        }


    }
    getNockedTag(username) {
        const { user, userApi } = this.props
        userApi('GET', 'getSocialMedia/' + username, '', user.access, 'nockedSocail')
    }
    componentDidUpdate() {
        const { nockedSocail, updateNocked, changeValue } = this.props
        if (nockedSocail && updateNocked) {
            changeValue({ updateNocked: false })
            this.setState({ nockedTag: true })
        }
    }
    _sidemenuOn() {
        Animated.timing(this.state.openSideMenu, {
            toValue: 1, duration: 500, useNativeDriver: true, easing: Easing.ease
        }).start()
    }
    _sidemenuOff() {
        Animated.timing(this.state.openSideMenu, {
            toValue: wp(-100), duration: 300, useNativeDriver: true, easing: Easing.back()
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
                    <Image style={{ width: wp(15), height: hp(7), resizeMode: 'contain' }}
                        source={item.image} />
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
        if (type == 'mail') {
            Linking.openURL("mailto:" + url)
        } else if (type == 'textme') {
            Linking.openURL("sms:" + url)
        } else if (type == 'contact') {
            Linking.openURL("tel:" + url)
        } else {
            Linking.openURL("https://" + url)
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
        if (loading || loadingOthers) {
            return <Spinner size='large' />;
        }
    }
    saveSocial() {
        const { userApi, minSocial, user } = this.props
        userApi('POST', 'addSocialMedia', { social: minSocial }, user.access, 'socail')
        this.setState({ modalPage: 1, text: '', selectedLink: null, key: '', addLinkModal: false })
    }
    async outLog() {
        // console.log('sdds');
        try {
            await AsyncStorage.removeItem('user');
            // this.props.clearUser()
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
                            <Text style={styles.regWhiteText}>43 pops</Text>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={() => Actions.push('Scan', { user })}>
                        <View>
                            <Image style={styles.SideMenuIcon}
                                source={require('./Assets/images/scan.png')} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <Content>

                    <View style={{ ...styles.View90, marginTop: hp(3) }}>



                        <Text style={styles.boldDarkText} >My Social Links</Text>

                        <View style={styles.viewForSocialImage}>
                            {minSocial.map((item, index) => {
                                const social = this.filterObject(item.media_name, 'socail')
                                if (social) {
                                    return (
                                        <TouchableWithoutFeedback key={index} onPress={() => this.handelOpenUrl(item.account, item.media_name == 'mail' ? 'mail' : 'socail')}>
                                            <View style={{ marginVertical: hp(2), marginHorizontal: wp(4) }}>
                                                <Image style={{ width: wp(15), height: hp(7), resizeMode: 'contain' }}
                                                    source={social.image} />
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
                                }}>Add Link</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{ marginTop: hp(5) }}>
                            <Text style={styles.boldDarkText} >Text me</Text>
                            <View style={styles.viewForSocialImage}>
                                {minSocial.map((item, index) => {
                                    const social = this.filterObject(item.media_name, 'textme')
                                    if (social) {
                                        return (
                                            <TouchableWithoutFeedback key={index} onPress={() => this.handelOpenUrl(item.account, "textme")}>
                                                <View style={{ marginVertical: hp(2), marginHorizontal: wp(4) }}>
                                                    <Image style={{ width: wp(15), height: hp(7), resizeMode: 'contain' }}
                                                        source={social.image} />
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    }

                                })}
                            </View>

                        </View>

                        <View style={{ marginTop: hp(5) }}>
                            <Text style={styles.boldDarkText} >My Contacts</Text>
                            <View style={styles.viewForSocialImage}>
                                {minSocial.map((item, index) => {
                                    const social = this.filterObject(item.media_name, 'contact')
                                    if (social) {
                                        return (
                                            <TouchableWithoutFeedback key={index} onPress={() => this.handelOpenUrl(item.account, 'contact')}>
                                                <View style={{ marginVertical: hp(2), marginHorizontal: wp(4) }}>
                                                    <Image style={{ width: wp(15), height: hp(7), resizeMode: 'contain' }}
                                                        source={social.image} />
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
                                    source={require('./Assets/images/man.png')} />
                                <View style={{ marginHorizontal: wp(2) }}>
                                    <Text style={styles.regDarlText} >Adel Mehanna</Text>
                                    <Text style={styles.regDarlText}>43 pops</Text>
                                </View>
                            </View>
                            <View style={styles.lineGray} />

                            <Button onPress={() => { this._sidemenuOff(), Actions.BuyChips() }}
                                style={styles.sideMenuButton}>
                                <Image style={styles.iconInButton}
                                    source={require('./Assets/images/buy.png')} />
                                <Text style={{ ...styles.midWhiteTextForMainButton, fontSize: wp(3.8) }}>Buy Chips</Text>
                            </Button>


                            <View style={styles.lineForImageandName}>
                                <Image style={styles.pageIcon}
                                    source={require('./Assets/images/homei.png')} />
                                <Text style={styles.regDarlText}>Home</Text>
                            </View>

                            <View style={styles.lineForImageandName}>
                                <Image style={styles.pageIcon}
                                    source={require('./Assets/images/mypay.png')} />
                                <Text style={styles.regDarlText}>My Payment</Text>
                            </View>

                            <View style={styles.lineForImageandName}>
                                <Image style={styles.pageIcon}
                                    source={require('./Assets/images/contactu.png')} />
                                <Text style={styles.regDarlText}>Contact Us</Text>
                            </View>


                            <TouchableWithoutFeedback onPress={() => { this._sidemenuOff(), Actions.Rests() }}>
                                <View style={styles.lineForImageandName}>
                                    <Image style={styles.pageIcon}
                                        source={require('./Assets/images/salad.png')} />
                                    <Text style={styles.regDarlText}>Restaurants</Text>
                                </View>
                            </TouchableWithoutFeedback>


                            <View style={styles.lineForImageandName}>
                                <Image style={styles.pageIcon}
                                    source={require('./Assets/images/sett.png')} />
                                <Text style={styles.regDarlText}>Setting</Text>
                            </View>

                            <View style={{ ...styles.lineGray, marginTop: hp(8) }} />
                            <TouchableWithoutFeedback onPress={() => this.outLog()}>
                                <View style={{ ...styles.lineForImageandName, alignSelf: 'center', marginTop: hp(1) }}>
                                    <Image style={styles.pageIcon}
                                        source={require('./Assets/images/out.png')} />
                                    <Text style={styles.regDarlText}>Logout</Text>
                                </View>
                            </TouchableWithoutFeedback>

                        </View>
                    </Card>
                    <TouchableWithoutFeedback
                        onPress={() => this._sidemenuOff()}>
                        <View style={{ width: wp(30), height: hp(100), }} />


                    </TouchableWithoutFeedback>
                </Animated.View>

                <Animated.View style={{ position: 'absolute', top: hp(25), justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', transform: [{ translateX: this.state.scanButton }] }} >
                    <TouchableWithoutFeedback onPress={this.readData}>


                        <View style={{ width: wp(11), height: wp(11), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: wp(2) }}>
                            <Image style={styles.SideMenuIcon}
                                source={require('./Assets/images/scan.png')} />
                        </View>

                    </TouchableWithoutFeedback>
                </Animated.View>

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
                        <View style={styles.modalViewII}>
                            {this.state.modalPage == 2 ?
                                <View>
                                    <Text style={{
                                        ...styles.boldDarkText, marginLeft: wp(5),
                                        marginVertical: hp(2)
                                    }}>Enter your {this.state.selectedLink} link</Text>

                                    <View style={styles.modalViewIII}>
                                        <Image style={styles.imageiconSelect}
                                            source={this.state.selectedLinkImage} />
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
                                                    <Text style={{ ...styles.regDarlText }}>Open Link</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <TouchableWithoutFeedback onPress={() => this.removeSocail(key)}>
                                                <View style={{
                                                    ...styles.rowAlignsentre, marginLeft: wp(6),
                                                }} >
                                                    <Image style={styles.icondelete}
                                                        source={require('./Assets/images/delete.png')} />
                                                    <Text style={{ ...styles.regDarlText, color: '#e44040' }}>Delete</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                        : null}
                                    <Button style={{ ...styles.mainDarkButton, marginTop: hp(15), marginBottom: hp(3) }} onPress={() => this.saveSocial2()}>
                                        <Text style={styles.midWhiteTextForMainButton}>Save Link</Text>
                                    </Button>


                                </View>
                                : this.state.modalPage == 1 ? <View>
                                    <Text style={{
                                        ...styles.boldDarkText, marginLeft: wp(5),
                                        marginVertical: hp(2)
                                    }}>Choose a social link to add</Text>




                                    <FlatList
                                        style={{ alignSelf: 'center' }}
                                        data={linkData}
                                        numColumns={4}
                                        renderItem={this._renderSocialMedia}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                    <Button style={{ ...styles.mainDarkButton, marginTop: hp(15), marginBottom: hp(3) }} onPress={() => this.saveSocial()}>
                                        <Text style={styles.midWhiteTextForMainButton}>Save Link</Text>
                                    </Button>
                                </View> : null}


                        </View>

                    </View>
                </Modal>
                <Modal
                    presentationStyle="overFullScreen"
                    animationType="slide"
                    transparent={true}
                    visible={nockedTag}
                // onRequestClose={() => {
                //     Alert.alert("Modal has been closed.");
                // }}
                >
                    <View style={styles.modalViewI}>
                        <TouchableWithoutFeedback onPress={() => this.setState({ nockedTag: false })}>
                            <View style={{ height: hp(40) }}></View>
                        </TouchableWithoutFeedback>
                        <View style={styles.modalViewII}>
                            <View style={styles.View90}>



                                <Text style={styles.boldDarkText} >Social Links</Text>

                                <View style={styles.viewForSocialImage}>
                                    {nockedSocail.map((item, index) => {
                                        const social = this.filterObject(item.media_name, 'socail')
                                        if (social) {
                                            return (
                                                <TouchableWithoutFeedback key={index} onPress={() => this.handelOpenUrl(item.account, 'socail')}>
                                                    <View style={{ marginVertical: hp(2), marginHorizontal: wp(4) }}>
                                                        <Image style={{ width: wp(15), height: hp(7), resizeMode: 'contain' }}
                                                            source={social.image} />
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            )
                                        }

                                    })}
                                </View>

                                <View style={{ marginTop: hp(5) }}>
                                    <Text style={styles.boldDarkText} >Text me</Text>
                                    <View style={styles.viewForSocialImage}>
                                        {nockedSocail.map((item, index) => {
                                            const social = this.filterObject(item.media_name, 'textme')
                                            if (social) {
                                                return (
                                                    <TouchableWithoutFeedback key={index} onPress={() => this.handelOpenUrl(item.account, "textme")}>
                                                        <View style={{ marginVertical: hp(2), marginHorizontal: wp(4) }}>
                                                            <Image style={{ width: wp(15), height: hp(7), resizeMode: 'contain' }}
                                                                source={social.image} />
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                )
                                            }

                                        })}
                                    </View>

                                </View>

                                <View style={{ marginTop: hp(5) }}>
                                    <Text style={styles.boldDarkText} >My Contacts</Text>
                                    <View style={styles.viewForSocialImage}>
                                        {nockedSocail.map((item, index) => {
                                            const social = this.filterObject(item.media_name, 'contact')
                                            if (social) {
                                                return (
                                                    <TouchableWithoutFeedback key={index} onPress={() => this.handelOpenUrl(item.account, 'contact')}>
                                                        <View style={{ marginVertical: hp(2), marginHorizontal: wp(4) }}>
                                                            <Image style={{ width: wp(15), height: hp(7), resizeMode: 'contain' }}
                                                                source={social.image} />
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                )
                                            }

                                        })}
                                    </View>
                                </View>


                            </View>
                        </View>

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

export default connect(mapStateToProps, { userApi, otherApi, changeValue })(Home);

