import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../context/AuthContext';

const CustomDrawer = ({ isVisible, onClose }) => {
    const navigation = useNavigation();
    const { logOut } = useContext(AuthContext);

    if (!isVisible) return null;

    const handleLogout = async () => {
        await logOut();
        onClose();
    };

    return (
        <View style={[styles.container, { top: 105 }]}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
            <View style={styles.menuItems}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Dashboard')}>
                    <Text style={styles.menuText}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => handleLogout()}>
                    <Text style={styles.menuText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: 250,
        position: 'absolute',
        left: 0,
        height: '100%',
        borderRightWidth: 1,
        borderRightColor: '#ccc',
        padding: 20,
        zIndex: 1000 // Ensure drawer is above other content
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 20
    },
    menuIcon: {
        width: 24,
        height: 24
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginBottom: 20
    },
    closeText: {
        fontSize: 16,
        color: 'blue'
    },
    menuItems: {
        flex: 1
    },
    menuItem: {
        paddingVertical: 15
    },
    menuText: {
        fontSize: 16
    }
});

export default CustomDrawer;
