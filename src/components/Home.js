import React, { Component } from 'react';
import {
    View, Text, Image, TouchableWithoutFeedback, Animated, Alert, Easing, FlatList, Modal, TextInput, Platform, Linking
} from 'react-native'
import { Button, Card, Container, Content, Row } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { Actions } from 'react-native-router-flux';
import NfcManager, { NfcTech, NfcEvents } from 'react-native-nfc-manager';
import { joinArrayObjs, convertArrayObjs } from '../Config';


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
    checkSocialObject(item) {
        item.media_name == ""
    }
    componentDidMount() {

        NfcManager.start();
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
    saveSocial() {
        let { text, social, key } = this.state
        this.removeSocail(key)
        if (text) {
            console.log(typeof (text), typeof (text) == "number");
            if (typeof (text) == 'number') {
                text = text.toString()
            }
            console.log(typeof (text) == 'number');
            const data = { media_name: key, account: text }
            social.push(data)
            this.setState({ modalPage: 1, text: '', selectedLink: null, key: '', social })
        } else {
            this.setState({ modalPage: 1, text: '', selectedLink: null, key: '' })
        }

    }

    writeData = async () => {

        let { social } = this.state

        if (social.length <= 0) {
            Alert.alert("Enter some data");
            return;
        }
        try {
            let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
            let resp = await NfcManager.requestTechnology(tech, {
                alertMessage: "Ready for magic"
            });
            let cmd = Platform.OS === 'ios' ? NfcManager.sendMifareCommandIOS : NfcManager.transceive;
            let data = JSON.stringify(joinArrayObjs(social));
            console.log(data, data.length, social);
            let fullLength = data.length + 7;
            let payloadLength = data.length + 3;
            resp = await cmd([0xA2, 0x04, 0x03, fullLength, 0xD1, 0x01]);
            resp = await cmd([0xA2, 0x05, payloadLength, 0x54, 0x02, 0x65]) // T enYourPayload
            let currentPage = 6;
            let currentPayload = [0xA2, currentPage, 0x6E]; // n
            for (let i = 0; i < data.length; i++) {
                currentPayload.push(data.charCodeAt(i));
                if (currentPayload.length == 6) {
                    resp = await cmd(currentPayload);
                    currentPage += 1;
                    currentPayload = [0xA2, currentPage]
                }
            }
            currentPayload.push(254);
            while (currentPayload.length < 6) {
                currentPayload.push(0);
            }
            resp = await cmd(currentPayload);

            const log = resp.toString() === "10" ? "Success" : resp.toString()
            this.setState({ addLinkModal: false })
            console.log('succ', log);
            this.cleanUp();
        } catch (error) {
            console.log('err', error.toString());
            this.cleanUp();
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
                console.log(convertArrayObjs(text));
                //   this.setState({ nockedSocail: convertArrayObjs(JSON.parse(text)), nockedTag: true })
            }

            // console.log(convertArrayObjs(JSON.parse(text)));

            this.cleanUp();
        } catch (error) {
            console.log(error.toString());
            this.cleanUp();
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
    removeSocail(key) {
        let { social } = this.state
        for (let i = 0; i < social.length; i++) {
            const element = social[i];
            if (key == element.media_name) {
                social.splice(i, 1)
            }
        }
        this.setState({ social })
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
        const { social } = this.state
        let object
        object = social.filter((it) => it.media_name == item)[0]
        // console.clear();
        // console.log(object);
        return object
    }
    render() {
        const { social, key, text, nockedTag, nockedSocail } = this.state
        key
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
                            source={require('./Assets/images/man.png')} />
                        <View style={{ marginHorizontal: wp(2) }}>
                            <Text style={styles.regWhiteText} >Adel Mehanna</Text>
                            <Text style={styles.regWhiteText}>43 pops</Text>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={this.readData}>
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
                            {social.map((item, index) => {
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
                                {social.map((item, index) => {
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
                                {social.map((item, index) => {
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
                            <View style={{ ...styles.lineForImageandName, alignSelf: 'center', marginTop: hp(1) }}>
                                <Image style={styles.pageIcon}
                                    source={require('./Assets/images/out.png')} />
                                <Text style={styles.regDarlText}>Logout</Text>
                            </View>
                        </View>
                    </Card>
                    <TouchableWithoutFeedback
                        onPress={() => this._sidemenuOff()}>
                        <View style={{ width: wp(30), height: hp(100), }} />


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
                                        <TextInput
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
                                    <Button style={{ ...styles.mainDarkButton, marginTop: hp(15), marginBottom: hp(3) }} onPress={() => this.saveSocial()}>
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
                                    <Button style={{ ...styles.mainDarkButton, marginTop: hp(15), marginBottom: hp(3) }} onPress={this.writeData}>
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

            </Container>
        );
    }
}

export default Home;