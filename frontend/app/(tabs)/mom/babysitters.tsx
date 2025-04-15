import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import apiClient from '@/api/base_api';

export default function BabysittersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [babysitters, setBabysitters] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const today = new Date();

  useEffect(() => {
    const fetchBabysitters = async () => {
      try {
        const response = await apiClient.get('/mom/babysitters_search');
        const data = response.data;
        console.log('Fetched Babysitters:', data);
        setBabysitters(data);
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
    Alert.alert(
      'Booking Request',
      `You are requesting to book ${babysitter.name}.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send Request', onPress: () => console.log('Booking request sent!') }
      ]
    );
  };

  const renderBabysitter = ({ item }) => {
    const createdAtDate = new Date(item.created_at);
    const experienceYears = today.getFullYear() - createdAtDate.getFullYear();

    return (
      <TouchableOpacity style={styles.babysitterCard}>
        <Image source={{ uri: item.profile_pic || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' }} style={styles.babysitterImage} />
        <View style={styles.babysitterInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.experience}>
            {experienceYears > 0 ? `${experienceYears} years` : 'Less than a year'} experience
          </Text>
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#F59E0B" />
            <Text style={styles.rating}>{item.rating || 'N/A'}</Text>
            <Text style={styles.fare}> Fare : ₹{item.fare || 0} /Hr</Text>
          </View>
          <Text style={styles.experience}>Available: {item.available ? 'Yes' : 'No'}</Text>
          <View style={styles.specialtiesContainer}>
            {item.specialties && item.specialties.length > 0
              ? item.specialties.map((specialty, index) => (
                  <View key={index} style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </View>
                ))
              : <Text>No specialties listed</Text>}
          </View>

          <TouchableOpacity 
            style={styles.bookButton} 
            onPress={() => handleBookingRequest(item)}
          >
            <Text style={styles.bookButtonText}>Ask to Book</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

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
      </View>

      <FlatList
        data={babysitters.filter(babysitter =>
          babysitter.name.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        renderItem={renderBabysitter}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
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
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  experience: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    marginLeft: 4,
    color: '#4B5563',
    fontWeight: '500',
  },
  fare: {
    marginLeft: 14,
    color: '#000000',
    fontWeight: '500',
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  specialtyTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  specialtyText: {
    fontSize: 12,
    color: '#4B5563',
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