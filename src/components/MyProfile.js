import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Modal, Alert, Picker } from 'react-native'
import { Container, Content, Icon, Input, Item } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { L } from '../Config';
import { Actions } from 'react-native-router-flux';

class MyProfile extends Component {
    state = {
        phonenumber: '', email: '', city: '', password: ''
    }
    render() {
        const { phonenumber, email, city, password } = this.state;
        return (
            <Container>
                <View style={styles.headerForProfile}>
                    <View style={[styles.secheaderProfile, { justifyContent: 'space-between', backgroundColor: 'red', width: wp(90) }]}>
                        <View style={{ width: wp(10) }}>
                            <Icon name={L('arrow')} type="AntDesign" style={{ color: '#fff' }} />
                        </View>
                        <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2), color: '#fff' }}>{L('My Profile')}</Text>
                        <View style={{ width: wp(10) }} />
                    </View>

                    <View style={styles.absViewHeader}>
                        <View style={{ width: wp(13) }} />
                        <View style={styles.whiteViewImgProfile}>

                            <Image style={styles.profileIMG}
                                source={require('./Assets/images/profile.png')} />
                        </View>
                        <TouchableWithoutFeedback onPress={() => Actions.EditMyProfile()}>
                            <View style={styles.whiteViewforcheck}>
                                <View style={styles.blackinnerView}>
                                    <Icon name="pencil" type="EvilIcons" style={{ color: '#fff' }} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <Content>
                    <View style={styles.viewForText}>
                        <Text style={{ ...styles.medDarkText }} >Adel Mehanna</Text>
                        <Text style={{ ...styles.lightDarkText }}>43 pops</Text>
                    </View>
                    <View style={{ ...styles.View90, marginTop: hp(8) }}>

                        <Item style={styles.itemForProfile}>
                            <Text style={{ ...styles.regDarlText }}>Email</Text>
                            <Text style={{ ...styles.semiBoldDarkText, marginTop: hp(.5) }}>Majid.Sh@Gmail.com</Text>
                        </Item>
                        <Item style={styles.itemForProfile}>
                            <Text style={{ ...styles.regDarlText }}>Phone number</Text>
                            <Text style={{ ...styles.semiBoldDarkText, marginTop: hp(.5) }}>+966_408521244</Text>
                        </Item>

                        <Item style={styles.itemForProfile}>
                            <Text style={{ ...styles.regDarlText }}>Phone number</Text>
                            <View style={styles.passView}>
                                <Text>***********</Text>
                                <Icon name="eye-with-line" type="Entypo" style={{ color: '#b6b6b6', fontSize: wp(5) }} />
                            </View>
                        </Item>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default MyProfile;