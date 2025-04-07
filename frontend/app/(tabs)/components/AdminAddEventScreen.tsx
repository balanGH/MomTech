import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';

const AdminAddEventScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async () => {
    if (!title || !date || !location) {
      Alert.alert('Missing Fields', 'Please fill all required fields (title, date, location)');
      return;
    }

    try {
      const response = await fetch('http://10.21.76.182:5000/admin/addevent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, date, location }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Event added successfully!');
        setTitle('');
        setDescription('');
        setDate('');
        setLocation('');
      } else {
        Alert.alert('Error', 'Failed to add event.');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add Upcoming Event</Text>

      <TextInput
        style={styles.input}
        placeholder="Event Title *"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Description (Optional)"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD) *"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Location *"
        value={location}
        onChangeText={setLocation}
      />

      <Button title="Add Event" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
});

export default AdminAddEventScreen;
