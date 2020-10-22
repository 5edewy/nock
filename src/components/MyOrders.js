import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Modal, Alert, FlatList } from 'react-native'
import { Container, Content, Icon, Input, Item } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { L } from '../Config';
import { connect } from 'react-redux';
import { otherApi, changeValue, userApi } from '../actions';
import { Spinner } from './Assets/common';
import FastImage from 'react-native-fast-image'
import { Actions } from 'react-native-router-flux';


const segmentData = [
    { name: L('state1'), id: 1 }, { name: L('state2'), id: 2 }
    , { name: L('state3'), id: 3 }, { name: L('state4'), id: 4 }]

class MyOrders extends Component {
    state = { segment: 1 }
    componentDidMount() {
        const { segment } = this.props
        if (segment) {
            this.setState({ segment })
        }
        this.getData(segment ? segment : 1)
    }
    getData(state) {
        const { user, otherApi } = this.props
        otherApi('GET', 'getOrders', { state }, user.access, 'orders')
    }
    _renderLoading() {
        const { loading } = this.props
        if (loading) {
            return <Spinner size='large' />;
        }
    }
    _Segment = ({ item, index }) => {
        const { segment } = this.state;
        const bgColor = segment == item.id ? "#1e1e1d" : "#ebeaea"
        const txtColor = segment == item.id ? "#fff" : "#1e1e1d"
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.setState({ segment: item.id })
                this.getData(item.id)
            }
            }>
                <View style={{
                    ...styles.segmentViewOrders, backgroundColor: bgColor,
                }}>
                    <Text style={{ ...styles.regDarlText, color: txtColor, fontSize: wp(3.5) }}>{item.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    _renderMyorders = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={() => Actions.push('order', { item })}>
                <View style={styles.myOrdersCardView}>
                    <View >
                        <FastImage
                            style={styles.chipImage}
                            source={{
                                uri: item.details[0].photos[0],
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                    <View style={{ marginHorizontal: wp(6) }}>
                        <Text style={styles.semiBoldDarkText}># {item.id}</Text>
                        <View style={{ ...styles.row_aliCentre, marginTop: hp(.7) }}>
                            <Text style={styles.semiBoldDarkText}>{item.total}</Text>
                            <Text style={{ ...styles.regDarlText, marginHorizontal: wp(2) }}>{L('SAR')}</Text>
                        </View>

                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
    render() {
        const { orders } = this.props
        return (
            <Container>
                <View style={[styles.header, { justifyContent: 'space-between' }]}>
                    <TouchableWithoutFeedback onPress={() => Actions.pop()}>
                        <View style={{ width: wp(10) }}>
                            <Icon name={L('arrow')} type="AntDesign" />
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2) }}>{L('My Orders')}</Text>
                    <View style={{ width: wp(10) }} />
                </View>
                <Content>
                    <View style={{ ...styles.View90, marginTop: hp(5) }} >
                        <FlatList
                            style={{ alignSelf: 'center' }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={segmentData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this._Segment}
                        />

                        <FlatList
                            style={{ marginTop: hp(3) }}
                            data={orders}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this._renderMyorders}
                        />



                    </View>
                </Content>
                {this._renderLoading()}
            </Container>
        );
    }
}

const mapStateToProps = ({ auth, others }) => {
    const { user } = auth
    const { loading, orders } = others
    return { user, loading, orders };
};

export default connect(mapStateToProps, { otherApi, changeValue })(MyOrders);


