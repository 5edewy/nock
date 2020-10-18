import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Alert, FlatList } from 'react-native'
import { Container, Content, Icon, Item, Button } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';

const myOrders = [{}, {}, {}]
class MyCard extends Component {

    state = { numCards: 2 }

    _minusOne = () => {
        const { numCards } = this.state;
        if (numCards > 0) {
            return this.setState({ numCards: numCards - 1 })
        } else {
            return null
        }
    }
    _renderMyorders = ({ item, index }) => {
        const { numCards } = this.state;
        return (
            <View style={styles.CardView}>
                <View style={styles.innerCardView}>
                    <View  >
                        <Image style={styles.chipImage}
                            source={require('./Assets/images/chipb.png')} />
                    </View>
                    <View style={{ marginHorizontal: wp(6) }}>
                        <View style={{ ...styles.row_aliCentre_jusCentre, width: wp(55) }}>
                            <Text style={styles.semiBoldDarkText}>Chip name</Text>
                            <TouchableWithoutFeedback onPress={() => Alert.alert("delete")}>
                                <Icon name="cross" type="Entypo" style={{ color: '#b3b3b3' }} />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{ ...styles.row_aliCentre, marginTop: hp(.7) }}>
                            <Text style={styles.semiBoldDarkText}>350</Text>
                            <Text style={{ ...styles.regDarlText, marginHorizontal: wp(2) }}>SAR</Text>
                        </View>

                    </View>
                </View>
                <View style={{ ...styles.row_aliCentre_jusCentre, width: wp(30), alignSelf: 'center', marginTop: hp(-1) }}>
                    <TouchableWithoutFeedback onPress={() => this._minusOne()}>
                        <View style={styles.plusMinusButt}>
                            <Icon name="minus" type="AntDesign" style={{ color: '#fff', fontSize: wp(6) }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.numView}>
                        <Text style={styles.regDarlText}>{numCards}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => this.setState({ numCards: numCards + 1 })}>

                        <View style={styles.plusMinusButt}>
                            <Icon name="plus" type="AntDesign" style={{ color: '#fff', fontSize: wp(6) }} />
                        </View>
                    </TouchableWithoutFeedback>
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
                    <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2) }}>My Cart</Text>

                </View>
                <Content>
                    <View style={{ ...styles.View90, marginTop: hp(4) }} >


                        <FlatList
                            data={myOrders}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this._renderMyorders}
                        />




                    </View>
                </Content>
                <View style={styles.View90}>
                    <Item style={{ ...styles.row_aliCentre_jusCentre, paddingVertical: hp(2), marginTop: hp(1) }}>
                        <Text style={styles.regDarlText}>address here</Text>
                        <Icon name="right" type="AntDesign" style={{ color: '#333333' }} />
                    </Item>
                    <Item style={{ ...styles.row_aliCentre_jusCentre, paddingVertical: hp(2), marginTop: hp(1) }}>
                        <Text style={styles.regDarlText}>Shipping fee</Text>
                        <View style={{ ...styles.row_aliCentre }}>
                            <Text style={styles.semiBoldDarkText}>0.00</Text>
                            <Text style={{ ...styles.regDarlText, marginHorizontal: wp(2) }}>SAR</Text>
                        </View>

                    </Item>
                    <Item style={{ ...styles.row_aliCentre_jusCentre, paddingVertical: hp(2), marginTop: hp(1) }}>
                        <Text style={styles.regDarlText}>Total</Text>
                        <View style={{ ...styles.row_aliCentre }}>
                            <Text style={styles.semiBoldDarkText}>350</Text>
                            <Text style={{ ...styles.regDarlText, marginHorizontal: wp(2) }}>SAR</Text>
                        </View>

                    </Item>

                    <Button style={{ ...styles.mainDarkButton, marginTop: hp(3), marginBottom: hp(1) }}>
                        <Text style={styles.midWhiteTextForMainButton}>Proceed to checkout</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

export default MyCard;