import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { changeLng } from './Config'
import Router from './Router';
import { Actions } from 'react-native-router-flux';
import { Root, Header } from 'native-base';
import { Linking } from 'react-native';


class App extends Component {

    constructor(props) {
        super(props);

        this.handleOpenURL = this.handleOpenURL.bind(this);
    }
    state = { lang: false }
    async componentDidMount() {
        Linking
            .getInitialURL()
            .then(url => this.handleOpenURL({ url }))
            .catch(console.error);

        Linking.addEventListener('url', this.handleOpenURL);
        this.checkLang()
        SplashScreen.hide();
    }
    async checkLang() {
        try {
            let lang = await AsyncStorage.getItem('language');
            if (lang) {
                changeLng(lang)
                this.setState({ lang: true })
                Actions.reset('intro')
            } else {
                changeLng('en', 1)
            }
        } catch (error) {
            // console.log(error);
        }
    }
    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL(event) {
        if (event.url && event.url.indexOf(this.props.scheme + '://') === 0) {
            console.log(event);
            // crossroads.parse(event.url.slice(this.props.scheme.length + 3));
        }
    }
    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Root>
                <Provider store={store}>
                    {(this.state.lang) ? (
                        <Router {...this.props} />
                    ) : null}
                </Provider>
            </Root>
        );

    }
}

export default App;
