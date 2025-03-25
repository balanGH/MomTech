import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeSection}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800' }}
          style={styles.headerImage}
        />
        <Text style={styles.welcomeText}>Welcome, Sarah!</Text>
        <Text style={styles.subtitle}>How can I help you today?</Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionCard}>
          <MaterialCommunityIcons name="baby-bottle" size={32} color="#7C3AED" />
          <Text style={styles.actionText}>Track Feeding</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard}>
          <MaterialCommunityIcons name="sleep" size={32} color="#7C3AED" />
          <Text style={styles.actionText}>Sleep Log</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard}>
          <MaterialCommunityIcons name="calendar-check" size={32} color="#7C3AED" />
          <Text style={styles.actionText}>Appointments</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.aiSection}>
        <Text style={styles.sectionTitle}>AI Insights</Text>
        <View style={styles.insightCard}>
          <MaterialCommunityIcons name="lightbulb-on" size={24} color="#7C3AED" />
          <Text style={styles.insightText}>
            Based on Emma's sleep pattern, try adjusting bedtime to 7:30 PM for better rest.
          </Text>
        </View>
      </View>

      <View style={styles.upcomingSection}>
        <Text style={styles.sectionTitle}>Upcoming</Text>
        <View style={styles.eventCard}>
          <MaterialCommunityIcons name="needle" size={24} color="#7C3AED" />
          <View style={styles.eventDetails}>
            <Text style={styles.eventTitle}>Vaccination Due</Text>
            <Text style={styles.eventTime}>Tomorrow at 10:00 AM</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  actionCard: {
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
  actionText: {
    marginTop: 8,
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
  },
  aiSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  insightCard: {
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
  insightText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#4B5563',
  },
  upcomingSection: {
    padding: 20,
  },
  eventCard: {
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
  eventDetails: {
    marginLeft: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  eventTime: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
});