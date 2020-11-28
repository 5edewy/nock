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

class Forget extends Component {
    state = {
        rememberMe: false, email: '', password: '',
        emailForget: ''
    }
    componentDidMount() {
        this.props.clearUser()
    }
    onButtonChange() {

        const { email } = this.state;
        const data = { email }

        for (const [key, value] of Object.entries(data)) {
            if (!value) {
                Alert.alert(L('emptyField') + L(key))

                return
            }
        }

        this.props.userApi('POST', 'forgotPassword', data, '', 'forget')


    }

    _renderLoading() {
        const { loading } = this.props
        if (loading) {
            return <Spinner size='large' visible={loading} />;
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
                        <Text style={styles.semiBoldDarkText}>{L('restorePassword')}</Text>
                        <View style={styles.InputoutView}>

                            <Input
                                onChangeText={(email) => this.setState({ email })}
                                value={email}
                                keyboardType='email-address'
                                placeholder={L('email')}
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />
                        </View>



                        <Button style={{ ...styles.mainDarkButton, marginTop: hp(3) }} onPress={() => this.onButtonChange()}>
                            <Text style={styles.midWhiteTextForMainButton}>{L('send')}</Text>
                        </Button>


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

export default connect(mapStateToProps, { userApi, clearUser })(Forget);

