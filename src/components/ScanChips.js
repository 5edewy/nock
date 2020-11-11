import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import { Button, Container, Content, Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native'
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';
import { L } from '../Config';
function buildUrlPayload(valueToWrite) {
    return Ndef.encodeMessage([
        Ndef.uriRecord(valueToWrite),
    ]);
}
class ScanChips extends Component {

    componentDidMount() {
        NfcManager.start();
    }

    componentWillUnmount() {
        this._cleanUp();
    }

    _cleanUp = () => {
        NfcManager.cancelTechnologyRequest().catch(() => 0);
    }

    _writeData = async () => {
        const { user } = this.props
        if (!user.username) {
            Alert.alert("Nothing to write");
            return;
        }
        try {
            let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
            let resp = await NfcManager.requestTechnology(tech, {
                alertMessage: 'Ready to do some custom Mifare cmd!'
            });

            let text = "nockapp://nockapp.net/home/" + user.username;
            let fullLength = text.length + 7;
            let payloadLength = text.length + 3;

            let cmd = Platform.OS === 'ios' ? NfcManager.sendMifareCommandIOS : NfcManager.transceive;

            resp = await cmd([0xA2, 0x04, 0x03, fullLength, 0xD1, 0x01]); // 0x0C is the length of the entry with all the fluff (bytes + 7)
            resp = await cmd([0xA2, 0x05, payloadLength, 0x54, 0x02, 0x65]); // 0x54 = T = Text block, 0x08 = length of string in bytes + 3

            let currentPage = 6;
            let currentPayload = [0xA2, currentPage, 0x6E];

            for (let i = 0; i < text.length; i++) {
                currentPayload.push(text.charCodeAt(i));
                if (currentPayload.length == 6) {
                    resp = await cmd(currentPayload);
                    currentPage += 1;
                    currentPayload = [0xA2, currentPage];
                }
            }

            // close the string and fill the current payload
            currentPayload.push(254);
            while (currentPayload.length < 6) {
                currentPayload.push(0);
            }

            resp = await cmd(currentPayload);
            Actions.pop()

            this._cleanUp();
        } catch (ex) {
            // console.log('ex', ex);
            // this.setState({
            //     log: ex.toString()
            // })
            this._cleanUp();
        }
    }
    writeData = async () => {
        const { user } = this.props

        if (!user.username) {
            Alert.alert("Nothing to write");
            return;
        }
        try {
            let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {

                alertMessage: 'Ready to write some NFC tags!'
            });

            // console.log(resp);
            let ndef = await NfcManager.getNdefMessage();
            // console.log(ndef);
            let bytes = buildUrlPayload("https://nockapp.net/ar/users/shipProfile/" + user.username);
            await NfcManager.writeNdefMessage(bytes);
            // console.log('successfully write ndef');
            await NfcManager.setAlertMessageIOS('I got your tag!');
            Actions.pop()
            this._cleanUp();
        } catch (ex) {
            console.log('ex', ex);
            this._cleanUp();
        }
    }
    render() {
        return (
            <Container>
                <View style={{
                    flexDirection: 'row', alignItems: 'center', marginTop: hp(5),
                    paddingHorizontal: wp(3), justifyContent: 'space-between'
                }}>
                    <TouchableWithoutFeedback onPress={() => Actions.pop()}>
                        <View style={{ width: wp(10) }}>
                            <Icon name={L('arrow')} type="AntDesign" />
                        </View>
                    </TouchableWithoutFeedback>

                    <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2) }}>{L('Scan nock')}</Text>
                    <View style={{ width: wp(10) }} />
                </View>
                <Content>

                    <View style={{ ...styles.View90, marginTop: hp(5) }}>
                        <Image style={styles.imageBGforScan}
                            source={require('./Assets/images/scanbg.png')} />

                        <Image style={styles.borderWhiteForScan}
                            source={require('./Assets/images/scanborder.png')} />

                    </View>
                    <Button style={{ ...styles.mainDarkButton, marginTop: hp(15), marginBottom: hp(3) }} onPress={this.writeData}>
                        <Text style={styles.midWhiteTextForMainButton}>{L('Scan to Save')}</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default ScanChips;