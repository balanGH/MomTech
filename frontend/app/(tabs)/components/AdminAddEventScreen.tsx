import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import apiClient from '@/api/base_api';

const AdminAddEventScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  const handleSubmit = async () => {
    if (!title || !date || !location) {
      Alert.alert('Missing Fields', 'Please fill all required fields (title, date, location)');
      return;
    }

    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
    const formattedTime = time.toTimeString().split(' ')[0]; // HH:MM:SS

    try {
      const response = await apiClient.post('/admin/addevent', {
        title,
        description,
        date: formattedDate,
        time: formattedTime,
        location,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Event added successfully!');
        setTitle('');
        setDescription('');
        setDate(new Date());
        setTime(new Date());
        setLocation('');
      } else {
        Alert.alert('Error', response.data?.error || 'Failed to add event.');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      Alert.alert('Error', error.message || 'Something went wrong.');
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

      <TouchableOpacity style={[styles.input, { justifyContent: 'center' }]} onPress={() => setIsDatePickerVisible(true)}>
        <Text>{date.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>

      {isDatePickerVisible && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate);
            }
            setIsDatePickerVisible(false);
          }}
        />
      )}

      <TouchableOpacity style={[styles.input, { justifyContent: 'center' }]} onPress={() => setIsTimePickerVisible(true)}>
        <Text>{time.toTimeString().split(' ')[0]}</Text>
      </TouchableOpacity>

      {isTimePickerVisible && (
        <DateTimePicker
          value={time}
          mode="time"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(event, selectedTime) => {
            if (selectedTime) {
              setTime(selectedTime);
            }
            setIsTimePickerVisible(false);
          }}
        />
      )}

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
