import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Modal, Alert, Picker } from 'react-native'
import { Container, Content, Icon, Input } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { L } from '../Config';

class EditMyProfile extends Component {
    state = {
        phonenumber: '', email: '', city: '', password: ''
    }
    render() {
        const { phonenumber, email, city, password } = this.state;
        return (
            <Container>
                <View style={styles.headerForProfile}>
                    <View style={styles.secheaderProfile}>
                        <View style={{ width: wp(35) }}>
                            <Icon name="left" type="AntDesign" style={{ color: '#fff' }} />
                        </View>
                        <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2), color: '#fff' }}>My Profile</Text>

                    </View>

                    <View style={styles.absViewHeader}>
                        <View style={{ width: wp(13) }} />
                        <TouchableWithoutFeedback onPress={() => Alert.alert('cam')}>
                            <View style={styles.whiteViewImgProfile}>
                                <View style={styles.bgCamView}>
                                    <Icon name="camera" type="Feather" style={{ color: '#fff' }} />
                                </View>
                                <Image style={styles.profileIMG}
                                    source={require('./Assets/images/profile.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => Alert.alert("checked")}>
                            <View style={styles.whiteViewforcheck}>
                                <View style={styles.blackinnerView}>
                                    <Icon name="check" type="AntDesign" style={{ color: '#fff' }} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <Content>
                    <View style={{ ...styles.View90, marginTop: hp(8) }}>
                        <View style={styles.InputoutView}>

                            <Input
                                onChangeText={(phonenumber) => this.setState({ phonenumber })}
                                value={phonenumber}
                                keyboardType='email-address'
                                placeholder={L("phonenumber")}
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />
                        </View>

                        <View style={styles.InputoutView}>

                            <Input
                                onChangeText={(email) => this.setState({ email })}
                                value={email}
                                keyboardType='email-address'
                                placeholder={L("email")}
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />
                        </View>

                        <View style={styles.inputWithLabelForget}>
                            <Picker
                                placeholder={L('city')}
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" type='Feather' />}
                                style={{ width: wp(90), alignSelf: 'center' }}
                                placeholderStyle={{ color: "#bfc6ea" }}
                                selectedValue={city}
                                iosHeader={L('selectCity')}
                                onValueChange={(city) => this.setState({ city })}
                            >

                                <Picker.Item label="KSA" value="KSA" />
                                <Picker.Item label="USA" value="USA" />

                            </Picker>
                        </View>


                        <View style={styles.inputWithLabelForget}>

                            <Input
                                onChangeText={(password) => this.setState({ password })}
                                value={password}
                                keyboardType='email-address'
                                placeholder={L("password")}
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />

                            <Icon name="eyeo" type='AntDesign' style={{ color: '#b6b6b6', fontSize: wp(6) }} />
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default EditMyProfile;