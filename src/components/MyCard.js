import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Alert, FlatList } from 'react-native'
import { Container, Content, Icon, Item, Button, Picker } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { connect } from 'react-redux';
import { otherApi, changeValue, userApi } from '../actions';
import { Spinner } from './Assets/common';
import { L, updateCart } from '../Config';
import FastImage from 'react-native-fast-image'
import { Actions } from 'react-native-router-flux';


class MyCard extends Component {

    state = { updateCart: 1, address_id: 0 }
    componentDidMount() {
        const { user, otherApi, userApi } = this.props
        otherApi('GET', 'getSettings', '', user.access, 'settings')
        userApi('GET', 'myAddress', '', user.access, 'address')
    }
    pendToCart(item, oper) {
        const { cart, changeValue } = this.props
        const newCart = updateCart(item, cart, oper)
        changeValue({ cart: newCart })
        this.setState({ updateCart: 1 })
    }
    _renderLoading() {
        const { loading } = this.props
        if (loading) {
            return <Spinner size='large' visible={loading} />;
        }

    }
    _renderMyorders = ({ item }) => {
        return (
            <View style={styles.CardView}>
                <View style={styles.innerCardView}>
                    <View>
                        <FastImage
                            style={styles.chipImage}
                            source={{
                                uri: item.photos[0],
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                    <View style={{ marginHorizontal: wp(6) }}>
                        <View style={{ ...styles.row_aliCentre_jusCentre, width: wp(55) }}>
                            <Text style={[styles.semiBoldDarkText, { width: wp(50) }]} numberOfLines={1}>{item.title}</Text>
                            <TouchableWithoutFeedback onPress={() => this.pendToCart(item, 'remove')}>
                                <Icon name="cross" type="Entypo" style={{ color: '#b3b3b3' }} />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{ ...styles.row_aliCentre, marginTop: hp(.7) }}>
                            <Text style={styles.semiBoldDarkText}>{item.price * item.qty}</Text>
                            <Text style={{ ...styles.regDarlText, marginHorizontal: wp(2) }}>{L('SAR')}</Text>
                        </View>

                    </View>
                </View>
                <View style={{ ...styles.row_aliCentre_jusCentre, width: wp(30), alignSelf: 'center', marginTop: hp(-1) }}>
                    <TouchableWithoutFeedback onPress={() => this.pendToCart(item, 'minus')}>
                        <View style={styles.plusMinusButt}>
                            <Icon name="minus" type="AntDesign" style={{ color: '#fff', fontSize: wp(6) }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.numView}>
                        <Text style={styles.regDarlText}>{item.qty}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => this.pendToCart(item, 'plus')}>

                        <View style={styles.plusMinusButt}>
                            <Icon name="plus" type="AntDesign" style={{ color: '#fff', fontSize: wp(6) }} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
    onButtonChange() {
        const { cart, user, otherApi } = this.props;
        // const { address_id } = this.state;
        const data = { cart, pay: 2 }
        // if (!address_id) {
        //     Alert.alert(L('selectAddress'))
        //     return
        // }
        Actions.push('MyAdress', { order: data })
        // otherApi('POST', 'saveOrder', data, user.access, 'saveOrder')


    }
    render() {
        const { cart, settings, address } = this.props
        const { address_id } = this.state
        const total = cart.reduce(function (prev, cur) {
            return prev + (cur.qty * cur.price);
        }, 0)
        const tax = settings ? settings.tax / 100 * total : 0
        return (
            <Container>
                <View style={[styles.header, { justifyContent: 'space-between' }]}>

                    <TouchableWithoutFeedback onPress={() => Actions.pop()}>
                        <View style={{ width: wp(10) }}>
                            <Icon name={L('arrow')} type="AntDesign" />
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2) }}>{L('My Cart')}</Text>
                    <View style={{ width: wp(10) }} />
                </View>
                <Content>
                    <View style={{ ...styles.View90, marginTop: hp(4) }} >


                        <FlatList
                            data={cart}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this._renderMyorders}
                        />
                    </View>
                    {settings && cart.length > 0 ?
                        <View style={styles.View90}>
                            {/* <Item style={{ ...styles.row_aliCentre_jusCentre, paddingVertical: hp(2), marginTop: hp(1) }}>
                                <View style={styles.inputWithLabelForget}>
                                    <Picker
                                        placeholder={L('My Address')}
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" type='Feather' />}
                                        style={{ width: wp(90), alignSelf: 'center' }}
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        selectedValue={address_id}
                                        iosHeader={L('selectAddress')}
                                        onValueChange={(address_id) => this.setState({ address_id })}
                                    >
                                        <Picker.Item label={L('My Address')} value={0} key={0} />
                                        {address.map((item, index) => {
                                            return (
                                                <Picker.Item label={item.district + '-' + item.street + '-' + item.city.name + '/' + item.country.name}
                                                    value={item.id} key={index} />
                                            )
                                        })}

                                    </Picker>
                                </View>
                            </Item> */}
                            <Item style={{ ...styles.row_aliCentre_jusCentre, paddingVertical: hp(2), marginTop: hp(1) }}>
                                <Text style={styles.regDarlText}>{L('Tax')}</Text>
                                <View style={{ ...styles.row_aliCentre }}>
                                    <Text style={styles.semiBoldDarkText}>{tax}</Text>
                                    <Text style={{ ...styles.regDarlText, marginHorizontal: wp(2) }}>{L('SAR')}</Text>
                                </View>

                            </Item>
                            <Item style={{ ...styles.row_aliCentre_jusCentre, paddingVertical: hp(2), marginTop: hp(1) }}>
                                <Text style={styles.regDarlText}>{L('Shipping')}</Text>
                                <View style={{ ...styles.row_aliCentre }}>
                                    <Text style={styles.semiBoldDarkText}>{settings.shipping}</Text>
                                    <Text style={{ ...styles.regDarlText, marginHorizontal: wp(2) }}>{L('SAR')}</Text>
                                </View>

                            </Item>
                            <Item style={{ ...styles.row_aliCentre_jusCentre, paddingVertical: hp(2), marginTop: hp(1) }}>
                                <Text style={styles.regDarlText}>{L('Total')}</Text>
                                <View style={{ ...styles.row_aliCentre }}>
                                    <Text style={styles.semiBoldDarkText}>{Number(total) + Number(tax) + Number(settings.shipping)}</Text>
                                    <Text style={{ ...styles.regDarlText, marginHorizontal: wp(2) }}>{L('SAR')}</Text>
                                </View>

                            </Item>

                        </View>

                        : null}
                </Content>
                {settings && cart.length > 0 ?
                    <Button style={{ ...styles.mainDarkButton, marginTop: hp(3), marginBottom: hp(1) }} onPress={() => this.onButtonChange()}>
                        <Text style={styles.midWhiteTextForMainButton}>{L('Proceed to checkout')}</Text>
                    </Button> : null}
                {this._renderLoading()}
            </Container>
        );
    }
}

const mapStateToProps = ({ auth, others }) => {
    const { user, address } = auth
    const { loading, settings, cart } = others
    return { user, loading, settings, cart, address };
};

export default connect(mapStateToProps, { otherApi, changeValue, userApi })(MyCard);


