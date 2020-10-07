import React, { Component } from 'react';
import {
    View, Text, Image, TouchableWithoutFeedback, Animated, Alert, Easing, FlatList, Modal, TextInput
} from 'react-native'
import { Button, Card, Container, Content, Row } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { Actions } from 'react-native-router-flux';


const linkData = [
    { id: 1, name: 'Snap chat', image: require('./Assets/images/Snapchat.png') },
    { id: 2, name: 'Apple', image: require('./Assets/images/Apple.png') },
    { id: 3, name: 'Android', image: require('./Assets/images/Android.png') },
    { id: 4, name: 'Html5', image: require('./Assets/images/html.png') },
    { id: 5, name: 'Bitcoin', image: require('./Assets/images/Bitcoin.png') },
    { id: 6, name: 'contact', image: require('./Assets/images/contact.png') },
    { id: 7, name: 'Apple', image: require('./Assets/images/Apple.png') },
    { id: 8, name: 'Spotify', image: require('./Assets/images/Spotify.png') },
    { id: 9, name: 'Telegram', image: require('./Assets/images/Telegram.png') },
    { id: 10, name: 'textme', image: require('./Assets/images/textme.png') },
    { id: 11, name: 'google', image: require('./Assets/images/googlr.png') },
    { id: 12, name: 'Dropbox', image: require('./Assets/images/Dropbox.png') },
    { id: 13, name: 'html', image: require('./Assets/images/html.png') },
    { id: 14, name: 'mail', image: require('./Assets/images/mail.png') },
    { id: 15, name: 'Skype', image: require('./Assets/images/Skype.png') },
    { id: 16, name: 'Linkedin', image: require('./Assets/images/Linkedin.png') },


]
class Home extends Component {

    state = {
        openSideMenu: new Animated.Value(wp(-100)),
        addLinkModal: false,
        selectedLink: null,
        selectedLinkImage: {},
        modalPage: 1
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
                modalPage: 2
            })}>
                <View style={{ marginVertical: hp(2), marginHorizontal: wp(4) }}>
                    <Image style={{ width: wp(15), height: hp(7), resizeMode: 'contain' }}
                        source={item.image} />
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render() {
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
                    <TouchableWithoutFeedback onPress={() => Actions.Scan()}>
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
                            <Image style={styles.socialImage}
                                source={require('./Assets/images/face.png')} />
                            <Image style={styles.socialImage}
                                source={require('./Assets/images/twit.png')} />
                            <Image style={styles.socialImage}
                                source={require('./Assets/images/insta.png')} />
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
                            <View style={styles.viewInHome}>
                                <Image style={{
                                    ...styles.socialImageWithoutLabel,
                                    marginTop: hp(2)
                                }}
                                    source={require('./Assets/images/textme.png')} />
                                <Text style={styles.regHomeTextOnly}>Text message</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: hp(5) }}>
                            <Text style={styles.boldDarkText} >Text me</Text>
                            <View style={styles.viewInHome}>
                                <Image style={{
                                    ...styles.socialImageWithoutLabel,
                                    marginTop: hp(2)
                                }}
                                    source={require('./Assets/images/contact.png')} />
                                <Text style={styles.regHomeTextOnly}>My Contacts</Text>
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


                            <TouchableWithoutFeedback onPress={() => { this._sidemenuOff(), Actions.Rests()}}>
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
                                            placeholder={this.state.selectedLink + " link..."}
                                            placeholderTextColor="#adb0b4" />
                                    </View>
                                    <View style={{ ...styles.rowAlignsentre, width: wp(84), alignSelf: 'center', marginTop: hp(3) }}>
                                        <View style={{ ...styles.rowAlignsentre }}>
                                            <Image style={styles.icondelete}
                                                source={require('./Assets/images/link.png')} />
                                            <Text style={{ ...styles.regDarlText }}>Open Link</Text>
                                        </View>
                                        <View style={{
                                            ...styles.rowAlignsentre, marginLeft: wp(6),
                                        }} >
                                            <Image style={styles.icondelete}
                                                source={require('./Assets/images/delete.png')} />
                                            <Text style={{ ...styles.regDarlText, color: '#e44040' }}>Delete</Text>
                                        </View>
                                    </View>

                                    <Button style={{ ...styles.mainDarkButton, marginTop: hp(15), marginBottom: hp(3) }}>
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
                                </View> : null}


                        </View>

                    </View>
                </Modal>

            </Container>
        );
    }
}

export default Home;