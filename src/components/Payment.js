import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableWithoutFeedback, Modal } from 'react-native'
import { Container, Content, Icon, Item, Button } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { Actions } from 'react-native-router-flux';

const paymentData = [
    { image: require('./Assets/images/visa.png') },
    { image: require('./Assets/images/paytwo.png') },
    { image: require('./Assets/images/paythree.png') },
    { image: require('./Assets/images/payfour.png') },
]
class Payment extends Component {

    state = {
        paymentSelected: null,
        seuccessPayModal: false
    }

    _renderPaymentMethods = ({ item, index }) => {
        const { paymentSelected } = this.state;
        return (
            <TouchableWithoutFeedback onPress={() => this.setState({ paymentSelected: index })}>
                <View style={styles.payCard}>
                    <View style={{
                        ...styles.selectPay,
                        backgroundColor: paymentSelected == index ? '#5cca4b' : '#d9d9d9'
                    }}>
                        {paymentSelected == index ?
                            <Icon name='check' type="AntDesign" style={{ color: '#fff', fontSize: wp(6.5) }} />
                            : null}
                    </View>
                    <Image source={item.image} />
                </View>
            </TouchableWithoutFeedback>
        )
    }
    render() {
        return (
            <Container>
                <View style={{
                    flexDirection: 'row', alignItems: 'center', marginTop: hp(4),
                    paddingHorizontal: wp(3),
                }}>
                    <View style={{ width: wp(35) }}>
                        <Icon name="left" type="AntDesign" />
                    </View>
                    <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2) }}>My Payment</Text>

                </View>
                <Content>
                    <View style={{ ...styles.View90, marginTop: hp(5) }}>
                        <Text style={{ ...styles.boldDarkText, fontSize: wp(4.2) }} >product details</Text>
                        <View style={{ ...styles.rowAlignsentre, marginTop: hp(2) }}>
                            <Image style={styles.MenuImageForCard}
                                source={require('./Assets/images/burger.png')} />
                            <View style={{ marginHorizontal: wp(3) }}>
                                <Text style={{ ...styles.semiBoldDarkText }}>Burger</Text>
                                <Text style={{ ...styles.semiBoldDarkText }}>x2</Text>
                            </View>
                        </View>
                        <Item style={{ height: hp(7), paddingHorizontal: wp(4), marginTop: hp(1) }}>
                            <View style={styles.rowAlignsentre}>
                                <Text style={{ ...styles.semiBoldDarkText, fontSize: wp(4.5) }}>250</Text>
                                <Text style={{ ...styles.regDarlText, fontSize: wp(4.2), marginHorizontal: wp(1) }}>SAR</Text>
                            </View>
                        </Item>


                        <Text style={{
                            ...styles.boldDarkText, fontSize: wp(4.2),
                            marginVertical: hp(2)
                        }} >Pay with</Text>



                        <FlatList
                            data={paymentData}

                            renderItem={this._renderPaymentMethods}
                            keyExtractor={(item, index) => index.toString()}
                        />

                        <Button
                            onPress={() => this.setState({ seuccessPayModal: true })}
                            style={{ ...styles.mainDarkButton, marginTop: hp(6), marginBottom: hp(3) }}>
                            <Text style={styles.midWhiteTextForMainButton}>Confirm payment</Text>
                        </Button>


                    </View>

                </Content>
                <Modal
                    presentationStyle="overFullScreen"
                    animationType='fade'
                    transparent={true}
                    visible={this.state.seuccessPayModal}
                // onRequestClose={() => {
                //     Alert.alert("Modal has been closed.");
                // }}
                >

                    <View style={styles.payModalI}>
                        <TouchableWithoutFeedback onPress={() => this.setState({ seuccessPayModal: false })}>
                            <View style={styles.payModalII}>
                                <Image style={styles.successPayImage}
                                    source={require('./Assets/images/deposit.png')} />
                                <Text style={{ ...styles.boldDarkText, fontSize: wp(5) }}>Successful payment</Text>
                                <Text style={{ ...styles.regDarlText }}>The process have completed successfully</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>
            </Container>
        );
    }
}

export default Payment;