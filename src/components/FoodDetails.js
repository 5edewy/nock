import React, { Component } from 'react';
import { View, Text, Image,  TouchableWithoutFeedback, Modal, TextInput, Switch } from 'react-native'
import { Container, Content, Icon, Card, Button, Item } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import StarRating from 'react-native-star-rating';
import { Actions } from 'react-native-router-flux';

class FoodDetails extends Component {

    state = {
        quantity: 1,
        rateModal: false,
        showName: false
    }

    _plusOne = () => {
        const { quantity } = this.state;
        this.setState({ quantity: quantity + 1 })
    }

    _minusOne = () => {
        const { quantity } = this.state;
        if (quantity <= 1) {
            return null
        } else {
            this.setState({ quantity: quantity - 1 })
        }

    }
    render() {
        return (
            <Container>
                <View style={{
                    flexDirection: 'row', alignItems: 'center', marginTop: hp(4),
                    paddingHorizontal: wp(3),
                }}>
                    <View style={{ width: wp(25) }}>
                        <Icon name="left" type="AntDesign" />
                    </View>
                    <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2) }}>Product name</Text>


                </View>




                <View style={{ ...styles.dairaSwda, top: hp(15) }} />
                <Content>

                    <View style={{ ...styles.View90, marginTop: hp(6), marginBottom: hp(2) }}>

                        <View >
                            <View style={{ ...styles.rowAlignsentre }}>
                                <Card noShadow style={{
                                    width: wp(35), height: wp(35), borderRadius: wp(35 / 2),
                                    alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Image style={styles.MenuImageForCard}
                                        source={require('./Assets/images/burger.png')} />
                                </Card>
                                <View style={{ width: wp(45), marginLeft: wp(4) }}>
                                    <Text style={{ ...styles.semiBoldDarkText }}>Burger</Text>
                                    <Text style={{
                                        ...styles.lightDarkText,
                                        fontSize: wp(2.9), color: '#676767'
                                    }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</Text>
                                    <StarRating
                                        maxStars={5}
                                        rating={3}
                                        starSize={wp(5)}
                                        fullStarColor={'#ffbb46'}
                                        halfStarColor={'#ffbb46'}
                                        disabled
                                        emptyStarColor={'#c9c9c9'}
                                        containerStyle={{ width: wp(30), marginVertical: hp(.3) }}
                                    />
                                </View>
                            </View>

                            <View style={{
                                ...styles.rowAlignsentre, justifyContent: 'space-between',
                                width: wp(75), justifyContent: 'space-evenly'
                            }}>
                                <View style={styles.rowAlignsentre}>
                                    <Text style={{ ...styles.semiBoldDarkText, fontSize: wp(4.5) }}>350</Text>
                                    <Text style={{ ...styles.regDarlText, fontSize: wp(4.2), marginHorizontal: wp(1) }}>SAR</Text>
                                </View>
                                <View style={{ ...styles.rowAlignsentre }}>

                                    <TouchableWithoutFeedback onPress={() => this._plusOne()}>
                                        <Card style={{ ...styles.plusAndMinusButt, marginRight: wp(4) }}>
                                            <Icon name="plus" type="Entypo" style={{ fontSize: wp(5) }} />
                                        </Card>
                                    </TouchableWithoutFeedback>

                                    <Text style={styles.semiBoldDarkText}>{this.state.quantity}</Text>

                                    <TouchableWithoutFeedback onPress={() => this._minusOne()}>
                                        <Card style={{ ...styles.plusAndMinusButt, marginLeft: wp(4) }}>
                                            <Icon name="minus" type="Entypo" style={{ fontSize: wp(5) }} />
                                        </Card>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>





                    </View>

                </Content>
                <Button
                    onPress={() => this.setState({ rateModal: true })}
                    style={{
                        ...styles.mainDarkButton,
                        backgroundColor: '#fff',
                        borderWidth: .8, borderColor: '#dfdfdf'
                    }}>
                    <Text style={{ ...styles.midWhiteTextForMainButton, color: '#1e1e1d' }}>Rate product</Text>
                </Button>

                <Button 
                onPress={()=> Actions.Payment()}
                    style={{ ...styles.mainDarkButton, marginTop: hp(2), marginBottom: hp(3) }}>
                    <Text style={styles.midWhiteTextForMainButton}>Proceed</Text>
                </Button>

                <Modal
                    presentationStyle="overFullScreen"
                    animationType="slide"
                    transparent={true}
                    visible={this.state.rateModal}
                // onRequestClose={() => {
                //     Alert.alert("Modal has been closed.");
                // }}
                >
                    <View style={styles.modalViewI}>
                        <TouchableWithoutFeedback onPress={() => this.setState({
                            rateModal: false,

                        })}>
                            <View style={{ height: hp(40) }}></View>
                        </TouchableWithoutFeedback>
                        <View style={styles.modalViewII}>

                            <View style={{ alignItems: 'center', marginTop: hp(2) }}>

                                <Image style={styles.personalImage}
                                    source={require('./Assets/images/man.png')} />
                                <Text style={{ ...styles.regDarlText, marginTop: hp(.5) }}>Adel Mehanna</Text>
                                <Text style={{
                                    ...styles.medDarkText, fontSize: wp(3.8),
                                    marginVertical: hp(1)
                                }}>How was your experience?</Text>
                                <Text style={styles.regDarlText}>Good</Text>
                                <StarRating
                                    maxStars={5}
                                    rating={4}
                                    starSize={wp(7)}
                                    fullStarColor={'#ffbb46'}
                                    halfStarColor={'#ffbb46'}
                                    disabled
                                    emptyStarColor={'#c9c9c9'}
                                    containerStyle={{ width: wp(45), marginVertical: hp(.8) }}
                                />
                                <Item style={{ width: wp(80), marginBottom: hp(3), marginTop: hp(4) }}>
                                    <TextInput

                                        placeholder="Comment..."
                                        placeholderTextColor="#bdbdbd"
                                        style={{ width: wp(70), height: hp(6), ...styles.regDarlText }}
                                    />
                                </Item>

                                <View style={{
                                    ...styles.rowAlignsentre, justifyContent: 'space-between',
                                    width: wp(80), marginTop: hp(3), marginBottom: hp(6)
                                }}>
                                    <Text style={styles.medDarkText}>Show my name</Text>
                                    <Switch
                                        trackColor={{ false: "#bdbdbd", true: "#1e1e1d" }}
                                        thumbColor={this.state.showName ? "#fff" : "#fff"}
                                        value={this.state.showName}
                                        onValueChange={() => this.setState({ showName: !this.state.showName })} />
                                </View>

                                <Button
                                    style={{ ...styles.mainDarkButton, marginTop: hp(3), marginBottom: hp(2) }}>
                                    <Text style={styles.midWhiteTextForMainButton}>Submit</Text>
                                </Button>

                            </View>

                        </View>
                    </View>
                </Modal>
            </Container>
        );
    }
}

export default FoodDetails;