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
        const { loading, loadingOthers } = this.props
        if (loading || loadingOthers) {
            return <Spinner size='large' />;
        }

    }
    endOrder(address_id) {
        const { user, order, otherApi } = this.props;

        if (order) {
            const data = { address_id, ...order }
            // console.log(data);
            otherApi('POST', 'saveOrder', data, user.access, 'saveOrder')
        }
    }
    render() {
        const { address, userApi, user, order } = this.props
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
                            <TouchableWithoutFeedback key={item.id} onPress={() => this.endOrder(item.id)}>
                                <Card style={styles.CardAddress}>
                                    <Text style={{ ...styles.regDarlText, color: '#848484' }}>
                                        {item.district + '-' + item.street + '-' + item.city.name + '/' + item.country.name}
                                    </Text>
                                    {!order ?
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
                                        </View> : null}
                                </Card>
                            </TouchableWithoutFeedback>

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


const mapStateToProps = ({ auth, others }) => {
    const { user, loading, address } = auth
    const loadingOthers = others.loading
    return { user, loading, address, loadingOthers };
};

export default connect(mapStateToProps, { userApi, otherApi })(MyAddress);

