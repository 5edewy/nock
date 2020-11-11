import React, { Component } from 'react';
import { StyleSheet, View, Animated, TouchableWithoutFeedback, Text } from 'react-native'
import { Card, Container, Content, Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Home from './Home';
import { userApi, changeValue } from '../actions';
import { connect } from 'react-redux';
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';
import Peoples from './Peoples';
const tabs = ["caretup", "user"]
class TabbarForTwo extends Component {
    async componentDidMount() {


        NfcManager.start();
        try {
            const val = await AsyncStorage.getItem('user')
            const user = JSON.parse(val)
            // console.log(user);
            if (user) {

                this.props.changeValue({ user })


                Animated.timing(this.state.scanButton, {
                    toValue: wp(L('scanOpen')), duration: 1000, easing: Easing.ease, useNativeDriver: true
                }).start()
            }
        } catch (error) {

        }
        const { id } = this.props
        // console.log(this.props);
        if (id) {
            this.getNockedTag(id)
        }

    }

    getNockedTag(username) {
        const { user, userApi } = this.props
        userApi('GET', 'getSocialMedia/' + username, '', user.access, 'nockedSocail')
    }
    state = {
        selectedTabpage: 1,
        taboneY: new Animated.Value(hp(-3)),
        taboneopacity: new Animated.Value(1),
        tabonerotate: new Animated.Value(1),
        tabIIY: new Animated.Value(0),
        tabIIopacity: new Animated.Value(.5),
        tabIIrotate: new Animated.Value(0)
    }

    _renderPages() {
        if (this.state.selectedTabpage == 1) {
            return <Home />
        } if (this.state.selectedTabpage == 2) {
            return <Peoples />
        }
    }


    _SelectTabone = (index) => {
        const { taboneY, taboneopacity, tabonerotate, tabIIY, tabIIopacity, tabIIrotate } = this.state
        Animated.spring(tabIIY, {
            toValue: 0,
            useNativeDriver: true,
            friction: 5
        }).start()
        Animated.spring(tabIIopacity, {
            toValue: .5,
            useNativeDriver: true
        }).start()
        Animated.spring(tabIIrotate, {
            toValue: 0,
            useNativeDriver: true
        }).start()
        Animated.spring(taboneY, {
            toValue: hp(-3),
            useNativeDriver: true,
            friction: 5
        }).start()
        Animated.spring(taboneopacity, {
            toValue: 1,
            useNativeDriver: true
        }).start()
        Animated.spring(tabonerotate, {
            toValue: 1,
            useNativeDriver: true
        }).start()
        this.setState({ selectedTabpage: 1 })
    }


    _SelectTabTwo = (index) => {
        const { taboneY, taboneopacity, tabonerotate, tabIIY, tabIIopacity, tabIIrotate } = this.state
        Animated.spring(taboneY, {
            toValue: 0,
            useNativeDriver: true,
            friction: 5
        }).start()
        Animated.spring(taboneopacity, {
            toValue: .5,
            useNativeDriver: true
        }).start()
        Animated.spring(tabonerotate, {
            toValue: 0,
            useNativeDriver: true
        }).start()
        Animated.spring(tabIIY, {
            toValue: hp(-3),
            useNativeDriver: true,
            friction: 5
        }).start()
        Animated.spring(tabIIopacity, {
            toValue: 1,
            useNativeDriver: true
        }).start()
        Animated.spring(tabIIrotate, {
            toValue: 1,
            useNativeDriver: true
        }).start()
        this.setState({ selectedTabpage: 2 })
    }
    render() {
        const { taboneY, taboneopacity, tabonerotate, tabIIY, tabIIopacity, tabIIrotate } = this.state
        return (
            <View style={StyleSheet.absoluteFill}>
                {this._renderPages()}

                <Card style={{
                    height: hp(13), backgroundColor: '#fff', flexDirection: 'row', alignSelf: 'center', width: wp(100), alignItems: 'center',
                    borderTopRightRadius: wp(8), borderTopLeftRadius: wp(8), position: 'absolute',
                    justifyContent: 'space-around', paddingHorizontal: wp(15), bottom: 0
                }}>
                    <TouchableWithoutFeedback onPress={() => this._SelectTabone()}>
                        <View style={{ alignItems: 'center' }}>
                            <Animated.View style={{
                                backgroundColor: "#1e1e1d", width: wp(16), height: wp(16), borderRadius: wp(16 / 2),
                                justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
                                transform: [{ translateY: taboneY }, {
                                    rotateY: tabonerotate.interpolate({
                                        inputRange: [0, .5, 1],
                                        outputRange: ["0deg", "90deg", "0deg"]
                                    })
                                }],
                                opacity: taboneopacity
                            }}>
                                <Icon name="home" type="AntDesign" style={{ fontSize: wp(6.5), color: '#fff' }} />

                            </Animated.View>
                            <Animated.Text style={{ opacity: taboneopacity, color: '#1e1e1d' }}>Home</Animated.Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() => this._SelectTabTwo()}
                    >
                        <View style={{ alignItems: 'center' }}>
                            <Animated.View style={{
                                backgroundColor: "#1e1e1d", width: wp(16), height: wp(16), borderRadius: wp(16 / 2),
                                justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
                                transform: [{ translateY: tabIIY }, {
                                    rotateY: tabIIrotate.interpolate({
                                        inputRange: [0, .5, 1],
                                        outputRange: ["0deg", "90deg", "0deg"]
                                    })
                                }],
                                opacity: tabIIopacity
                            }}>
                                <Icon name="user" type="AntDesign" style={{ fontSize: wp(6.5), color: '#fff' }} />
                            </Animated.View>
                            <Animated.Text style={{ opacity: taboneopacity, color: '#1e1e1d' }}>People</Animated.Text>
                        </View>
                    </TouchableWithoutFeedback>

                </Card>
            </View >
        );
    }
}


const mapStateToProps = ({ auth }) => {
    const { user } = auth

    return { user };
};

export default connect(mapStateToProps, { userApi })(TabbarForTwo);

