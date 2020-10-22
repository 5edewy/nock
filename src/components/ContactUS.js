import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Alert } from 'react-native'
import { Container, Content, Icon, Input, Textarea, Button } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { L } from '../Config';
import { otherApi } from '../actions';
import { Spinner } from './Assets/common';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';


class ContactUS extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        message: ''
    }
    componentDidMount() {
        const { user } = this.props
        if (user) {
            this.setState({ name: user.name, email: user.email, phone: user.phone })
        }
    }
    _renderLoading() {
        const { loading } = this.props
        if (loading) {
            return <Spinner size='large' />;
        }
    }
    submit() {
        const { name, email, phone, message } = this.state;
        const { otherApi, user } = this.props
        const data = { name, email, phone, message }

        for (const [key, value] of Object.entries(data)) {
            if (!value) {
                Alert.alert(L('emptyField') + L(key))
                return
            }
        }

        otherApi('POST', 'contactUs', data, user.access, 'contactUs')
    }
    render() {
        const { name, email, phone, message } = this.state
        return (
            <Container>
                <View style={{ height: hp(40), }}>
                    <View style={[styles.header, { justifyContent: 'space-between', zIndex: 9999 }]}>
                        <TouchableWithoutFeedback onPress={() => Actions.pop()}>
                            <View style={{ width: wp(10) }}>
                                <Icon name={L('arrow')} type="AntDesign" style={{ color: '#fff' }} />
                            </View>
                        </TouchableWithoutFeedback>

                        <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2), color: '#fff' }}>{L('Contact US')}</Text>
                        <View style={{ width: wp(10) }} />
                    </View>
                    <Image style={{ tintColor: '#fff', alignSelf: 'center', bottom: hp(-20) }}
                        source={require('./Assets/images/nock.png')} />
                    <Image style={{
                        width: wp(100), height: hp(40), borderBottomLeftRadius: wp(10),
                        borderBottomRightRadius: wp(10), position: 'absolute', zIndex: -1, opacity: .95
                    }}
                        source={require('./Assets/images/conactus.png')} />
                    <View style={{
                        height: hp(40), width: wp(100), backgroundColor: '#100f0f', position: 'absolute',
                        opacity: .5, borderBottomLeftRadius: wp(10), borderBottomRightRadius: wp(10)
                    }} />
                </View>
                <Content>
                    <View style={{ ...styles.View90, marginTop: hp(3), marginBottom: hp(1) }}>

                        <View style={styles.InputoutView}>

                            <Input
                                onChangeText={(name) => this.setState({ name })}
                                value={name}
                                keyboardType='default'
                                placeholder={L('name')}
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />
                        </View>

                        <View style={styles.InputoutView}>
                            <Input
                                onChangeText={(email) => this.setState({ email })}
                                value={email}
                                keyboardType='email-address'
                                placeholder={L("email")}
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />

                        </View>
                        <View style={styles.InputoutView}>
                            <Input
                                onChangeText={(phone) => this.setState({ phone })}
                                value={phone}
                                keyboardType={'phone-pad'}
                                placeholder={L("phone")}
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />

                        </View>
                        <Textarea
                            onChangeText={(message) => this.setState({ message })}
                            value={message}
                            placeholderTextColor="#a2a2a2"
                            style={styles.textAreastyle}
                            placeholder={L('message')}
                            rowSpan={6}

                        />

                        <Button style={{ ...styles.mainDarkButton, marginTop: hp(5), marginBottom: hp(1) }} onPress={() => this.submit()}>
                            <Text style={styles.midWhiteTextForMainButton}>{L('send')}</Text>
                        </Button>
                    </View>
                </Content>
                {this._renderLoading()}
            </Container>
        );
    }
}

const mapStateToProps = ({ auth, others }) => {
    const { user } = auth
    const { loading } = others
    return { user, loading };
};

export default connect(mapStateToProps, { otherApi })(ContactUS);

