import React, { Component } from 'react';
import { View, Text, Image, FlatList, Animated, Easing } from 'react-native'
import { Container, Content, Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { Actions } from 'react-native-router-flux';

const chipsData = [
    { image: require('./Assets/images/chipi.png') },
    { image: require('./Assets/images/chipii.png') },
    { image: require('./Assets/images/chipiii.png') },
    { image: require('./Assets/images/chipiiii.png') },
    { image: require('./Assets/images/chipiiiii.png') },
    { image: require('./Assets/images/chipa.png') },
    { image: require('./Assets/images/chipb.png') },
    { image: require('./Assets/images/chipi.png') },
]
class BuyChips extends Component {
    state = {
        CardScale: new Animated.Value(-1.5),

    }

    startAnimate() {
        Animated.timing(this.state.CardScale, {
            toValue: 1, duration: 500, useNativeDriver: true, easing: Easing.linear
        }).start()
    }


    _renderChips = ({ item, index }) => {
        return (
            <View style={styles.chipCardI}>
                <Animated.Image onLoadEnd={() => this.startAnimate()}
                    style={{
                        ...styles.chipImage,
                        transform: [{
                            scaleY: this.state.CardScale
                        }]
                    }}
                    source={item.image} />
                <Text style={{ ...styles.medDarkText }}>Chip name</Text>

                <View style={styles.roundedView}>
                    <Image source={require('./Assets/images/sallah.png')} />
                    <View style={styles.verticalLine} />
                    <Image source={require('./Assets/images/fav.png')} />

                </View>
            </View>
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
                    <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2) }}>Buy Chips</Text>

                </View>
                <Content>
                    <View style={{ ...styles.View90, marginTop: hp(5) }}>
                        <Text style={{ ...styles.boldDarkText, fontSize: wp(4.2) }} >Choose you favourite chip to Buy</Text>
                        <FlatList
                            data={chipsData}
                            numColumns={3}
                            renderItem={this._renderChips}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                </Content>
            </Container>
        );
    }
}

export default BuyChips;