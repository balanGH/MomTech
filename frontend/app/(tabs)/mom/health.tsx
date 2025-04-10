import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '@/api/base_api';

export default function HealthScreen() {
  const [childName , setchildName] = useState ('')
  const [healthOverview, setHealthOverview] = useState([]);
  const [healthConditions, setHealthConditions] = useState([]);
  const [newWeight, setNewWeight] = useState('');
  const [newHeight, setNewHeight] = useState('');
  const [newTemperature, setNewTemperature] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [user_email, setUserEmail] = useState('');

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

  const fetchChildDetails = async () => {
    if (!user_email) return;

    try {
      const response = await apiClient.get(`/mom/child?email=${user_email}`);
      if (response.status === 200) {
        const result = response.data;

        if (result.child) {
          setchildName(result.child.name)
          const sortedOverview = (result.child.healthoverview || []).sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          setHealthOverview(sortedOverview);
          setHealthConditions(result.child.medicalcondition?.allergy || []);
        }
      } else {
        console.error('Failed to fetch child details:', response.status);
      }
    } catch (error) {
      console.error('Error fetching child details:', error);
    }
  };

  const updateHealthOverview = async () => {
    if (!user_email) {
      Alert.alert('Error', 'User email is not available.');
      return;
    }

    const newEntry = {
      date: new Date().toISOString(),
      weight: newWeight,
      height: newHeight,
      temperature: newTemperature,
    };

    try {
      const response = await apiClient.post(`/mom/childupdate`, {
        email: user_email,
        healthoverview: newEntry,
      });

      if (response.status === 200) {
        setHealthOverview((prev) => [...prev, newEntry].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
        Alert.alert('Success', 'Health overview updated successfully!');
        setNewWeight('');
        setNewHeight('');
        setNewTemperature('');
        setShowForm(false);
      } else {
        Alert.alert('Error', 'Failed to update health overview.');
      }
    } catch (error) {
      console.error('Error updating health overview:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    fetchChildDetails();
  }, [user_email]);

  const weights = healthOverview.map((entry) => parseFloat(entry.weight));
  const heights = healthOverview.map((entry) => parseFloat(entry.height));
  const labels = healthOverview.map((entry) => new Date(entry.date).toLocaleDateString());

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>❤️ {childName}'s Health Overview</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="weight" size={24} color="#7C3AED" />
            <Text style={styles.statValue}>
              {weights.length > 0 ? `${weights[weights.length - 1]} kg` : 'Loading...'}
            </Text>
            <Text style={styles.statLabel}>Weight</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="human-male-height" size={24} color="#7C3AED" />
            <Text style={styles.statValue}>
              {heights.length > 0 ? `${heights[heights.length - 1]} cm` : 'Loading...'}
            </Text>
            <Text style={styles.statLabel}>Height</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="thermometer" size={24} color="#7C3AED" />
            <Text style={styles.statValue}>
              {healthOverview.length > 0
                ? `${healthOverview[healthOverview.length - 1].temperature}°C`
                : 'Loading...'}
            </Text>
            <Text style={styles.statLabel}>Temperature</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        {!showForm && (
          <TouchableOpacity style={styles.updateButton} onPress={() => setShowForm(true)}>
            <Text style={styles.updateButtonText}>Update Health Overview</Text>
          </TouchableOpacity>
        )}
        {showForm && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Weight (kg)"
              value={newWeight}
              onChangeText={setNewWeight}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Height (cm)"
              value={newHeight}
              onChangeText={setNewHeight}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Temperature (°C)"
              value={newTemperature}
              onChangeText={setNewTemperature}
              keyboardType="numeric"
            />
            <Button title="Submit" onPress={updateHealthOverview} color="#7C3AED" />
          </View>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Conditions</Text>
        {healthConditions.length > 0 ? (
          healthConditions.map((condition, index) => (
            <View key={index} style={styles.conditionCard}>
              <MaterialCommunityIcons name="alert-circle" size={24} color="#DC2626" />
              <View style={styles.conditionInfo}>
                <Text style={styles.conditionTitle}>{condition}</Text>
                <Text style={styles.conditionDescription}>
                  {`Precautions for ${condition}. Please consult your doctor for detailed advice.`}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noConditionsText}>No health conditions available.</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Growth Chart</Text>
        {weights.length > 0 && heights.length > 0 ? (
          <LineChart
            data={{
              labels: labels,
              datasets: [
                {
                  data: weights,
                  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                  strokeWidth: 2,
                },
                {
                  data: heights,
                  color: (opacity = 1) => `rgba(34, 128, 176, ${opacity})`,
                  strokeWidth: 2,
                },
              ],
              legend: ['Weight (kg)', 'Height (cm)'],
            }}
            width={Dimensions.get('window').width - 32}
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#f3f4f6',
              backgroundGradientTo: '#fff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        ) : (
          <Text>Loading chart...</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statCard: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 4,
    color: '#4B5563',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  updateButton: {
    backgroundColor: '#7C3AED',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  conditionCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    backgroundColor: '#FEE2E2',
    padding: 10,
    borderRadius: 8,
  },
  conditionInfo: {
    marginLeft: 8,
    flex: 1,
  },
  conditionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B91C1C',
  },
  conditionDescription: {
    fontSize: 14,
    color: '#991B1B',
    marginTop: 4,
  },
  noConditionsText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
});