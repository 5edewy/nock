import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Modal, Alert, FlatList } from 'react-native'
import { Container, Content, Icon, Input, Item } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';

const segmentData = [{ name: "Finished" }, { name: "Canceled" }, { name: "Recent" }]
const myOrders = [{}, {}, {}]
class MyOrders extends Component {

    state = { segment: 2 }
    _Segment = ({ item, index }) => {
        const { segment } = this.state;
        const bgColor = segment == index ? "#1e1e1d" : "#ebeaea"
        const txtColor = segment == index ? "#fff" : "#1e1e1d"
        return (
            <TouchableWithoutFeedback onPress={() => this.setState({ segment: index })}>
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
            <View style={styles.myOrdersCardView}>
                <View >
                    <Image style={styles.chipImage}
                        source={require('./Assets/images/chipb.png')} />
                </View>
                <View style={{ marginHorizontal: wp(6) }}>
                    <Text style={styles.semiBoldDarkText}>Chip name</Text>
                    <View style={{ ...styles.row_aliCentre, marginTop: hp(.7) }}>
                        <Text style={styles.semiBoldDarkText}>350</Text>
                        <Text style={{ ...styles.regDarlText, marginHorizontal: wp(2) }}>SAR</Text>
                    </View>

                </View>
            </View>
        );
    }
    render() {
        return (
            <Container>
                <View style={styles.header}>
                    <View style={{ width: wp(33) }}>
                        <Icon name="left" type="AntDesign" />
                    </View>
                    <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2) }}>My Orders</Text>

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
                            data={myOrders}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this._renderMyorders}
                        />



                    </View>
                </Content>
            </Container>
        );
    }
}

export default MyOrders;