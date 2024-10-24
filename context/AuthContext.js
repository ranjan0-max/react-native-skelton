import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosServices from '../interceptor/axios'; // Adjust path as needed
import jwtDecode from 'jwt-decode';

const AuthContext = createContext(null);

const verifyToken = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded = jwtDecode(serviceToken);
    return decoded.exp > Date.now() / 1000;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const init = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                if (accessToken && verifyToken(accessToken)) {
                    axiosServices.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
                    const response = await axiosServices.get('/auth/user');
                    const { user } = response.data.data;
                    setUser(user);
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (err) {
                console.error(err);
                setUser(null);
                setIsAuthenticated(false);
            }
        };

        init();
    }, []);

    const login = async (data) => {
        try {
            const response = await axiosServices.post('/auth/userLoginWithOtp', data);
            const accessToken = response.data.data.accessToken;
            setUser(response.data.data);
            setIsAuthenticated(true);
            await AsyncStorage.setItem('accessToken', accessToken);
        } catch (error) {
            console.log(error);
        }
    };

    const logOut = async () => {
        try {
            // await axiosServices.post('/auth/logout');
        } catch (error) {
            console.log('error ', error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            await AsyncStorage.removeItem('accessToken');
            delete axiosServices.defaults.headers.common.Authorization;
        }
    };

    return <AuthContext.Provider value={{ isAuthenticated, user, login, logOut }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
