import { Image, Text, Button } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Home = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#e1c9f0', fontSize: 22 }} bold >
                TIC-TAC-TOE
            </Text>
            <Image source={require('./home.png')}
                alt="Alternate Text"
                size="2xl" />

            <Button bold style={{ backgroundColor: '#c4a8e0', width: 200, borderRadius: hp(2), marginTop: hp(2) }}
                onPress={() => {
                    navigation.navigate('twoPlayer', { isComputer: true })
                }}
            >
                <Text style={{ color: '#360e0b', fontSize: 20 }} bold>1 PLAYER</Text>
            </Button>
            <Button bold style={{ backgroundColor: '#c4a8e0', width: 200, borderRadius: hp(2), marginTop: hp(2) }}
                onPress={() => {
                    navigation.navigate('twoPlayer', { isComputer: false })
                }}>
                <Text style={{ color: '#360e0b', fontSize: 20 }} bold>2 PLAYER</Text>
            </Button>
        </View >
    )
}
export default Home;
