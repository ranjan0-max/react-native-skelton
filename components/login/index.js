// components/LogIn.js
import React, { useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../context/AuthContext';

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
});

const LogInPage = ({ navigation }) => {
    const { login, isAuthenticated } = useContext(AuthContext);

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            await login(values);
            resetForm();
        } catch (error) {
            Alert.alert('Login Error', 'Failed to login. Please try again');
        }
        setSubmitting(false);
    };

    React.useEffect(() => {
        if (isAuthenticated) {
            navigation.navigate('Dashboard');
        }
    }, [isAuthenticated]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>
            <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isSubmitting}>
                            <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center'
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 12,
        paddingHorizontal: 8
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    errorText: {
        color: 'red',
        marginBottom: 12
    }
});

export default LogInPage;
