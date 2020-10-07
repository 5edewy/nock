import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, Animated } from 'react-native'
import { Button, Container, Content, } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { Actions } from 'react-native-router-flux';

class Register extends Component {
    state = {
        circScale: new Animated.Value(0),
        nockRotate: new Animated.Value(0),
      
    }

    componentDidMount() {

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
                                <Text style={{ ...styles.medDarkText, fontSize: wp(7) }}>Welcome</Text>
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

                            <Button onPress={() => Actions.SignUp()}
                                style={{ ...styles.mainDarkButton, marginTop: hp(6) }}>
                                <Text style={styles.midWhiteTextForMainButton}>Sign up</Text>
                            </Button>

                            <Button onPress={() => Actions.SignIn()}
                                style={{
                                    ...styles.mainDarkButton, marginTop: hp(2),
                                    backgroundColor: '#fff'
                                }}>
                                <Text style={{ ...styles.midWhiteTextForMainButton, color: '#1e1e1d' }}>Sign in</Text>
                            </Button>

                        </View>
                    </Content>
                </ImageBackground>

            </Container>
        );
    }
}

export default Register;