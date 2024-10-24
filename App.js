import React from 'react';
import AppNavigator from './AppNavigator';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AuthProvider } from './context/AuthContext';

export default function App() {
    return (
        <AuthProvider>
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        </AuthProvider>
    );
}
