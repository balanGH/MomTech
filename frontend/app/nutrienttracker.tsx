import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { useNavigation } from 'expo-router';

export default function NutrientTrackerScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const nutritionData = [
    { age: '0-3 Months', info: 'Breastmilk or formula only.' },
    { age: '4-6 Months', info: 'Introduce single-ingredient purees (e.g., mashed bananas, rice cereal).' },
    { age: '7-9 Months', info: 'Soft fruits, vegetables, and iron-fortified cereals.' },
    { age: '10-12 Months', info: 'Small pieces of soft foods like pasta, scrambled eggs, and yogurt.' },
    { age: '1-3 Years', info: 'Balanced meals with dairy, grains, fruits, and proteins.' },
    { age: '4-5 Years', info: 'Encourage variety: veggies, lean proteins, and whole grains.' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}> 
        <Text style={styles.headerText}>Nutrient Tracker</Text>
      </Animated.View>
      {nutritionData.map((item, index) => (
        <Animated.View 
          key={index} 
          style={[styles.card, { opacity: fadeAnim }]}
        >
          <Text style={styles.ageText}>{item.age}</Text>
          <Text style={styles.infoText}>{item.info}</Text>
        </Animated.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7C3AED',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ageText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  infoText: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 4,
  },
});
