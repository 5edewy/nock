import React, { Component } from 'react';
import { View, Text, Image } from 'react-native'
import { Container, Content, Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './Assets/style/styles';
import { Actions } from 'react-native-router-flux';

class ScanChips extends Component {
    render() {
        return (
            <Container>
                <View style={{
                    flexDirection: 'row', alignItems: 'center', marginTop: hp(5),
                    paddingHorizontal: wp(3),
                }}>
                    <View style={{ width: wp(35) }}>
                        <Icon name="left" type="AntDesign" />
                    </View>
                    <Text style={{ ...styles.boldDarkText, fontSize: wp(5.2) }}>Scan nock</Text>

                </View>
                <Content>

                    <View style={{ ...styles.View90, marginTop: hp(10) }}>
                        <Image style={styles.imageBGforScan}
                            source={require('./Assets/images/scanbg.png')} />

                        <Image style={styles.borderWhiteForScan}
                            source={require('./Assets/images/scanborder.png')} />

                    </View>
                </Content>
            </Container>
        );
    }
}

export default ScanChips;