import React from 'react';
import { Image, View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Router, Tabs, Scene, Drawer, Stack } from 'react-native-router-flux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Register from './components/Register';
import BuyChips from './components/BuyChips';
import ScanChips from './components/ScanChips';
import Resturants from './components/Resturants';
import Menu from './components/Menu';
import FoodDetails from './components/FoodDetails';
import Payment from './components/Payment';
import AnimationRest from './components/AnimationRest';



class TabIcon extends React.Component {
  render() {
    return (

      <View style={styles.tabBorder} >
        <View style={{
          ...styles.tabStyle,
          backgroundColor: this.props.focused ? '#1e1e1d' : '#fff'
        }}>
          <Image
            style={{
              tintColor: this.props.focused ? '#fff' : '#a7a7a7',
              opacity: this.props.focused ? 1 : .8,
              ...styles.tabImage
            }}
            source={this.props.iconName}
          />
        </View>
        <Text
          style={{
            fontSize: wp(3.5),
            opacity: this.props.focused ? 1 : 1,
            color: this.props.focused ? '#1e1e1d' : '#a7a7a7',
            fontFamily: this.props.focused ? 'Poppins-Medium' : 'Poppins-Regular'
          }}>
          {this.props.tabText}
        </Text>
      </View>

    );
  }
}


const Routercomponent = () => {

  return (
    <Router>
      <Stack key="root"       >





        <Stack key="MainStack" hideNavBar >


          <Tabs key="MainFlow" showLabel={false}
            tabBarStyle={styles.tabBarStyles}
            hideNavBar
          >

            <Scene key="Home" component={Home} hideNavBar icon={TabIcon}
              iconName={require('./components/Assets/images/homei.png')}
              tabText="Home" initial />

            <Scene key="People" component={SignUp} hideNavBar icon={TabIcon}
              iconName={require('./components/Assets/images/pep.png')}
              tabText="People" />

          </Tabs>




          <Scene key="SignIn" component={SignIn} hideNavBar />
          <Scene key="SignUp" component={SignUp} hideNavBar />
          <Scene key="Reg" component={Register} hideNavBar />
          <Scene key="BuyChips" component={BuyChips} hideNavBar />
          <Scene key="Scan" component={ScanChips} hideNavBar />
          <Scene key="Rests" component={Resturants} hideNavBar />
          <Scene key="Menu" component={Menu} hideNavBar />
          <Scene key="Details" component={FoodDetails} hideNavBar />
          <Scene key="Payment" component={Payment} hideNavBar />




          <Scene key="Resssts" component={AnimationRest} hideNavBar />













        </Stack>
      </Stack>
    </Router>
  );
}


const styles = StyleSheet.create({
  tabBorder: {
    width: wp(30),
    alignSelf: 'center', alignItems: 'center', justifyContent: 'center', alignContent: 'center'
  },
  tabStyle: {
    width: wp(12), height: wp(12), borderRadius: wp(12 / 2),
    alignItems: 'center', justifyContent: 'center',
  },
  tabImage: {
    alignSelf: 'center',
    width: wp(5.8),
    height: wp(5.8),
    resizeMode: 'contain',
  },
  tabBarStyles: {
    backgroundColor: '#fff', borderWidth: .2, height: hp(11), borderColor: '#12000000',
    alignSelf: 'center', borderTopRightRadius: hp(5), borderTopLeftRadius: hp(5),
    justifyContent: 'center', alignItems: 'center'
  }
})
export default Routercomponent;  