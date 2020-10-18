import React, { Component } from 'react';
import { View, Text, Image, } from 'react-native'
import { Container, Content, Icon, Input, Textarea, Button } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { L } from '../Config';

class ContactUS extends Component {
    state = {
        username: '', email: '',
    }
    render() {
        const { username, email } = this.state
        return (
            <Container>
                <View style={{ height: hp(40), }}>
                    <View style={styles.header}>
                        <View style={{ width: wp(33) }}>
                            <Icon name="left" type="AntDesign" style={{ color: '#fff' }} />
                        </View>
                        <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2), color: '#fff' }}>Contact US</Text>

                    </View>
                    <Image style={{ tintColor: '#fff', alignSelf: 'center', bottom: hp(-20) }}
                        source={require('./Assets/images/nock.png')} />
                    <Image style={{
                        width: wp(100), height: hp(40), borderBottomLeftRadius: wp(10),
                        borderBottomRightRadius: wp(10), position: 'absolute', zIndex: -1, opacity: .95
                    }}
                        source={require('./Assets/images/conactus.png')} />
                    <View style={{
                        height: hp(40), width: wp(100), backgroundColor: '#100f0f', position: 'absolute',
                        opacity: .5, borderBottomLeftRadius: wp(10), borderBottomRightRadius: wp(10)
                    }} />
                </View>
                <Content>
                    <View style={{ ...styles.View90, marginTop: hp(3), marginBottom: hp(1) }}>

                        <View style={styles.InputoutView}>

                            <Input
                                onChangeText={(username) => this.setState({ username })}
                                value={username}
                                keyboardType='default'
                                placeholder={L('username')}
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
                        <Textarea
                            placeholderTextColor="#a2a2a2"
                            style={styles.textAreastyle}
                            placeholder="Message..."
                            rowSpan={6}

                        />

                        <Button style={{ ...styles.mainDarkButton, marginTop: hp(5), marginBottom: hp(1) }}>
                            <Text style={styles.midWhiteTextForMainButton}>Submit</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}
export default ContactUS;