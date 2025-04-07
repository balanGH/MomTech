import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ScheduleScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.dateHeader}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#4B5563" />
        </TouchableOpacity>
        <Text style={styles.dateText}>Today, January 15</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#4B5563" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Feeding Schedule</Text>
        <View style={styles.timelineContainer}>
          <View style={styles.timelineItem}>
            <View style={styles.timeColumn}>
              <Text style={styles.timeText}>7:00 AM</Text>
            </View>
            <View style={styles.contentColumn}>
              <View style={[styles.eventCard, { borderLeftColor: '#7C3AED' }]}>
                <MaterialCommunityIcons name="baby-bottle" size={20} color="#7C3AED" />
                <Text style={styles.eventText}>Morning Feed</Text>
                <Text style={styles.eventDetails}>180ml Formula</Text>
              </View>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={styles.timeColumn}>
              <Text style={styles.timeText}>11:00 AM</Text>
            </View>
            <View style={styles.contentColumn}>
              <View style={[styles.eventCard, { borderLeftColor: '#059669' }]}>
                <MaterialCommunityIcons name="food-apple" size={20} color="#059669" />
                <Text style={styles.eventText}>Snack Time</Text>
                <Text style={styles.eventDetails}>Mashed Banana</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sleep Schedule</Text>
        <View style={styles.sleepCard}>
          <View style={styles.sleepHeader}>
            <MaterialCommunityIcons name="sleep" size={24} color="#7C3AED" />
            <Text style={styles.sleepTitle}>Next Nap</Text>
          </View>
          <Text style={styles.sleepTime}>1:00 PM - 3:00 PM</Text>
          <View style={styles.sleepStats}>
            <Text style={styles.sleepStat}>Duration: 2 hours</Text>
            <Text style={styles.sleepStat}>Quality: Good</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activities</Text>
        <TouchableOpacity style={styles.activityCard}>
          <MaterialCommunityIcons name="yoga" size={24} color="#7C3AED" />
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Tummy Time</Text>
            <Text style={styles.activityTime}>4:00 PM</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
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
  timelineContainer: {
    marginTop: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timeColumn: {
    width: 80,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#6B7280',
  },
  contentColumn: {
    flex: 1,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginLeft: 12,
  },
  eventDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 'auto',
  },
  sleepCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sleepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sleepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12,
  },
  sleepTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7C3AED',
    marginBottom: 8,
  },
  sleepStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sleepStat: {
    fontSize: 14,
    color: '#6B7280',
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityContent: {
    flex: 1,
    marginLeft: 12,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  activityTime: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
});