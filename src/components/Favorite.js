import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Animated, Easing } from 'react-native'
import { Container, Content, Grid, Icon, Thumbnail } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { otherApi, changeValue } from '../actions';
import { Spinner } from './Assets/common';
import { L, addCart } from '../Config';
import FastImage from 'react-native-fast-image'




class BuyChips extends Component {
    state = {
        CardScale: new Animated.Value(-1.5), updateCart: 1,
        translatey: new Animated.Value(hp(50)),
        translateX: new Animated.Value(wp(50)),
        opacity: new Animated.Value(0),
        rotatechip: new Animated.Value(0),
        image: ''

    }
    componentDidMount() {
        const { user, otherApi } = this.props
        // otherApi('GET', 'getProducts', '', user.access, 'products')


        otherApi('GET', 'favorite', '', user.access, 'favorite')
    }
    startAnimate() {
        Animated.timing(this.state.CardScale, {
            toValue: 1, duration: 500, useNativeDriver: true, easing: Easing.linear
        }).start()
    }
    addToCart(item) {
        const { cart, changeValue } = this.props
        const newCart = addCart(item, cart)
        changeValue({ cart: newCart })
        this.setState({ updateCart: 1 })
    }
    _renderChips = ({ item }) => {
        const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
        const { otherApi, user } = this.props
        const click = () => otherApi('POST', 'addDeleteFavorite', { product_id: item.id }, user.access, 'favorite')
        return (
            <View style={styles.chipCardI} key={item.id}>
                <AnimatedFastImage
                    onLoadEnd={() => this.startAnimate()}
                    style={{
                        ...styles.chipImage,
                        transform: [{
                            rotateY: this.state.CardScale.interpolate({
                                inputRange: [0, 1],
                                outputRange: ["90deg", "0deg"]
                            })
                        }]
                    }}
                    source={{
                        uri: item.photos[0],
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />

                <Text style={{ ...styles.medDarkText }} numberOfLines={1}>{item.title}</Text>

                <View style={styles.roundedView}>
                    <TouchableWithoutFeedback onPress={() => this.animatedff(item)}>
                        <Image source={require('./Assets/images/sallah.png')} />
                    </TouchableWithoutFeedback>
                    <View style={styles.verticalLine} />
                    <TouchableWithoutFeedback onPress={click}>
                        <Icon name={'heart'} style={{ color: 'red', fontSize: wp(5) }} type="AntDesign" />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
    _renderLoading() {
        const { loading } = this.props
        return <Spinner size='large' visible={loading} />;
    }
    animatedff(item) {
        this.setState({ image: item.photos[0] })
        Animated.stagger(10, [
            Animated.timing(this.state.opacity, {
                toValue: 1, duration: 1500, useNativeDriver: true
            }),
            Animated.timing(this.state.translatey, {
                toValue: hp(-1), duration: 1500, useNativeDriver: true
            }),
            Animated.timing(this.state.rotatechip, {
                toValue: 1, duration: 1500, useNativeDriver: true
            }),
            Animated.timing(this.state.translateX, {
                toValue: wp(90), duration: 1500, useNativeDriver: true
            }),



        ]).start(
            () => Animated.stagger(1, [
                Animated.spring(this.state.opacity, {
                    toValue: 0, duration: 1, useNativeDriver: true
                }),
                Animated.spring(this.state.translatey, {
                    toValue: hp(50), duration: 500, useNativeDriver: true
                }),
                Animated.spring(this.state.rotatechip, {
                    toValue: 0, duration: 500, useNativeDriver: true
                }),
                Animated.spring(this.state.translateX, {
                    toValue: wp(50), duration: 500, useNativeDriver: true
                }),



            ]).start(
                this.addToCart(item)
            )
        )
    }
    render() {
        const { favorite, cart } = this.props
        const { opacity, translatey, translateX, rotatechip, image } = this.state
        // console.log(products);
        return (
            <Container>
                <View style={{
                    flexDirection: 'row', alignItems: 'center', marginTop: hp(4),
                    paddingHorizontal: wp(3), justifyContent: 'space-between'
                }}>
                    <TouchableWithoutFeedback onPress={() => Actions.pop()}>
                        <View style={{ width: wp(10) }}>
                            <Icon name={L('arrow')} type="AntDesign" />
                        </View>
                    </TouchableWithoutFeedback>

                    <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2) }}>{L('favorite')}</Text>
                    {cart && cart.length > 0 ?
                        <TouchableWithoutFeedback onPress={() => Actions.push('Mycard')}>
                            <View style={{ width: wp(10) }}>
                                <Icon name="shoppingcart" type="AntDesign" />
                            </View>
                        </TouchableWithoutFeedback>
                        : <View style={{ width: wp(10) }} />}
                </View>
                <Animated.View style={{
                    position: 'absolute', zIndex: 99999,
                    transform: [{ translateY: translatey }, { translateX: translateX }, {
                        rotateY: rotatechip.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0deg", "180deg"]
                        })
                    }],
                    opacity: opacity
                }} >
                    {image ? <Thumbnail style={styles.chipImage} source={{ uri: image }} /> : null}
                </Animated.View>
                <Content>
                    <View style={{ ...styles.View90, marginTop: hp(5) }}>
                        <Text style={{ ...styles.boldDarkText, fontSize: wp(4.2) }} >{L('Choose you favourite chip to Buy')}</Text>
                        <Grid style={{ width: wp(90), flexWrap: 'wrap' }}>
                            {favorite.map((item) => (
                                this._renderChips({ item })
                            )
                            )}
                        </Grid>


                    </View>

                </Content>
                {this._renderLoading()}
            </Container>
        );
    }
}

const mapStateToProps = ({ auth, others }) => {
    const { user } = auth
    const { loading, favorite, cart } = others
    return { user, loading, favorite, cart };
};

export default connect(mapStateToProps, { otherApi, changeValue })(BuyChips);


