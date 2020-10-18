import React, { Component } from 'react';
import { View, Text, } from 'react-native'
import { Container, Content, Icon, Button, Card, Input } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';

class AddAddress extends Component {
    state = { address: '' }


    render() {
        const { address } = this.state;
        return (
            <Container>
                <View style={styles.header}>
                    <View style={{ width: wp(33) }}>
                        <Icon name="left" type="AntDesign" />
                    </View>
                    <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2) }}>Add Address</Text>

                </View>
                <Content>
                    <View style={{ ...styles.View90, marginTop: hp(6) }} >
                        <View style={styles.InputoutView}>

                            <Input
                                onChangeText={(address) => this.setState({ address })}
                                value={address}
                                keyboardType='email-address'
                                placeholder="Address..."
                                placeholderTextColor="#a2a2a2"
                                style={styles.inputStyle} />
                        </View>

                    </View>
                </Content>
                <Button style={{ ...styles.mainDarkButton, marginTop: hp(3), marginBottom: hp(3) }}>
                    <Text style={styles.midWhiteTextForMainButton}>Add Address</Text>
                </Button>
            </Container>
        );
    }
}

export default AddAddress;