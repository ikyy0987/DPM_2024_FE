import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useRouter} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ThemedView} from '@/components/ThemedView';
import {ThemedText} from '@/components/ThemedText';
import {ActivityIndicator, Button, Dialog, PaperProvider, Portal, Text} from 'react-native-paper';
import API_URL from '@/config/config';

type UserProfile = {
    username: string;
    email: string;
};

const ProfileScreen = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [dialogVisible, setDialogVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get<{ data: UserProfile }>(`${API_URL}/api/profile`, {
                headers: {Authorization: `Bearer ${token}`},
            });
            setProfile(response.data.data);
        } catch (error) {
            console.error('Failed to fetch profile', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setDialogVisible(true);
    };

    const confirmLogout = async () => {
        await AsyncStorage.removeItem('token');
        router.replace('/auth/LoginScreen');
    };

    if (loading) {
        return (
            <PaperProvider>
                <ThemedView style={styles.container}>
                    <ActivityIndicator animating={true} size="large" color="#6200ee" />
                </ThemedView>
            </PaperProvider>
        );
    }

    return (
        <PaperProvider>
            <ThemedView style={styles.container}>
                {profile ? (
                    <ThemedView style={styles.card}>
                        <ThemedText style={styles.title}>Profile</ThemedText>
                        <ThemedText style={styles.label}>Username:</ThemedText>
                        <ThemedText style={styles.value}>{profile.username}</ThemedText>
                        <ThemedText style={styles.label}>Email:</ThemedText>
                        <ThemedText style={styles.value}>{profile.email}</ThemedText>
                        <Button mode="contained" onPress={handleLogout} style={styles.logoutButton} labelStyle={styles.logoutButtonText}>
                            Log Out
                        </Button>
                    </ThemedView>
                ) : (
                    <ThemedText style={styles.noData}>No profile data available</ThemedText>
                )}
                <Portal>
                    <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)} style={styles.dialog}>
                        <Dialog.Title style={styles.dialogTitle}>Logout</Dialog.Title>
                        <Dialog.Content>
                            <Text style={styles.dialogContent}>Are you sure you want to logout?</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setDialogVisible(false)} labelStyle={styles.cancelButton}>Cancel</Button>
                            <Button onPress={confirmLogout} mode="contained" labelStyle={styles.confirmButton}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ThemedView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f4f4f8',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#6200ee',
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 16,
        color: '#333',
    },
    value: {
        fontSize: 18,
        color: '#555',
        marginBottom: 8,
    },
    noData: {
        fontSize: 18,
        color: '#999',
        textAlign: 'center',
    },
    logoutButton: {
        marginTop: 24,
        backgroundColor: '#6200ee',
        paddingVertical: 8,
    },
    logoutButtonText: {
        fontSize: 16,
        color: '#ffffff',
    },
    dialog: {
        borderRadius: 10,
        padding: 10,
    },
    dialogTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    dialogContent: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
    },
    cancelButton: {
        color: '#999',
        fontSize: 16,
    },
    confirmButton: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default ProfileScreen;
