// LoginScreen.js
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, useColorScheme } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth } from '../firebase/config';

import { getThemeStyles } from '../styles/theme';

const LoginScreen = ({navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const themeStyles = useState(getThemeStyles(useColorScheme()));

    const onFooterLinkPress = () => {
        navigation.navigate('Registration');
    }

    const onLoginPress = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then()
            .catch(error => {
                alert(error);
            });
    }

    return (
        <View style={themeStyles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../assets/icon.png')}
                />
                <TextInput
                    style={[themeStyles.input, styles.input
                    ]}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={[themeStyles.input, styles.input]}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={[themeStyles.primaryButton, {
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        height: 48
                    }]}
                    onPress={() => onLoginPress()}>
                    <Text style={themeStyles.buttonText}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.subText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    logo: {
        flex: 1,
        height: 100,
        width: 100,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "blue",
        fontWeight: "bold",
        fontSize: 16
    }
});

export default LoginScreen;