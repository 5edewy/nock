import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, Animated, TouchableWithoutFeedback } from 'react-native'
import { Button, Container, Content, } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { Actions } from 'react-native-router-flux';
import { L } from '../Config';
import { connect } from 'react-redux';
import { userApi, clearUser } from '../actions';

class Register extends Component {
    state = {
        circScale: new Animated.Value(0),
        nockRotate: new Animated.Value(.01),

    }

    componentDidMount() {
        this.props.clearUser()
        Animated.stagger(10, [
            Animated.timing(this.state.circScale, {
                toValue: 1, duration: 600, useNativeDriver: true
            }),
            Animated.timing(this.state.nockRotate, {
                toValue: 1, duration: 1500, useNativeDriver: true
            })
        ]).start()


    }


    render() {
        return (
            <Container>

                <ImageBackground style={{ width: wp(100), height: hp(100) }}
                    source={require('./Assets/images/bg.png')}>

                    <Content>
                        <View style={styles.regViewI}>
                            <Animated.Image style={{
                                ...styles.circImage,
                                transform: [{ scale: this.state.circScale }]
                            }}
                                source={require('./Assets/images/daira.png')} />


                            <View style={styles.regViewII}>
                                <Text style={{ ...styles.medDarkText, fontSize: wp(7) }}>{L('Welcome')}</Text>
                                <Animated.Image style={{
                                    ...styles.nockDarkImage,
                                    transform: [{
                                        rotateY: this.state.nockRotate.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ["270deg", "0deg"]
                                        })
                                    }]
                                }}
                                    source={require('./Assets/images/nock.png')} />
                            </View>

                            <Button onPress={() => Actions.push('SignUp')}
                                style={{ ...styles.mainDarkButton, marginTop: hp(6) }}>
                                <Text style={styles.midWhiteTextForMainButton}>{L('SignUp')}</Text>
                            </Button>


                            <Button onPress={() => Actions.push('SignIn')}
                                style={{
                                    ...styles.mainDarkButton, marginTop: hp(2),
                                    backgroundColor: '#fff'
                                }}>
                                <Text style={{ ...styles.midWhiteTextForMainButton, color: '#1e1e1d' }}>{L('Signin')}</Text>
                            </Button>

                        </View>

                        {/* <TouchableWithoutFeedback onPress={() => Actions.reset('MainStack')}>
                            <Text style={{
                                ...styles.midWhiteTextForMainButton, color: '#1e1e1d',
                                marginTop: hp(1), alignSelf: 'center',
                            }}>Skip</Text>
                        </TouchableWithoutFeedback> */}
                    </Content>

                </ImageBackground>

            </Container>
        );
    }
}


const mapStateToProps = ({ auth }) => {
    const { user, loading } = auth

    return { user, loading };
};

export default connect(mapStateToProps, { userApi, clearUser })(Register);

