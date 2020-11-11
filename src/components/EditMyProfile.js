import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Modal, Alert } from 'react-native'
import { Container, Content, Icon, Input, Picker } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { Actions } from 'react-native-router-flux';
import { userApi, otherApi } from '../actions';
import { Spinner } from './Assets/common';
import { connect } from 'react-redux';
import { L } from '../Config';
import ImagePicker from 'react-native-image-picker'

class EditMyProfile extends Component {
    state = {
        name: '', email: '', username: '', phone: '', country: '', image: '',
        postal_code: '', password: '', passwordConfirm: '', city: '', photo: ''
    }

    componentDidMount() {
        const { user, otherApi } = this.props
        this.setState({
            name: user.name, email: user.email, username: user.username, phone: user.phone, country: user.country.id,
            city: user.city.id, postal_code: user.postal_code,
            image: user.photo ? user.photo : ''
        })
        otherApi('GET', 'getCountries', '', '', 'country')
        this.getCity(user.country.id)
    }
    getCity(id) {
        this.props.otherApi('GET', 'getCities/' + id, '', '', 'city')
    }
    onButtonChange() {

        const {
            name, email, username, phone, country, postal_code, password, passwordConfirm, city, photo
        } = this.state;
        const data = {
            name, email, username, phone, country, postal_code, password, city, photo
        }

        for (const [key, value] of Object.entries(data)) {
            if (!value && key != "password" && key != "passwordConfirm" && key != "photo") {
                Alert.alert(L('emptyField') + L(key))
                return
            } else if (key == "password" && value != passwordConfirm) {
                Alert.alert(L('passwordNotConfirmed'))
                return
            }
        }
        const { userApi, user } = this.props
        userApi('POST', 'editUser', data, user.access, 'edit')


    }
    _renderLoading() {
        const { loading, loadingOthers } = this.props
        return <Spinner size='large' visible={loading || loadingOthers ? true : false} />;
    }
    launchCam() {
        const options = {
            chooseFromLibraryButtonTitle: L('chooseFromLibrary'),
            takePhotoButtonTitle: L('takePhoto'),
            cancelButtonTitle: L('noadd'),
            title: '',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = 'data:image/jpeg;base64,' + response.data
                this.setState({ photo: source, image: source })

            }
        });
    }
    render() {
        const { name, email, username, phone, country, city, postal_code,
            password, passwordConfirm, image } = this.state
        const { countries, cities } = this.props
        return (
            <Container>
                <View style={styles.headerForProfile}>
                    <View style={[styles.secheaderProfile, { justifyContent: 'space-between' }]}>
                        <TouchableWithoutFeedback onPress={() => Actions.pop()}>
                            <View style={{ width: wp(10) }}>
                                <Icon name={L('arrow')} type="AntDesign" style={{ color: '#fff' }} />
                            </View>
                        </TouchableWithoutFeedback>

                        <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2), color: '#fff' }}>{L('My Profile')}</Text>
                        <View style={{ width: wp(10) }} />
                    </View>

                    <View style={styles.absViewHeader}>
                        <View style={{ width: wp(13) }} />
                        <TouchableWithoutFeedback onPress={() => this.launchCam()}>
                            <View style={styles.whiteViewImgProfile}>
                                <View style={styles.bgCamView}>
                                    <Icon name="camera" type="Feather" style={{ color: '#fff' }} />
                                </View>
                                <Image style={styles.profileIMG}
                                    source={
                                        image ? { uri: image } :
                                            require('./Assets/images/profile.png')
                                    } />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.onButtonChange()}>
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

export default connect(mapStateToProps, { userApi, otherApi })(EditMyProfile);
