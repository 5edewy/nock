import React, { Component } from 'react';
import { View, Text, Alert, TouchableWithoutFeedback } from 'react-native'
import { Container, Content, Icon, Button, Picker, Input } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { userApi, otherApi } from '../actions';
import { Spinner } from './Assets/common';
import { connect } from 'react-redux';
import { L } from '../Config';
import { Actions } from 'react-native-router-flux';

class AddAddress extends Component {
    state = { district: '', street: '', name: '', phone: '', country: '', city: '', id: '' }
    componentDidMount() {
        const { otherApi, item } = this.props
        if (item) {

            this.setState({
                district: item.district, street: item.street, name: item.name, phone: item.phone,
                country: item.country.id, city: item.city.id, id: item.id
            })
            this.getCity(item.country.id)
        }
        otherApi('GET', 'getCountries', '', '', 'country')
    }
    getCity(id) {
        this.props.otherApi('GET', 'getCities/' + id, '', '', 'city')
    }
    onButtonChange() {
        const { district, street, name, phone, country, city, id } = this.state
        const data = { district, street, name, phone, country, city, id }
        const { user, userApi } = this.props
        for (const [key, value] of Object.entries(data)) {
            if (!value && key != "id") {
                Alert.alert(L('emptyField') + L(key))
                return
            }
        }

        userApi('POST', 'addEditAddress', data, user.access, 'address')
    }

    _renderLoading() {
        const { loading, loadingOthers } = this.props
        return <Spinner size='large' visible={loading || loadingOthers ? true : false} />;
    }
    render() {
        const { district, street, name, phone, country, city } = this.state
        const { countries, cities } = this.props
        return (
            <Container>

                <View style={[styles.header, { justifyContent: 'space-between' }]}>
                    <TouchableWithoutFeedback onPress={() => Actions.pop()}>
                        <View style={{ width: wp(10) }}>
                            <Icon name={L('arrow')} type="AntDesign" />
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2) }}>{L('Add Address')}</Text>
                    <View style={{ width: wp(10) }} />
                </View>
                <Content>
                    <View style={{ ...styles.View90, marginTop: hp(6) }} >
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
                                onChangeText={(district) => this.setState({ district })}
                                value={district}
                                keyboardType={'default'}
                                placeholder={L('district')}
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />
                        </View>
                        <View style={styles.InputoutView}>
                            <Input
                                onChangeText={(street) => this.setState({ street })}
                                value={street}
                                keyboardType={'default'}
                                placeholder={L('street')}
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />
                        </View>

                    </View>
                </Content>
                { this._renderLoading()}
                <Button style={{ ...styles.mainDarkButton, marginTop: hp(3), marginBottom: hp(3) }} onPress={() => this.onButtonChange()}>
                    <Text style={styles.midWhiteTextForMainButton}>{L('save')}</Text>
                </Button>
            </Container >
        );
    }
}


const mapStateToProps = ({ auth, others }) => {
    const { user, loading } = auth
    const { countries, cities } = others

    const loadingOthers = others.loading
    return { user, loading, countries, cities, loadingOthers };
};

export default connect(mapStateToProps, { userApi, otherApi })(AddAddress);

