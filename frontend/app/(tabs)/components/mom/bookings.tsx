import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '@/api/base_api';

interface BabysitterDetails {
  name: string;
  profile_pic: string;
  fare: number;
}

interface Booking {
  _id: string;
  booking_date: string;
  status: string;
  babysitter_details: BabysitterDetails;
}

const MomBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user_email, setUserEmail] = useState<string>('');

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        if (email) {
          setUserEmail(email);
        } else {
          Alert.alert('Error', 'No email found in AsyncStorage. Please log in.');
        }
      } catch (error) {
        console.error('Error fetching email from AsyncStorage:', error);
      }
    };
    fetchEmail();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user_email) return;

      try {
        const response = await apiClient.get(`/mom/bookings?mom_email=${user_email}`);
        setBookings(response.data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to fetch bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user_email]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text>Loading your bookings...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (bookings.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No bookings found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.bookingCard}>
            <View style={styles.row}>
              <Image
                source={{
                  uri: item.babysitter_details?.profile_pic || 'https://raw.githubusercontent.com/balanGH/MomTech/refs/heads/main/frontend/assets/images/icon.png',
                }}
                style={styles.profilePic}
              />
              <View>
                <Text style={styles.babysitterName}>
                  {item.babysitter_details?.name || 'Unknown'}
                </Text>
                <Text style={styles.fare}>
                  Fare: ₹{item.babysitter_details?.fare || 'N/A'} /hr
                </Text>
              </View>
            </View>
            <Text style={styles.bookingDate}>
              Booking Date: {new Date(item.booking_date).toLocaleDateString()}
            </Text>
            <Text style={styles.status}>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#111827',
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  babysitterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  fare: {
    fontSize: 14,
    color: '#6B7280',
  },
  bookingDate: {
    fontSize: 14,
    color: '#374151',
    marginTop: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563EB',
    marginTop: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default MomBookings;
