import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Import Date Picker
import { MaterialCommunityIcons } from '@expo/vector-icons';
import apiClient from '@/api/base_api';

const DEFAULT_IMAGE_URL = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400';

export default function BabysittersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [babysitters, setBabysitters] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBabysitter, setSelectedBabysitter] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [user_email, setUserEmail] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        if (email) {
          setUserEmail(email);
        } else {
          console.warn('No email found in AsyncStorage. Please log in.');
        }
      } catch (error) {
        console.error('Error fetching email from AsyncStorage:', error);
      }
    };
    fetchEmail();
  }, []);

  useEffect(() => {
    const fetchBabysitters = async () => {
      try {
        const response = await apiClient.get('/mom/babysitters_search');
        setBabysitters(response.data);
      } catch (err) {
        console.error('Error fetching babysitters:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBabysitters();
  }, []);

  const handleBookingRequest = (babysitter) => {
    setSelectedBabysitter(babysitter);
    setIsDatePickerVisible(true);
  };

  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    setIsDatePickerVisible(false);
    sendBookingRequest();
  };

  const sendBookingRequest = async () => {
    if (selectedBabysitter && selectedDate) {
      try {
        const payload = {
          mom_email: user_email,
          babysitter_email: selectedBabysitter.email,
          booking_date: selectedDate.toISOString(),
        };

        const response = await apiClient.post('/mom/book_babysitter', payload);
        if (response.status === 200 || 201) {
          Alert.alert("Success", "Your booking request has been sent!");
        } else {
          Alert.alert("Error", "Failed to send booking request.");
        }
      } catch (error) {
        console.error("Booking error:", error);
        Alert.alert("Error", "Could not send booking request. Please try again.");
      }
    }
  };

  const renderBabysitter = ({ item }) => (
    <TouchableOpacity style={styles.babysitterCard}>
      <Image source={{ uri: item.profile_pic || DEFAULT_IMAGE_URL }} style={styles.babysitterImage} />
      <View style={styles.babysitterInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <MaterialCommunityIcons name="star" size={16} color="#F59E0B" />
          <Text style={styles.rating}>{item.rating || 'N/A'}</Text>
          <Text style={styles.fare}> Fare : ₹{item.fare || 0} /Hr</Text>
        </View>
        <Text style={styles.experience}>Available: {item.available ? 'Yes' : 'No'}</Text>
        <TouchableOpacity 
          style={styles.bookButton} 
          onPress={() => handleBookingRequest(item)}
        >
          <Text style={styles.bookButtonText}>Ask to Book</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading babysitters...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
          Failed to load babysitters. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={24} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search babysitters..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => console.log('Search triggered:', searchQuery)}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={babysitters.filter(babysitter =>
          babysitter.name.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        renderItem={renderBabysitter}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => {
          setIsDatePickerVisible(false);
          setSelectedDate(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  babysitterCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  babysitterImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  babysitterInfo: {
    flex: 1,
    marginLeft: 16,
  },
  bookButton: {
    marginTop: 10,
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
