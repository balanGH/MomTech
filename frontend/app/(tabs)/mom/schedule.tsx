import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import apiBot from '@/api/bot_api';

interface FormState {
  sleep_duration: string;
  sleep_quality: string;
  exercise_duration: string;
  exercise_type: string;
  water_intake: string;
  pain_level: string;
  stress_level: string;
  mood: string;
  meals_logged: string;
  breastfeeding_done: string;
}

interface ResultState {
  wellness_score: number;
  message: string;
}

const PredictScreen: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    sleep_duration: '',
    sleep_quality: '',
    exercise_duration: '',
    exercise_type: 'None',
    water_intake: '',
    pain_level: '',
    stress_level: '',
    mood: 'Neutral',
    meals_logged: '',
    breastfeeding_done: 'No',
  });

  const [result, setResult] = useState<ResultState | null>(null);

  const predictWellness = async () => {
    try {
      const payload = {
        ...form,
        sleep_duration: parseFloat(form.sleep_duration),
        sleep_quality: parseInt(form.sleep_quality),
        exercise_duration: parseInt(form.exercise_duration),
        water_intake: parseInt(form.water_intake),
        pain_level: parseInt(form.pain_level),
        stress_level: parseInt(form.stress_level),
        meals_logged: parseInt(form.meals_logged),
        exercise_type: form.exercise_type === 'None' ? 0 : form.exercise_type === 'Stretching' ? 1 : 2,
        mood: form.mood === 'Sad' ? 0 : form.mood === 'Neutral' ? 1 : 2,
      };

      const response = await apiBot.post(`/predict`, payload);
      console.log('Response:', response.data);
      setResult(response.data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch prediction. Ensure the backend is running.';
      Alert.alert('Error', errorMessage);
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Sleep Duration (hours):</Text>
      <TextInput
        style={styles.input}
        value={form.sleep_duration}
        onChangeText={(text) => setForm({ ...form, sleep_duration: text })}
        keyboardType="numeric"
        placeholder="e.g., 6.5"
        accessibilityLabel="Sleep Duration Input"
      />

      <Text style={styles.label}>Sleep Quality (1-5):</Text>
      <TextInput
        style={styles.input}
        value={form.sleep_quality}
        onChangeText={(text) => setForm({ ...form, sleep_quality: text })}
        keyboardType="numeric"
        placeholder="1 (worst) to 5 (best)"
        accessibilityLabel="Sleep Quality Input"
      />

      <Text style={styles.label}>Exercise Duration (mins):</Text>
      <TextInput
        style={styles.input}
        value={form.exercise_duration}
        onChangeText={(text) => setForm({ ...form, exercise_duration: text })}
        keyboardType="numeric"
        placeholder="e.g., 30"
        accessibilityLabel="Exercise Duration Input"
      />

      <Text style={styles.label}>Exercise Type:</Text>
      <Picker
        selectedValue={form.exercise_type}
        style={styles.picker}
        onValueChange={(itemValue) => setForm({ ...form, exercise_type: itemValue })}
      >
        <Picker.Item label="None" value="None" />
        <Picker.Item label="Stretching" value="Stretching" />
        <Picker.Item label="Walk" value="Walk" />
      </Picker>

      <Text style={styles.label}>Water Intake (glasses):</Text>
      <TextInput
        style={styles.input}
        value={form.water_intake}
        onChangeText={(text) => setForm({ ...form, water_intake: text })}
        keyboardType="numeric"
        placeholder="e.g., 8"
        accessibilityLabel="Water Intake Input"
      />

      <Text style={styles.label}>Pain Level (0-10):</Text>
      <TextInput
        style={styles.input}
        value={form.pain_level}
        onChangeText={(text) => setForm({ ...form, pain_level: text })}
        keyboardType="numeric"
        placeholder="0 (none) to 10 (severe)"
        accessibilityLabel="Pain Level Input"
      />

      <Text style={styles.label}>Stress Level (1-10):</Text>
      <TextInput
        style={styles.input}
        value={form.stress_level}
        onChangeText={(text) => setForm({ ...form, stress_level: text })}
        keyboardType="numeric"
        placeholder="1 (low) to 10 (high)"
        accessibilityLabel="Stress Level Input"
      />

      <Text style={styles.label}>Mood:</Text>
      <Picker
        selectedValue={form.mood}
        style={styles.picker}
        onValueChange={(itemValue) => setForm({ ...form, mood: itemValue })}
      >
        <Picker.Item label="Sad" value="Sad" />
        <Picker.Item label="Neutral" value="Neutral" />
        <Picker.Item label="Happy" value="Happy" />
        <Picker.Item label="Irritated" value="Irritated" />
      </Picker>

      <Text style={styles.label}>Meals Logged:</Text>
      <TextInput
        style={styles.input}
        value={form.meals_logged}
        onChangeText={(text) => setForm({ ...form, meals_logged: text })}
        keyboardType="numeric"
        placeholder="e.g., 3"
        accessibilityLabel="Meals Logged Input"
      />

      <Text style={styles.label}>Breastfeeding Done Today?</Text>
      <Picker
        selectedValue={form.breastfeeding_done}
        style={styles.picker}
        onValueChange={(itemValue) => setForm({ ...form, breastfeeding_done: itemValue })}
      >
        <Picker.Item label="No" value="No" />
        <Picker.Item label="Yes" value="Yes" />
      </Picker>

      <Button
        title="Calculate Wellness Score"
        onPress={predictWellness}
        color="#4CAF50"
        accessibilityLabel="Calculate Wellness Score Button"
      />

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Wellness Score: {result.wellness_score}/100</Text>
          <Text style={styles.feedbackText}>{result.message}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    marginTop: 5,
    marginBottom: 10,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e8f5e9',
    borderRadius: 5,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  feedbackText: {
    fontSize: 16,
    marginTop: 5,
    color: '#333',
  },
});

export default PredictScreen;