import React, { Component } from 'react';
import { Image } from 'react-native';

import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Container } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import { saveUser } from '../actions'

class Intro extends Component {

  async componentDidMount() {
    const user = await AsyncStorage.getItem('user')
    const value = JSON.parse(user)

    if (value) {
      this.props.saveUser(value)
      Actions.reset('MainStack')
    } else {
      Actions.reset('auth')
    }


  }


  render() {

    return (
      <Container>
        <Image source={require('./Assets//images/launch_screen.png')}
          style={{
            resizeMode: 'stretch', width: wp(100),
            height: hp(100)
          }} />
      </Container>

    );
  };
}


export default connect('', { saveUser })(Intro);


