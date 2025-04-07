import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomeScreen() {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://10.16.48.219:5000/admin/events');
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error.message || error);
      }
    };
  
    fetchEvents();
  }, []);
  
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
          <MaterialCommunityIcons name="calendar" size={32} color="#7C3AED" />
          <Text style={styles.actionText}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard} onPress={() => router.push("../components/nutrienttracker")}>
          <MaterialCommunityIcons name="chart-bar" size={32} color="#7C3AED" />
          <Text style={styles.actionText}>Nutrients Track</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard}>
          <MaterialCommunityIcons name="bell" size={32} color="#7C3AED" />
          <Text style={styles.actionText}>Reminders</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('tg://resolve?domain=MomTechBot')} style={styles.actionCard}>
          <MaterialCommunityIcons name="robot-happy-outline" size={32} color="#7C3AED" />
          <Text style={styles.actionText}>Chat with AI</Text>
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
        {events.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 10, color: '#6B7280' }}>No upcoming events</Text>
        ) : (
          events.map((event, index) => (
            <View key={index} style={styles.eventCard}>
              <MaterialCommunityIcons name="needle" size={24} color="#7C3AED" />
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventTime}>
                  {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
                <Text style={styles.eventTitle}>{event.location}</Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  actionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%', // Adjusted to fit three in a row
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
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
    textAlign: 'center',
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
    fontSize: 15,
    color: '#6B7280',
    marginTop: 2,
  },
});
