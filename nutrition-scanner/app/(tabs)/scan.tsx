import React, { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Image, ScrollView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { OCRService } from '@/services/ocr';
import { AnalysisService } from '@/services/analysis';
import { StorageService } from '@/services/storage';

export default function ScanScreen() {
    const colorScheme = useColorScheme();
    const [permission, requestPermission] = useCameraPermissions();
    const [loading, setLoading] = useState(false);
    const cameraRef = useRef<CameraView>(null);

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', marginBottom: 20 }}>We need your permission to show the camera</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.button}>
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const processImage = async (uri: string) => {
        setLoading(true);
        try {
            // 1. OCR
            const text = await OCRService.processImage(uri);

            // 2. Get Preferences
            const prefs = await StorageService.getPreferences();

            // 3. Analyze
            const warnings = AnalysisService.analyzeText(text, prefs.avoidList);

            // 4. Navigate to Results
            // We'll pass the data as a string param. In a real app, use a store.
            router.push({
                pathname: '/modal',
                params: {
                    warnings: JSON.stringify(warnings),
                    scannedText: text
                }
            });

        } catch (error) {
            Alert.alert('Error', 'Failed to process image');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                if (photo) {
                    await processImage(photo.uri);
                }
            } catch (e) {
                console.error(e);
                Alert.alert('Error', 'Failed to take picture');
            }
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            await processImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} ref={cameraRef} facing="back">
                <View style={styles.overlay}>
                    <View style={styles.controls}>
                        <TouchableOpacity
                            style={[styles.controlButton, { backgroundColor: 'rgba(0,0,0,0.6)' }]}
                            onPress={pickImage}
                            disabled={loading}
                        >
                            <FontAwesome name="image" size={24} color="#fff" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.captureButton, { borderColor: '#fff' }]}
                            onPress={takePicture}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" size="large" />
                            ) : (
                                <View style={styles.captureInner} />
                            )}
                        </TouchableOpacity>

                        <View style={{ width: 50 }} />
                    </View>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        paddingBottom: 50,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    controlButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    captureInner: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#fff',
    },
    button: {
        padding: 15,
        backgroundColor: '#2f95dc',
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
