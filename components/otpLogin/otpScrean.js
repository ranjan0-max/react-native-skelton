import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AuthContext from '../../context/AuthContext';

const OtpInput = ({ route }) => {
    const { mobileNumber } = route.params;
    const navigation = useNavigation();
    const { login, isAuthenticated } = useContext(AuthContext);
    const [otp, setOtp] = useState('');

    const handleSubmit = async () => {
        const data = {
            countryCode: 91,
            phoneNumber: mobileNumber,
            deviceToken: 'Sdfsdf',
            otp: otp
        };
        try {
            await login(data);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to verify OTP');
        }
    };

    React.useEffect(() => {
        if (isAuthenticated) {
            navigation.navigate('Dashboard');
        } else {
            navigation.navigate('Log In');
        }
    }, [isAuthenticated]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Enter the OTP:</Text>
            <TextInput style={styles.input} value={otp} onChangeText={setOtp} placeholder="1234" keyboardType="numeric" maxLength={4} />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16
    },
    label: {
        fontSize: 18,
        marginBottom: 10
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        fontSize: 18
    }
});

export default OtpInput;
