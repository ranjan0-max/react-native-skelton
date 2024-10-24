import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import axiosServices from '../../interceptor/axios';

const MobileNumberScrean = () => {
    const navigation = useNavigation();

    const [mobileNumber, setMobileNumber] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (mobileNumber.length < 10) {
            setError('Mobile Should be 10 digits');
        } else {
            setError('');
            const data = {
                countryCode: 91,
                phoneNumber: mobileNumber
            };
            const response = await axiosServices.get('/auth/sendOtp', { params: data });
            if (response.data.success) {
                navigation.navigate('Otp', { mobileNumber: mobileNumber });
            } else {
                Alert.alert(response.data.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Enter Your Mobile Number:</Text>
            <TextInput
                style={styles.input}
                value={mobileNumber}
                onChangeText={setMobileNumber}
                placeholder="123-456-7890"
                keyboardType="phone-pad"
                maxLength={10}
            />
            <Text style={styles.errorText}>{error}</Text>

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
        paddingHorizontal: 10
    },
    errorText: {
        color: 'red',
        marginBottom: 10
    }
});

export default MobileNumberScrean;
