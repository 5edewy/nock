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
import Favorite from './components/Favorite';
import Payment from './components/Payment';
import AnimationRest from './components/AnimationRest';
import Intro from './components/Intro';
import EditMyProfile from './components/EditMyProfile';
import MyProfile from './components/MyProfile';
import MyOrders from './components/MyOrders';
import MyCard from './components/MyCard';
import ContactUS from './components/ContactUS';
import MyAddress from './components/MyAddress';
import AddAddress from './components/AddAddress';
import Pay from './components/Pay';
import Order from './components/Order';
import Language from './components/Language';

import crossroads from 'crossroads';
import Forget from './components/Forget';
import TabbarForTwo from './components/TabbarForTwo';

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
    <Router uriPrefix={'nockapp.net'}>
      <Stack key="root" >
        <Stack key='intro' component={Intro} hideNavBar />

        <Stack key='auth' hideNavBar>
          <Scene key="Reg" component={Register} hideNavBar />
          <Scene key="SignUp" component={SignUp} hideNavBar />
          <Scene key="SignIn" component={SignIn} hideNavBar />
          <Scene key="Forget" component={Forget} hideNavBar />
        </Stack>
        <Stack key='language' component={Language} hideNavBar />


        <Stack key="MainStack" path={"/ar/users/shipProfile/:id/"} hideNavBar  >
          {/* <Scene tabs key="MainFlow" showLabel={false}
            tabBarStyle={styles.tabBarStyles}
            path={"/ar/users/shipProfile/:id/"}
            hideNavBar
          > */}
          <Scene key="Home" path={"/ar/users/shipProfile/:id/"} component={TabbarForTwo} hideNavBar /*icon={TabIcon}
            iconName={require('./components/Assets/images/homei.png')}
            tabText="Home" initial*/ />
          {/* <Scene key="Home" path={"/ar/users/shipProfile/:id/"} component={Home} hideNavBar icon={TabIcon}
            iconName={require('./components/Assets/images/homei.png')}
            tabText="Home" initial /> */}
          {/* <Scene key="People" component={SignUp} hideNavBar icon={TabIcon}
            iconName={require('./components/Assets/images/pep.png')}
            tabText="People" /> */}

          {/* </Scene> */}





          <Scene key="BuyChips" component={BuyChips} hideNavBar />
          <Scene key="Favorite" component={Favorite} hideNavBar />
          <Scene key="Scan" component={ScanChips} hideNavBar />
          {/* <Scene key="Rests" component={Resturants} hideNavBar  />
          <Scene key="Menu" component={Menu} hideNavBar />
          <Scene key="Details" component={FoodDetails} hideNavBar /> */}
          <Scene key="Payment" component={Payment} hideNavBar />
          <Scene key="pay" component={Pay} hideNavBar />


          <Scene key="EditMyProfile" component={EditMyProfile} hideNavBar />
          <Scene key="Myprofile" component={MyProfile} hideNavBar />
          <Scene key="MyOrders" component={MyOrders} hideNavBar />
          <Scene key="order" component={Order} hideNavBar />
          <Scene key="Mycard" component={MyCard} hideNavBar />
          <Scene key="ConactUS" component={ContactUS} hideNavBar />
          <Scene key="MyAdress" component={MyAddress} hideNavBar />
          <Scene key="AddAddress" component={AddAddress} hideNavBar />
          {/* <Scene key="Resssts" component={AnimationRest} hideNavBar /> */}
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


export default Routercomponent