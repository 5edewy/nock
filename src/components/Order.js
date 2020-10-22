import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Alert, FlatList } from 'react-native'
import { Container, Content, Icon, Item, Button, Picker } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';

import { L } from '../Config';
import FastImage from 'react-native-fast-image'
import { Actions } from 'react-native-router-flux';


class Order extends Component {


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
                            <Text style={styles.semiBoldDarkText}>{item.title}</Text>

                        </View>
                        <View style={{ ...styles.row_aliCentre, marginTop: hp(.7) }}>
                            <Text style={styles.semiBoldDarkText}>{item.price * item.quantity}</Text>
                            <Text style={{ ...styles.regDarlText, marginHorizontal: wp(2) }}>{L('SAR')}</Text>
                        </View>

                    </View>
                </View>
                <View style={{ ...styles.row_aliCentre_jusCentre, width: wp(30), alignSelf: 'center', marginTop: hp(-1) }}>

                    <View style={styles.numView}>
                        <Text style={styles.regDarlText}>{item.quantity}</Text>
                    </View>

                </View>
            </View>
        );
    }

    render() {
        const { item } = this.props

        return (
            <Container>
                <View style={[styles.header, { justifyContent: 'space-between' }]}>

                    <TouchableWithoutFeedback onPress={() => Actions.pop()}>
                        <View style={{ width: wp(10) }}>
                            <Icon name={L('arrow')} type="AntDesign" />
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2) }}># {item.id}</Text>
                    <View style={{ width: wp(10) }} />
                </View>
                <Content>
                    <View style={{ ...styles.View90, marginTop: hp(4) }} >


                        <FlatList
                            data={item.details}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this._renderMyorders}
                        />
                    </View>
                    <View style={styles.View90}>
                        <Item style={{ ...styles.row_aliCentre_jusCentre, paddingVertical: hp(2), marginTop: hp(1) }}>
                            <Text style={styles.regDarlText}>{L('address')}</Text>
                            <View style={{ ...styles.row_aliCentre }}>
                                <Text style={[styles.semiBoldDarkText, { width: wp(60) }]}>
                                    {item.address.district + '-' + item.address.street + '-' + item.address.city.name + '/' + item.address.country.name}
                                </Text>
                            </View>

                        </Item>
                        <Item style={{ ...styles.row_aliCentre_jusCentre, paddingVertical: hp(2), marginTop: hp(1) }}>
                            <Text style={styles.regDarlText}>{L('Tax')}</Text>
                            <View style={{ ...styles.row_aliCentre }}>
                                <Text style={styles.semiBoldDarkText}>{item.tax}</Text>
                                <Text style={{ ...styles.regDarlText, marginHorizontal: wp(2) }}>{L('SAR')}</Text>
                            </View>

                        </Item>
                        <Item style={{ ...styles.row_aliCentre_jusCentre, paddingVertical: hp(2), marginTop: hp(1) }}>
                            <Text style={styles.regDarlText}>{L('Shipping')}</Text>
                            <View style={{ ...styles.row_aliCentre }}>
                                <Text style={styles.semiBoldDarkText}>{item.shipping}</Text>
                                <Text style={{ ...styles.regDarlText, marginHorizontal: wp(2) }}>{L('SAR')}</Text>
                            </View>

                        </Item>
                        <Item style={{ ...styles.row_aliCentre_jusCentre, paddingVertical: hp(2), marginTop: hp(1) }}>
                            <Text style={styles.regDarlText}>{L('Total')}</Text>
                            <View style={{ ...styles.row_aliCentre }}>
                                <Text style={styles.semiBoldDarkText}>{item.total}</Text>
                                <Text style={{ ...styles.regDarlText, marginHorizontal: wp(2) }}>{L('SAR')}</Text>
                            </View>

                        </Item>

                    </View>


                </Content>

            </Container>
        );
    }
}
export default Order


