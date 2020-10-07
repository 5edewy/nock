import React, { Component } from 'react';
import {  View, Text, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import { Button, Container, Content, Input, Row, Picker,  Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { Actions } from 'react-native-router-flux';

class SignUp extends Component {
    state = {
      
        selected2: undefined
    }

    onValueChange2(value) {
        this.setState({
            selected2: value
        });
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
                    <View style={{ ...styles.View90, marginTop: hp(2), marginBottom: hp(2) }}>
                        <Text style={styles.semiBoldDarkText}>Sign Up</Text>
                        <Text style={styles.regDarlText}>Filling the bellow info</Text>



                        <View style={styles.InputoutView}>
                            <Input
                                placeholder="Phone number..."
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />
                        </View>

                        <View style={styles.InputoutView}>
                            <Input
                                placeholder="Email..."
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />
                        </View>


                        <View style={styles.inputWithLabelForget}>
                            <Picker

                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholderStyle={{ color: "#bfc6ea" }}
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChange2.bind(this)}
                            >
                                <Picker.Item label="KSA" value="key0" />
                                <Picker.Item label="Egy" value="key1" />
                                <Picker.Item label="USA" value="key2" />
                                <Picker.Item label="TUR" value="key3" />

                            </Picker>
                        </View>

                        <View style={styles.InputoutView}>
                            <Input
                                placeholder="Password..."
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />
                        </View>

                        <View style={styles.InputoutView}>
                            <Input
                                placeholder="Repeat Password..."
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />
                        </View>





                        <Button onPress={()=> Actions.MainFlow()} 
                         style={{ ...styles.mainDarkButton, marginTop: hp(6) }}>
                            <Text style={styles.midWhiteTextForMainButton}>Sign up</Text>
                        </Button>


                        <Row style={{ alignSelf: 'center', alignItems: 'center', marginTop: hp(2.5) }}>
                            <Text style={{ ...styles.regDarlText, fontSize: wp(3.2), marginHorizontal: wp(1) }}>Alread have an account?</Text>
                            <Text style={{ ...styles.medDarkText, fontSize: wp(3.4), marginHorizontal: wp(1) }}>Sign in</Text>
                        </Row>
                    </View>


                </Content>
            </Container>
        );
    }
}

export default SignUp;