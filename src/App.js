import React, { Component } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { View, Text } from 'react-native';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Router from './Router'

class App extends Component {

    componentDidMount() {
        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
    }

    render() {
        return <Router />

    }
}

export default App;