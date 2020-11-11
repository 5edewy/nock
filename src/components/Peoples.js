import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableWithoutFeedback, Animated, Easing } from 'react-native'
import { Container, Content, Icon, Card } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { Actions } from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';
import { L } from '../Config';
import { connect } from 'react-redux';
import { otherApi, userApi } from '../actions';
import { Spinner } from './Assets/common';


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
class Peoples extends Component {

    state = {
        CardScale: new Animated.Value(0),
    }
    componentDidMount = () => {
        Animated.timing(this.state.CardScale, {
            toValue: 1, duration: 600, useNativeDriver: true, easing: Easing.linear
        }).start()
        const { user, otherApi } = this.props
        otherApi('GET', 'nockedPepole', '', user.access, 'nockedPepole')
    }


    _renderResturants = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={() => this.getPerson(item.username)}>
                <Card style={styles.restCard}>
                    <View>
                        <Image style={styles.restImage}
                            source={item && item.photo ? { uri: item.photo } : require('./Assets/images/man.png')} />
                    </View>
                    <View style={{
                        alignItems: 'flex-start', marginLeft: wp(5),
                    }}>
                        <Text style={{ ...styles.medDarkText }}>{item.name}</Text>
                        <Text style={{
                            ...styles.regDarlText, color: '#969696',
                            fontSize: wp(3)
                        }}>{item.date_time}</Text>



                    </View>
                </Card>
            </TouchableWithoutFeedback>
        )
    }
    getPerson(username) {
        const { user, userApi } = this.props
        userApi('GET', 'getSocialMedia/' + username, '', user.access, 'nockedPepole')
    }
    render() {
        const { nockedPepole } = this.props
        // console.clear();
        // console.log(nockedPepole);
        return (
            <Container>
                <View style={{
                    flexDirection: 'row', alignItems: 'center', marginTop: hp(4),
                    paddingHorizontal: wp(3), justifyContent: 'center'
                }}>

                    <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2) }}>Peoples Nocked Me</Text>

                </View>
                <View style={{ ...styles.dairaSwda, top: hp(15) }} />
                <Content>

                    <View style={{ ...styles.View90, marginTop: hp(4), marginBottom: hp(10) }}>




                        <Animated.FlatList
                            style={{ transform: [{ scaleY: this.state.CardScale }] }}
                            data={nockedPepole}
                            renderItem={this._renderResturants}
                            keyExtractor={(item, index) => index.toString()}
                        >
                        </Animated.FlatList>
                    </View>

                </Content>
                <Spinner size='large' visible={this.props.loading} />
            </Container>
        );
    }
}

const mapStateToProps = ({ auth, others }) => {
    const { user } = auth
    const { loading, nockedPepole } = others
    return { user, loading, nockedPepole };
};

export default connect(mapStateToProps, { otherApi, userApi })(Peoples);