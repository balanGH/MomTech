import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HealthScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Overview</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="weight" size={24} color="#7C3AED" />
            <Text style={styles.statValue}>7.2 kg</Text>
            <Text style={styles.statLabel}>Weight</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="human-male-height" size={24} color="#7C3AED" />
            <Text style={styles.statValue}>68 cm</Text>
            <Text style={styles.statLabel}>Height</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="thermometer" size={24} color="#7C3AED" />
            <Text style={styles.statValue}>36.6°C</Text>
            <Text style={styles.statLabel}>Temperature</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Conditions</Text>
        <View style={styles.conditionCard}>
          <MaterialCommunityIcons name="alert-circle" size={24} color="#DC2626" />
          <View style={styles.conditionInfo}>
            <Text style={styles.conditionTitle}>Milk Allergy</Text>
            <Text style={styles.conditionDescription}>
              Avoid all dairy products. Use prescribed formula only.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vaccinations</Text>
        <View style={styles.vaccinationCard}>
          <View style={styles.vaccinationHeader}>
            <Text style={styles.vaccinationTitle}>DTaP (2nd dose)</Text>
            <TouchableOpacity style={styles.scheduleButton}>
              <Text style={styles.scheduleButtonText}>Schedule</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.vaccinationDue}>Due in 2 weeks</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Growth Chart</Text>
        <View style={styles.chartPlaceholder}>
          <MaterialCommunityIcons name="chart-line" size={48} color="#7C3AED" />
          <Text style={styles.chartText}>Growth tracking visualization</Text>
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
  vaccinationCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  vaccinationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vaccinationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  scheduleButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  vaccinationDue: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
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
});