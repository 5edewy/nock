import React from 'react';
import { View, ActivityIndicator, Text, Modal } from 'react-native';
import { widthPercentageToDP as scale, heightPercentageToDP as verticalScale } from 'react-native-responsive-screen'


const Spinner = ({ size, visible }) => {
  if (size === 'large') {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          zIndex: 999,
          width: scale(100),
          height: verticalScale(100),
          flexDirection: 'column',
          // justifyContent: 'center',
          paddingTop: verticalScale(10),
          alignItems: 'center',
          alignContent: 'center',
          backgroundColor: 'rgba(52, 52, 52, 0.8)',
          elevation: scale(100),
        }}>
        <ActivityIndicator animating color="#2d50a7" size='large'
          style={{
            position: 'absolute',
            zIndex: 999,
            backgroundColor: '#fff',
            width: scale(20),
            height: scale(20),
            borderRadius: 5
          }} />
      </View>

    );
  } else {
    return (<ActivityIndicator animating color="#2d50a7" size='large' />)
  }
};



export { Spinner };
