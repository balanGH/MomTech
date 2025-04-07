import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity, Button, Alert } from 'react-native';
import { useEffect, useRef, useState } from 'react';

export default function NutrientTrackerScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [reviewedGroups, setReviewedGroups] = useState([]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const nutritionData = [
    { 
      age: '0-3 Months', 
      info: 'Breastmilk or formula only.',
      tips: 'Feed on demand, around 8-12 times per day.',
      nutrients: 'Vitamin D, Protein.',
      meals: 'Breastmilk with vitamin D drops.',
    },
    { 
      age: '4-6 Months', 
      info: 'Introduce single-ingredient purees (e.g., mashed bananas, rice cereal).',
      tips: 'Start with 1-2 tablespoons once a day and gradually increase.',
      nutrients: 'Iron, Vitamin A.',
      meals: 'Mashed bananas, fortified rice cereal.',
    },
    { 
      age: '7-9 Months', 
      info: 'Soft fruits, vegetables, and iron-fortified cereals.',
      tips: 'Encourage self-feeding with soft finger foods.',
      nutrients: 'Calcium, Iron.',
      meals: 'Steamed carrots, iron-rich porridge.',
    },
    { 
      age: '10-12 Months', 
      info: 'Small pieces of soft foods like pasta, scrambled eggs, and yogurt.',
      tips: 'Transition to 3 meals a day with snacks in between.',
      nutrients: 'Protein, Vitamin C.',
      meals: 'Scrambled eggs, yogurt with fruit puree.',
    },
    { 
      age: '1-3 Years', 
      info: 'Balanced meals with dairy, grains, fruits, and proteins.',
      tips: 'Avoid processed foods and offer a variety of colorful plates.',
      nutrients: 'Calcium, Fiber.',
      meals: 'Vegetable stir fry, whole-grain bread with peanut butter.',
    },
    { 
      age: '4-5 Years', 
      info: 'Encourage variety: veggies, lean proteins, and whole grains.',
      tips: 'Teach table manners and involve kids in meal prep.',
      nutrients: 'Fiber, Omega-3.',
      meals: 'Grilled chicken with quinoa and mixed vegetables.',
    },
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);

    if (!reviewedGroups.includes(index)) {
      setReviewedGroups([...reviewedGroups, index]);
    }
  };

  const handleFeedback = () => {
    Alert.alert('Feedback Sent!', 'Thank you for your valuable feedback.');
  };

  const renderNutrientRecommendations = (item) => (
    <View>
      <Text style={styles.nutrientsText}>Key Nutrients: {item.nutrients}</Text>
      <Text style={styles.mealsText}>Meal Ideas: {item.meals}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Text style={styles.headerText}>Nutrient Tracker</Text>
        <Text style={styles.progressText}>
          Reviewed {reviewedGroups.length} out of {nutritionData.length} age groups
        </Text>
      </Animated.View>
      {nutritionData.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => toggleExpand(index)}
        >
          <Text style={styles.ageText}>{item.age}</Text>
          {expandedIndex === index && (
            <View>
              <Text style={styles.infoText}>{item.info}</Text>
              <Text style={styles.tipsText}>Tips: {item.tips}</Text>
              {renderNutrientRecommendations(item)}
            </View>
          )}
        </TouchableOpacity>
      ))}
      <View style={styles.feedbackContainer}>
        <Button
          title="Provide Feedback"
          onPress={handleFeedback}
          color="#7C3AED"
        />
      </View>
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
  progressText: {
    fontSize: 16,
    color: '#4B5563',
    marginTop: 4,
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
  tipsText: {
    fontSize: 14,
    color: '#10B981',
    marginTop: 4,
  },
  nutrientsText: {
    fontSize: 14,
    color: '#7C3AED',
    marginTop: 4,
  },
  mealsText: {
    fontSize: 14,
    color: '#1F2937',
    marginTop: 4,
  },
  feedbackContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
