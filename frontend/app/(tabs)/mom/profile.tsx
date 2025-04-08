import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

export default function ProfileScreen() {
  const router = useRouter();
  const [user_email, setUserEmail] = useState('');
  const [momDetails, setMomDetails] = useState({});

  useEffect(() => {
    const fetchEmail = async () => {
      const email = await AsyncStorage.getItem('email');
      console.log("profile.tsx: " + email);
      setUserEmail(email);
    };
    fetchEmail();
  }, []);

  const fetchMomDetails = async () => {
    try {
      const response = await fetch(`http://10.16.48.219:5000/mom/mom?email=${user_email}`);
      const result = await response.json();

      if (result.mom) {
        setMomDetails(result.mom);
      } else {
        Alert.alert('Error', 'No mother details found.');
      }
    } catch (error) {
      console.error('Error fetching child details:', error);
    }
  };

  useEffect(() => {
    fetchMomDetails();
  }, [user_email]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Clear all data from AsyncStorage
      Alert.alert('Logged Out', 'You have been successfully logged out.');
      router.replace('/'); // Redirect to the authentication screen
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{momDetails.name}</Text>
        <Text style={styles.role}>Mother of {momDetails?.child?.name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Child Information</Text>
        <View style={styles.childCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1519457431-44ccd64a579f?w=400' }}
            style={styles.childImage}
          />
          <View style={styles.childInfo}>
          <Text style={styles.childName}>{momDetails?.child?.name}{momDetails.hubname}</Text>
          <Text style={styles.childAge}>6 months old</Text>
            <Text style={styles.childDob}>{momDetails?.child?.age}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <MaterialCommunityIcons name="account-edit" size={24} color="#7C3AED" />
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#7C3AED" />
            <Text style={styles.actionText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <MaterialCommunityIcons name="cog-outline" size={24} color="#7C3AED" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <MaterialCommunityIcons name="help-circle-outline" size={24} color="#7C3AED" />
            <Text style={styles.actionText}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mother's Health</Text>
        <TouchableOpacity style={styles.healthCard}>
          <MaterialCommunityIcons name="heart-pulse" size={24} color="#7C3AED" />
          <View style={styles.healthInfo}>
            <Text style={styles.healthTitle}>Postpartum Checkup</Text>
            <Text style={styles.healthDate}>Next appointment: Jan 20, 2024</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={20} color="#DC2626" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  role: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  childCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  childImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  childInfo: {
    marginLeft: 16,
  },
  childName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  childAge: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 2,
  },
  childDob: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    color: '#4B5563',
  },
  healthCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  healthInfo: {
    flex: 1,
    marginLeft: 12,
  },
  healthTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  healthDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    margin: 16,
    padding: 12,
    borderRadius: 12,
  },
  logoutText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});