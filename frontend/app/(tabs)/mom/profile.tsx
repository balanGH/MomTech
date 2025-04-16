import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import apiClient from '@/api/base_api';

export default function ProfileScreen() {
  const router = useRouter();
  const [user_email, setUserEmail] = useState('');
  const [momDetails, setMomDetails] = useState({});

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        if (email) {
          setUserEmail(email);
        } else {
          console.warn('No email found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error fetching email from AsyncStorage:', error);
      }
    };
    fetchEmail();
  }, []);

  const fetchMomDetails = async () => {
    if (!user_email) return;

    try {
      const response = await apiClient.get(`/mom/mom?email=${user_email}`);
      if (response.status === 200 && response.data.mom) {
        setMomDetails(response.data.mom);
      } else {
        Alert.alert('Error', 'No mother details found.');
      }
    } catch (error) {
      console.error('Error fetching mom details:', error);
      Alert.alert('Error', 'Failed to fetch mother details. Please try again.');
    }
  };

  useEffect(() => {
    fetchMomDetails();
  }, [user_email]);

  const calculateChildAge = (age: string) => {
    if (!age) return '';

    const birthDate = new Date(age);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''} old`;
    } else {
      return `${months} month${months !== 1 ? 's' : ''} old`;
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Logged Out', 'You have been successfully logged out.');
      router.replace('/');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: momDetails.profile_pic,
          }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{momDetails.name || 'Guest'}</Text>
        <Text style={styles.role}>
          {momDetails?.child?.name ? `Mother of ${momDetails.child.name}` : 'No child information'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Child Information</Text>
        <View style={styles.childCard}>
          <Image
            source={{
              uri: 'https://tse3.mm.bing.net/th/id/OIP.1FOOnev1gEk_rDxrEWWvKAHaEJ?pid=ImgDet&w=206&h=115&c=7&dpr=1.3'            }}
            style={styles.childImage}
          />
          <View style={styles.childInfo}>
            <Text style={styles.childName}>{momDetails?.child?.name || 'No Name'}</Text>
            <Text style={styles.childAge}>
              {calculateChildAge(momDetails?.child?.age) || 'No Age Information'}
            </Text>
            <Text style={styles.childage}>
              DOB : {momDetails?.child?.age ? momDetails.child.age.split('T')[0] : 'N/A'}
            </Text>
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
  childage: {
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