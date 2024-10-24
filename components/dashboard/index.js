import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import AuthContext from '../../context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker'; // Import DocumentPicker

import CustomMenuBar from '../tabNavigation'; // Make sure this path is correct

const Dashboard = ({ navigation }) => {
    const { isAuthenticated, logOut, user } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleLogout = async () => {
        try {
            await logOut();
        } catch (error) {
            Alert.alert('Error', 'Failed to log out');
        }
    };

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Camera access is required to take pictures.');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            setSelectedFile({ uri: result.uri, name: 'Photo' });
        } else {
            Alert.alert('Camera', 'You did not take a photo.');
        }
    };

    const openImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Access to the media library is required.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });

        if (!result.cancelled) {
            setSelectedFile({ uri: result.assets[0].uri, name: 'Image' });
        } else {
            Alert.alert('Image Picker', 'You did not select an image.');
        }
    };

    const openFilePicker = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: '*/*', // Allows any file type
            copyToCacheDirectory: true
        });

        if (result.type === 'success') {
            setSelectedFile({ uri: result.uri, name: result.name });
        } else {
            Alert.alert('File Picker', 'You did not select a file.');
        }
    };

    React.useEffect(() => {
        if (!isAuthenticated) {
            navigation.navigate('Log In');
        }
    }, [isAuthenticated]);

    return (
        <View style={styles.container}>
            <Button title="Open Camera" onPress={openCamera} />
            <Button title="Select Image" onPress={openImagePicker} />
            <Button title="Select File" onPress={openFilePicker} />
            <View style={styles.content}>
                <Text style={styles.title}>Dashboard</Text>
                <Button title="Log Out" onPress={handleLogout} />
            </View>
            <CustomMenuBar navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 16
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center'
    },
    text: {
        fontSize: 16,
        marginBottom: 12,
        textAlign: 'center'
    },
    fileContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    fileName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    fileUri: {
        fontSize: 14,
        color: '#555'
    }
});

export default Dashboard;
