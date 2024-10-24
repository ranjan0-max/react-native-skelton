import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// icons
import homeIcon from '../../assets/home(1).png';
import settingIcon from '../../assets/setting.png';
import profileIcon from '../../assets/user.png';

const CustomMenuBar = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Image source={homeIcon} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Image source={profileIcon} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Image source={settingIcon} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#eee',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        marginBottom: 20
    },
    button: {
        padding: 10
    },
    icon: {
        width: 24, // Adjust based on your image size
        height: 24 // Adjust based on your image size
    }
});

export default CustomMenuBar;
