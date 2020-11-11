import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Linking } from 'react-native'
import { Container, Content, Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { L } from '../Config';
import { Actions } from 'react-native-router-flux';
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
class MyProfile extends Component {

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
    handelOpenUrl(url, type) {
        const object = this.filterObject(type)
        if (object && object.link) {
            let link = object.link + url
            if (object.pattern != '') {
                const urlArr = url.split(object.pattern)
                if (urlArr && urlArr.length > 1) {
                    link = object.link + urlArr[1]
                }
            }
            // console.log(link);
            Linking.openURL(link)
        }

    }
    render() {
        const { profile, userProfile } = this.props;
        // console.log(profile);
        return (
            <Container>
                <View style={styles.headerForProfile}>
                    <View style={[styles.secheaderProfile, { justifyContent: 'space-between', width: wp(90) }]}>
                        <TouchableWithoutFeedback onPress={() => Actions.pop()}>
                            <View style={{ width: wp(10) }}>
                                <Icon name={L('arrow')} type="AntDesign" style={{ color: '#fff' }} />
                            </View>
                        </TouchableWithoutFeedback>

                        <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2), color: '#fff' }}>
                            {userProfile && userProfile.name}
                        </Text>
                        <View style={{ width: wp(10) }} />
                    </View>

                    <View style={[styles.absViewHeader, { justifyContent: 'center' }]}>

                        <View style={styles.whiteViewImgProfile}>

                            <Image style={styles.profileIMG}
                                source={
                                    userProfile && userProfile.photo ? { uri: userProfile.photo } :
                                        require('./Assets/images/man.png')
                                } />
                        </View>

                    </View>
                </View>
                <Content>
                    <View style={[styles.View90, { marginTop: hp(6) }]}>
                        <Text style={styles.boldDarkText} >{L('My Social Links')}</Text>
                        <View style={styles.viewForSocialImage}>
                            {profile.map((item, index) => {
                                const social = this.filterObject(item.media_name, 'socail')
                                if (social) {
                                    return (
                                        <TouchableWithoutFeedback key={index} onPress={() => this.handelOpenUrl(item.account, item.media_name)}>
                                            <View style={{ marginVertical: hp(1), marginHorizontal: wp(1) }}>
                                                {/* <Thumbnail source={social.image} /> */}
                                                <Image source={social.image} style={styles.socialImage} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                }
                            })}
                        </View>

                        <View style={{ marginTop: hp(2) }}>
                            <Text style={styles.boldDarkText} >{L('Text me')}</Text>
                            <View style={styles.viewForSocialImage}>
                                {profile.map((item, index) => {
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
                                {profile.map((item, index) => {
                                    const social = this.filterObject(item.media_name, 'contact')
                                    if (social) {
                                        return (
                                            <TouchableWithoutFeedback key={index} onPress={() => this.handelOpenUrl(item.account, 'contact')}>
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


                    </View>
                </Content>
            </Container>
        );
    }
}

export default MyProfile;