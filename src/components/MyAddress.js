import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { Container, Content, Icon, Button, Card } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { Actions } from 'react-native-router-flux';
import { otherApi, userApi } from '../actions';
import { Spinner } from './Assets/common';
import { connect } from 'react-redux';
import { L } from '../Config';


class MyAddress extends Component {
    componentDidMount() {
        const { userApi, user } = this.props
        userApi('GET', 'myAddress', '', user.access, 'address')
    }
    _renderLoading() {
        const { loading } = this.props
        if (loading) {
            return <Spinner size='large' />;
        }
    }

    render() {
        const { address, userApi, user } = this.props
        return (
            <Container>
                <View style={[styles.header, { justifyContent: 'space-between' }]}>
                    <TouchableWithoutFeedback onPress={() => Actions.pop()}>
                        <View style={{ width: wp(10) }}>
                            <Icon name={L('arrow')} type="AntDesign" />
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2) }}>{L('My Address')}</Text>
                    <View style={{ width: wp(10) }} />
                </View>
                <Content>
                    <View style={{ ...styles.View90, marginTop: hp(6) }} >
                        {address.map((item) => (
                            <Card style={styles.CardAddress} key={item.id}>
                                <Text style={{ ...styles.regDarlText, color: '#848484' }}>
                                    {item.district + '-' + item.street + '-' + item.city.name + '/' + item.country.name}
                                </Text>
                                <View style={{ ...styles.row_aliCentre, marginTop: hp(2) }}>
                                    <TouchableWithoutFeedback
                                        onPress={() => userApi('GET', 'deleteAddress/' + item.id, '', user.access, 'address')}
                                    >
                                        <View style={styles.smallcheckbos}>
                                            <Icon name="delete" type='AntDesign' style={{ fontSize: wp(4.3) }} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => Actions.AddAddress({ item })}>
                                        <View style={styles.smallcheckbos}>
                                            <Icon name="edit" type="AntDesign" style={{ fontSize: wp(4.3) }} />
                                        </View>
                                    </TouchableWithoutFeedback>


                                </View>
                            </Card>
                        )
                        )}

                        <Button onPress={() => Actions.AddAddress()}
                            style={{ ...styles.adrrButton, marginTop: hp(4) }}>
                            <Icon name="pluscircleo" type="AntDesign" style={{ fontSize: wp(7.5), color: '#fff' }} />
                            <Text style={{ ...styles.lightDarkText, color: '#fff' }}>{L('Add Address')}</Text>
                        </Button>
                    </View>
                </Content>

                { this._renderLoading()}
            </Container>
        );
    }
}


const mapStateToProps = ({ auth }) => {
    const { user, loading, address } = auth

    return { user, loading, address };
};

export default connect(mapStateToProps, { userApi })(MyAddress);

