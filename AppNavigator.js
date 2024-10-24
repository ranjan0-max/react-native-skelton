import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import LogInPage from './components/login';
import Dashboard from './components/dashboard';
import CustomDrawer from './components/drawer';
import MobileNumberScrean from './components/otpLogin/numberScrean';
import OtpInput from './components/otpLogin/otpScrean';

// icons
import menuIcon from './assets/menuBars.png';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);

    const openDrawer = () => setDrawerVisible(true);
    const closeDrawer = () => setDrawerVisible(false);

    return (
        <NavigationContainer>
            <View style={{ flex: 1 }}>
                {drawerVisible && <CustomDrawer isVisible={drawerVisible} onClose={closeDrawer} />}
                <Stack.Navigator
                    initialRouteName="LogInPage"
                    screenOptions={{
                        headerLeft: () => (
                            <TouchableOpacity onPress={openDrawer} style={styles.headerLeftContainer}>
                                <Image source={menuIcon} style={styles.menuIcon} />
                            </TouchableOpacity>
                        )
                    }}
                >
                    <Stack.Screen name="Log In" component={MobileNumberScrean} options={{ headerShown: false }} />
                    <Stack.Screen name="Otp" component={OtpInput} options={{ headerShown: false }} />
                    {/* <Stack.Screen name="Log In" component={LogInPage} options={{ headerShown: false }} /> */}
                    <Stack.Screen name="Dashboard" component={Dashboard} />
                </Stack.Navigator>
            </View>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    headerLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: '1%'
    },
    menuIcon: {
        width: 24,
        height: 24
    }
});

export default AppNavigator;
