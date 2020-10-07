import React, { Component } from 'react';
import {  View, Text, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import { Button, Container, Content, Input, Row } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';

class SignIn extends Component {
    state = {
        rememberMe: false
    }
    render() {
        const { rememberMe } = this.state
        return (
            <Container>
                <ImageBackground style={{ width: wp(100), height: hp(40) }}
                    source={require('./Assets/images/reg.png')} />
                <View style={{
                    backgroundColor: '#fff', height: hp(4),
                    borderTopRightRadius: wp(8), borderTopLeftRadius: wp(8),
                    marginTop: hp(-4)
                }} /> 
                <Content >
                    <View style={{...styles.View90 , marginTop: hp(2) , marginBottom: hp(2)}}>
                        <Text style={styles.semiBoldDarkText}>Sign in</Text>
                        <Text style={styles.regDarlText}>using your exising info</Text>



                        <View style={styles.InputoutView}>

                            <Input
                                placeholder="Phone number..."
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />
                        </View>

                        <View style={styles.inputWithLabelForget}>

                            <Input
                                placeholder="Password..."
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />

                            <Text style={styles.lightDarkText}>Forget?</Text>
                        </View>

                        <Button style={{ ...styles.mainDarkButton, marginTop: hp(3) }}>
                            <Text style={styles.midWhiteTextForMainButton}>Sign in</Text>
                        </Button>

                        <TouchableWithoutFeedback onPress={() => this.setState({ rememberMe: !this.state.rememberMe })}>

                            <Row style={{ marginTop: hp(2), alignItems: 'center' }} >
                                <View style={{
                                    ...styles.selectBox, borderColor: rememberMe ? '#1e1e1d' : '#e1e1e1'
                                }} >

                                    {rememberMe ? <View style={styles.selectDot} /> : null}
                                </View>

                                <Text style={{ ...styles.regDarlText, fontSize: wp(3.3) }}>Remember me</Text>
                            </Row>
                        </TouchableWithoutFeedback>

                        <Row style={{ alignSelf: 'center', alignItems: 'center' , marginTop: hp(10) }}>
                            <Text style={{ ...styles.regDarlText, fontSize: wp(3.2) , marginHorizontal: wp(1) }}>New User?</Text>
                            <Text style={{ ...styles.medDarkText, fontSize: wp(3.4)  , marginHorizontal: wp(1)}}>Sign Up</Text>
                        </Row>
                    </View>


                </Content>
            </Container>
        );
    }
}

export default SignIn;