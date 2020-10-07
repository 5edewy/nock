import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableWithoutFeedback, Animated , Easing } from 'react-native'
import { Container, Content, Icon, Card } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { Actions } from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';


const restsData = [
    { image: require('./Assets/images/tayb.png'), type: 'Chicken', rate: 4 },
    { image: require('./Assets/images/chapi.png'), type: 'Sea Food', rate: 2 },
    { image: require('./Assets/images/elbek.png'), type: 'Chicken', rate: 5 },
    { image: require('./Assets/images/shawr.png'), type: 'Burger', rate: 3 },
    { image: require('./Assets/images/tayb.png'), type: 'Chicken', rate: 4 },
    { image: require('./Assets/images/chapi.png'), type: 'Sea Food', rate: 2 },
    { image: require('./Assets/images/elbek.png'), type: 'Chicken', rate: 5 },
    { image: require('./Assets/images/shawr.png'), type: 'Burger', rate: 3 },
]
class Resturants extends Component {

    state = {
        CardScale: new Animated.Value(0),
    }
    componentDidMount = () => {
        Animated.timing(this.state.CardScale, {
            toValue: 1, duration: 600, useNativeDriver: true , easing: Easing.linear
        }).start()
    }
    
    
    _renderResturants = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={() => Actions.Menu()}>
                <Card style={styles.restCard}>
                    <View>
                        <Image style={styles.restImage}
                            source={item.image} />
                    </View>
                    <View style={{
                        alignItems: 'flex-start', marginLeft: wp(5),
                    }}>
                        <Text style={{ ...styles.medDarkText }}>Restaurant name</Text>
                        <Text style={{
                            ...styles.regDarlText, color: '#969696',
                            fontSize: wp(3)
                        }}>{item.type}</Text>
                        <StarRating
                            emptyStarColor={'#c9c9c9'}
                            maxStars={5}
                            rating={item.rate}
                            starSize={wp(3.5)}
                            fullStarColor={'#ffbb46'}
                            halfStarColor={'#ffbb46'}
                            disabled
                            containerStyle={{ width: wp(22), marginVertical: hp(.3) }}
                        />

                        <View style={{ ...styles.rowAlignsentre }}>
                            <Icon name="location-arrow" type="FontAwesome"
                                style={{ fontSize: wp(4.5), marginRight: wp(1) }} />
                            <Text style={{
                                ...styles.regDarlText, color: '#4b4b4b',
                                fontSize: wp(3.3)
                            }}>Jeddah</Text>
                        </View>
                    </View>
                </Card>
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
                    <View style={{ width: wp(25) }}>
                        <Icon name="left" type="AntDesign" />
                    </View>
                    <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2) }}>Our Restaurants</Text>

                </View>
                <View style={{ ...styles.dairaSwda, top: hp(15) }} />
                <Content>

                    <View style={{ ...styles.View90, marginTop: hp(6), marginBottom: hp(2) }}>




                        <Animated.FlatList
                            style={{ transform: [{scaleY : this.state.CardScale } ]}}
                            data={restsData}
                            renderItem={this._renderResturants}
                            keyExtractor={(item, index) => index.toString()}
                        >
                            </Animated.FlatList>
                    </View>

                </Content>
            </Container>
        );
    }
}

export default Resturants;