import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableWithoutFeedback, Alert } from 'react-native'
import { Button, Container, Content, Input, Row } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { Actions } from 'react-native-router-flux';
import { userApi, clearUser } from '../actions';
import { Spinner } from './Assets/common';
import { connect } from 'react-redux';
import { L } from '../Config';

class SignIn extends Component {
    state = {
        rememberMe: false, email: '', password: ''
    }
    componentDidMount() {
        this.props.clearUser()
    }
    onButtonChange() {

        const { email, password } = this.state;
        const data = { email, password }

        for (const [key, value] of Object.entries(data)) {
            if (!value) {
                Alert.alert(L('emptyField') + L(key))

                return
            }
        }

        this.props.userApi('POST', 'login', data, '', 'login')


    }
    _renderLoading() {
        const { loading } = this.props
        if (loading) {
            return <Spinner size='large' />;
        }
    }
    render() {
        const { rememberMe, email, password } = this.state
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
                        <Text style={styles.semiBoldDarkText}>{L('Signin')}</Text>
                        <Text style={styles.regDarlText}>{L('usingyourexisinginfo')}</Text>



                        <View style={styles.InputoutView}>

                            <Input
                                onChangeText={(email) => this.setState({ email })}
                                value={email}
                                keyboardType='email-address'
                                placeholder={L('email')}
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />
                        </View>

                        <View style={styles.inputWithLabelForget}>

                            <Input
                                onChangeText={(password) => this.setState({ password })}
                                value={password}
                                secureTextEntry
                                placeholder={L('password')}
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />

                            <Text style={styles.lightDarkText}>{L('forget')}</Text>
                        </View>

                        <Button style={{ ...styles.mainDarkButton, marginTop: hp(3) }} onPress={() => this.onButtonChange()}>
                            <Text style={styles.midWhiteTextForMainButton}>{L('Signin')}</Text>
                        </Button>

                        {/* <TouchableWithoutFeedback onPress={() => this.setState({ rememberMe: !this.state.rememberMe })}>

                            <Row style={{ marginTop: hp(2), alignItems: 'center' }} >
                                <View style={{
                                    ...styles.selectBox, borderColor: rememberMe ? '#1e1e1d' : '#e1e1e1'
                                }} >

                                    {rememberMe ? <View style={styles.selectDot} /> : null}
                                </View>

                                <Text style={{ ...styles.regDarlText, fontSize: wp(3.3) }}>Remember me</Text>
                            </Row>
                        </TouchableWithoutFeedback> */}

                        <Row style={{ alignSelf: 'center', alignItems: 'center', marginTop: hp(10) }}>
                            <Text style={{ ...styles.regDarlText, fontSize: wp(3.2), marginHorizontal: wp(1) }}>New User?</Text>
                            <TouchableWithoutFeedback onPress={() => Actions.push('SignUp')}>
                                <Text style={{ ...styles.medDarkText, fontSize: wp(3.4), marginHorizontal: wp(1) }}>Sign Up</Text>
                            </TouchableWithoutFeedback>

                        </Row>
                    </View>


                </Content>
                {this._renderLoading()}
            </Container>
        );
    }
}
const mapStateToProps = ({ auth }) => {
    const { user, loading } = auth

    return { user, loading };
};

export default connect(mapStateToProps, { userApi, clearUser })(SignIn);

