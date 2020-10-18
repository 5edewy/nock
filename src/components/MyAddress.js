import React, { Component } from 'react';
import { View, Text, } from 'react-native'
import { Container, Content, Icon, Button, Card } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { Actions } from 'react-native-router-flux';

class MyAddress extends Component {



    render() {
        return (
            <Container>
                <View style={styles.header}>
                    <View style={{ width: wp(33) }}>
                        <Icon name="left" type="AntDesign" />
                    </View>
                    <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2) }}>My Address</Text>

                </View>
                <Content>
                    <View style={{ ...styles.View90, marginTop: hp(6) }} >

                        <Card style={styles.CardAddress}>
                            <Text style={{ ...styles.regDarlText, color: '#848484' }}>إسم الشارع, جدة, المملكة العربية السعودية</Text>
                            <View style={{ ...styles.row_aliCentre, marginTop: hp(2) }}>
                                <View style={styles.smallcheckbos}>
                                    <Icon name="check" type="AntDesign" style={{ fontSize: wp(4.3) }} />
                                </View>
                                <Text style={{ ...styles.semiBoldDarkText, marginHorizontal: wp(2) }}>Choose as default </Text>
                            </View>
                        </Card>

                        <Button onPress={() => Actions.AddAddress()}
                            style={{ ...styles.adrrButton, marginTop: hp(4) }}>
                            <Icon name="pluscircleo" type="AntDesign" style={{ fontSize: wp(7.5), color: '#fff' }} />
                            <Text style={{ ...styles.lightDarkText, color: '#fff' }}>Add new address</Text>
                        </Button>
                    </View>
                </Content>
                <Button style={{ ...styles.mainDarkButton, marginTop: hp(3), marginBottom: hp(3) }}>
                    <Text style={styles.midWhiteTextForMainButton}>Confirm Address</Text>
                </Button>
            </Container>
        );
    }
}

export default MyAddress;