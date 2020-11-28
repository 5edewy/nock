import React, { Component } from 'react';
import { View, Text, ImageBackground, Alert, TouchableWithoutFeedback } from 'react-native'
import { Button, Container, Content, Input, Row, Picker, Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { Actions } from 'react-native-router-flux';
import { userApi, otherApi } from '../actions';
import { Spinner } from './Assets/common';
import { connect } from 'react-redux';
import { L } from '../Config';


class SignUp extends Component {
    state = {
        name: '', email: '', username: '', phone: '', country: '',
        postal_code: '', password: '', passwordConfirm: '', city: ''
    }

    componentDidMount() {
        this.props.otherApi('GET', 'getCountries', '', '', 'country')
    }
    getCity(id) {
        this.props.otherApi('GET', 'getCities/' + id, '', '', 'city')
    }
    onButtonChange() {

        const {
            name, email, username, phone, country, postal_code, password, passwordConfirm, city
        } = this.state;
        const data = {
            name, email, username, phone, country, postal_code, password, city
        }

        for (const [key, value] of Object.entries(data)) {
            if (!value) {
                Alert.alert(L('emptyField') + L(key))

                return
            } else if (key == "password" && value != passwordConfirm) {
                Alert.alert(L('passwordNotConfirmed'))
                return
            }
        }

        this.props.userApi('POST', 'register', data, '', 'register')


    }
    _renderLoading() {
        const { loading, loadingOthers } = this.props
        if (loading || loadingOthers) {
            return <Spinner size='large' />;
        }

    }
    render() {
        const { name, email, username, phone, country, city, postal_code,
            password, passwordConfirm } = this.state
        const { countries, cities } = this.props
        // console.log(countries && countries[0]);
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
                        <Text style={styles.semiBoldDarkText}>{L('SignUp')}</Text>
                        <Text style={styles.regDarlText}>{L('Fillingthebellowinfo')}</Text>



                        <View style={styles.InputoutView}>
                            <Input
                                placeholder={L('username')}
                                placeholderTextColor="#a2a2a2"
                                onChangeText={(username) => this.setState({ username })}
                                value={username}
                                keyboardType='default'
                                style={styles.inputStyle} />

                        </View>
                        <View style={styles.InputoutView}>
                            <Input
                                placeholder={L('name')}
                                placeholderTextColor="#a2a2a2"
                                onChangeText={(name) => this.setState({ name })}
                                value={name}
                                keyboardType='default'
                                style={styles.inputStyle} />

                        </View>
                        <View style={styles.InputoutView}>
                            <Input
                                placeholder={L('phone')}
                                placeholderTextColor="#a2a2a2"
                                onChangeText={(phone) => this.setState({ phone })}
                                value={phone}
                                keyboardType='phone-pad'
                                style={styles.inputStyle} />

                        </View>

                        <View style={styles.InputoutView}>
                            <Input
                                onChangeText={(email) => this.setState({ email })}
                                value={email}
                                keyboardType='email-address'
                                placeholder={L('email')}
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />
                        </View>
                        <View style={styles.InputoutView}>
                            <Input
                                onChangeText={(postal_code) => this.setState({ postal_code })}
                                value={postal_code}
                                keyboardType='number-pad'
                                placeholder={L('postal_code')}
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />
                        </View>


                        <View style={styles.inputWithLabelForget}>
                            <Picker
                                placeholder={L('country')}
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" type='Feather' />}
                                style={{ width: wp(90), alignSelf: 'center' }}
                                placeholderStyle={{ color: "#bfc6ea" }}
                                selectedValue={country}
                                iosHeader={L('selectCountry')}
                                onValueChange={(country) => {
                                    this.getCity(country)
                                    this.setState({ country })
                                }}
                            >
                                <Picker.Item label={L('country')} value={0} key={0} />
                                {countries.map((item, index) => {
                                    return (
                                        <Picker.Item label={item.name} value={item.id} key={index} />

                                    )
                                })}

                            </Picker>
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
                                <Picker.Item label={L('city')} value={0} key={0} />
                                {cities.map((item, index) => {
                                    return (
                                        <Picker.Item label={item.name} value={item.id} key={index} />

                                    )
                                })}

                            </Picker>
                        </View>

                        <View style={styles.InputoutView}>
                            <Input
                                onChangeText={(password) => this.setState({ password })}
                                value={password}
                                secureTextEntry
                                placeholder={L('password')}
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />
                        </View>

                        <View style={styles.InputoutView}>
                            <Input
                                onChangeText={(passwordConfirm) => this.setState({ passwordConfirm })}
                                value={passwordConfirm}
                                secureTextEntry
                                placeholder={L('passwordConfirm')}
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />
                        </View>



                        <Button onPress={() => this.onButtonChange()}
                            style={{ ...styles.mainDarkButton, marginTop: hp(6) }}>
                            <Text style={styles.midWhiteTextForMainButton}>{L('SignUp')}</Text>
                        </Button>


                        <Row style={{ alignSelf: 'center', alignItems: 'center', marginTop: hp(2.5) }}>
                            <Text style={{ ...styles.regDarlText, fontSize: wp(3.2), marginHorizontal: wp(1) }}>{L('Alreadhaveanaccount')}</Text>
                            <TouchableWithoutFeedback onPress={() => Actions.push('SignIn')}>
                                <Text style={{ ...styles.medDarkText, fontSize: wp(3.4), marginHorizontal: wp(1) }}>{L('Signin')}</Text>

                            </TouchableWithoutFeedback>
                        </Row>
                    </View>
                </Content>
                {this._renderLoading()}
            </Container>
        );
    }
}
const mapStateToProps = ({ auth, others }) => {
    const { user, loading } = auth
    const { countries, cities } = others

    const loadingOthers = others.loading
    return { user, loading, countries, cities, loadingOthers };
};

export default connect(mapStateToProps, { userApi, otherApi })(SignUp);
