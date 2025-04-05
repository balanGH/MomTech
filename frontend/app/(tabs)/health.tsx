import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

export default function HealthScreen() {
  const user_email = 'mom@momtech.in';
  const [healthOverview, setHealthOverview] = useState([]);
  const [healthConditions, setHealthConditions] = useState([]);
  const [newWeight, setNewWeight] = useState('');
  const [newHeight, setNewHeight] = useState('');
  const [newTemperature, setNewTemperature] = useState('');
  const [showForm, setShowForm] = useState(false); // State to toggle the form visibility

  const fetchChildDetails = async () => {
    try {
      const response = await fetch(`http://10.11.155.214:5000/mom/child?email=${user_email}`);
      const result = await response.json();

      if (result.child) {
        // Sort healthoverview by date in ascending order
        const sortedOverview = (result.child.healthoverview || []).sort((a, b) => new Date(a.date) - new Date(b.date));

        // Set health overview
        setHealthOverview(sortedOverview);
        // Set health conditions (e.g., allergies)
        setHealthConditions(result.child.medicalcondition?.allergy || []);
      }
    } catch (error) {
      console.error('Error fetching child details:', error);
    }
  };

  const updateHealthOverview = async () => {
    const newEntry = {
      date: new Date().toISOString(),
      weight: newWeight,
      height: newHeight,
      temperature: newTemperature,
    };

    try {
      const response = await fetch(`http://10.11.155.214:5000/mom/childupdate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user_email, healthoverview: newEntry }),
      });

      if (response.ok) {
        setHealthOverview((prev) => [...prev, newEntry].sort((a, b) => new Date(a.date) - new Date(b.date)));
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
  }, []);

  const weights = healthOverview.map((entry) => parseFloat(entry.weight));
  const heights = healthOverview.map((entry) => parseFloat(entry.height));
  const labels = healthOverview.map((entry) =>
    new Date(entry.date).toLocaleDateString()
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Overview</Text>
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
              labels: labels, // Dates on the X-axis
              datasets: [
                {
                  data: weights, // Weights for the graph
                  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Weight line color
                  strokeWidth: 2, // Thickness of weight line
                },
                {
                  data: heights, // Heights for the graph
                  color: (opacity = 1) => `rgba(34, 128, 176, ${opacity})`, // Height line color
                  strokeWidth: 2, // Thickness of height line
                },
              ],
              legend: ['Weight (kg)', 'Height (cm)'], // Legend for the graph
            }}
            width={Dimensions.get('window').width - 32} // Full-width graph
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#f3f4f6',
              backgroundGradientTo: '#fff',
              decimalPlaces: 1, // Show 1 decimal point
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
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        ) : (
          <Text style={styles.chartText}>Loading graph data...</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  conditionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  conditionInfo: {
    marginLeft: 12,
    flex: 1,
  },
  conditionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  conditionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  noConditionsText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
  chartPlaceholder: {
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
  },
  updateButton: {
    backgroundColor: '#7C3AED',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  updateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },  
  inputContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 4,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },   
});
