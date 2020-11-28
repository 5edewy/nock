import React, { Component } from 'react';
import { View, Modal, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { otherApi, changeValue } from '../actions';
import { Spinner } from './Assets/common';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { WebView } from 'react-native-webview';
import { paymentUrl, L } from '../Config';
import { Button } from 'native-base';

class Pay extends Component {
    state = {
        paymentModal: false, loading: false, message: '',
        image: require('./Assets/images/verified.png')
    }

    checkUrl(text) {
        if (text.url == paymentUrl + "failed") {
            this.setState({
                paymentModal: true, message: L('payCanceld'),
                image: require('./Assets/images/error.png')
            })

        } else if (text.url == paymentUrl + "success") {
            this.setState({
                paymentModal: true, message: L('payConfirmed'),
                image: require('./Assets/images/verified.png')
            })
        }
        // console.log(text.url);
    }

    closeModal() {
        this.setState({
            paymentModal: false,
        });
        Actions.pop()
        Actions.push('MyOrders', { segment: 2 })
    }

    _renderLoading() {
        if (this.state.loading || this.props.loading) {
            return <Spinner size='large' />;
        }

    }
    render() {

        return (
            <View style={{ height: hp(100), width: wp(100), overflow: 'hidden' }}>
                <WebView
                    source={{ uri: this.props.url }}
                    onNavigationStateChange={this.checkUrl.bind(this)}
                    onLoad={() => this.setState({ loading: true })}
                    onLoadStart={() => this.setState({ loading: true })}
                    onLoadEnd={() => this.setState({ loading: false })}
                    useWebKit={true}
                    scalesPageToFit={true}
                />
                {this._renderLoading()}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.paymentModal}
                    onRequestClose={this.closeModal.bind(this)}
                    hardwareAccelerated={true}
                    presentationStyle="overFullScreen">
                    <View style={styles.modalContainerlStyle}>
                        <View
                            style={[
                                styles.modalStyle,
                                {
                                    width: wp(90),
                                    padding: 0,
                                    borderRadius: wp(6),
                                    overflow: 'hidden',
                                    padding: wp(10),
                                    alignItems: 'center',
                                },
                            ]}>
                            <Text style={[styles.fontBold, { color: '#434343' }]}>
                                {this.state.message}
                            </Text>
                            <Image
                                source={this.state.image}
                                style={{
                                    height: wp(40),
                                    width: wp(40),
                                    marginTop: hp(3),
                                }}
                            />
                        </View>
                        <Button style={{ ...styles.mainDarkButton, marginTop: hp(3), marginBottom: hp(1) }}
                            nPress={() => this.closeModal()}>
                            <Text style={styles.midWhiteTextForMainButton}>{L('close')}</Text>
                        </Button>

                    </View>
                </Modal>
            </View>

        );

    };
}
const mapStateToProps = ({ others, auth }) => {
    const { loading } = others;
    const { user } = auth
    return { loading, user };
};

export default connect(mapStateToProps, { otherApi })(Pay);
