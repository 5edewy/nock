import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableWithoutFeedback, Animated, Easing } from 'react-native'
import { Container, Content, Icon, Card } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { Actions } from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';

const segmentData = [
    { id: 1, title: 'All' },
    { id: 2, title: 'Italian' },
    { id: 3, title: 'Meat' },
    { id: 4, title: 'Fish' },
]
const restsData = [
    { image: require('./Assets/images/fish.png'), type: 'Chicken', rate: 4, category: 'Dish Salad' },
    { image: require('./Assets/images/waffle.png'), type: 'Desserts', rate: 2, category: 'Waffle With Cherry' },
    { image: require('./Assets/images/meat.png'), type: 'Beef', rate: 5, category: 'Meat' },
    { image: require('./Assets/images/burger.png'), type: 'Chicken', rate: 3, category: 'Burger' },
    { image: require('./Assets/images/salamon.png'), type: 'Fish', rate: 4, category: 'Salmon Fillet' },
    { image: require('./Assets/images/fish.png'), type: 'Chicken', rate: 4, category: 'Dish Salad' },
    { image: require('./Assets/images/waffle.png'), type: 'Desserts', rate: 2, category: 'Waffle With Cherry' },
    { image: require('./Assets/images/meat.png'), type: 'Beef', rate: 5, category: 'Meat' },
    { image: require('./Assets/images/burger.png'), type: 'Chicken', rate: 3, category: 'Burger' },
    { image: require('./Assets/images/salamon.png'), type: 'Fish', rate: 4, category: 'Salmon Fillet' },
]
class Menu extends Component {

    state = {
        selected: 1,
        CardScale: new Animated.Value(2),

    }

    componentDidMount = () => {
        Animated.timing(this.state.CardScale, {
            toValue: 1, duration: 500, useNativeDriver: true, easing: Easing.linear
        }).start()
    }
    _renderSegment = ({ item, index }) => {
        const { selected } = this.state;
        const textColor = selected == item.id ? '#ffffff' : '#1e1e1d'
        const bgColor = selected == item.id ? '#1e1e1d' : '#e9e9e5'
        return (
            <TouchableWithoutFeedback onPress={() => this.setState({ selected: item.id })}>
                <View style={{
                    backgroundColor: bgColor, ...styles.segmentView
                }} >
                    <Text style={{ ...styles.regDarlText, color: textColor, fontSize: wp(3.1) }}>{item.title}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    _renderResturants = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={() => Actions.Details()}>
                <Card style={{ ...styles.restCard, paddingVertical: hp(1) }}>
                    <View>
                        <Image style={styles.MenuImageForCard}
                            source={item.image} />
                    </View>
                    <View style={{
                        alignItems: 'flex-start', marginLeft: wp(5),
                    }}>
                        <Text style={{ ...styles.medDarkText }}>{item.category}</Text>
                        <Text style={{
                            ...styles.regDarlText, color: '#969696',
                            fontSize: wp(3)
                        }}>{item.type}</Text>
                        <StarRating
                            maxStars={5}
                            rating={item.rate}
                            starSize={wp(3.5)}
                            fullStarColor={'#ffbb46'}
                            halfStarColor={'#ffbb46'}
                            disabled
                            emptyStarColor={'#c9c9c9'}
                            containerStyle={{ width: wp(22), marginVertical: hp(.3) }}
                        />


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
                        <Icon name={L('arrow')} type="AntDesign" />
                    </View>
                    <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2) }}>Restaurant name</Text>


                </View>
                <View style={{ alignItems: 'center', marginTop: hp(5), marginBottom: hp(2) }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={segmentData}
                        horizontal
                        renderItem={this._renderSegment}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>



                <View style={{ ...styles.dairaSwda, top: hp(23) }} />
                <Content>

                    <View style={{ ...styles.View90, marginTop: hp(3), marginBottom: hp(2) }}>

                        <Animated.FlatList
                            style={{ transform: [{ scaleY: this.state.CardScale }] }}
                            data={restsData}
                            renderItem={this._renderResturants}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                </Content>
            </Container>
        );
    }
}

export default Menu;