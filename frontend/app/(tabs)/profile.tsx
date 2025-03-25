import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Sarah Johnson</Text>
        <Text style={styles.role}>Mother of Emma, 6 months</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Child Information</Text>
        <View style={styles.childCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1519457431-44ccd64a579f?w=400' }}
            style={styles.childImage}
          />
          <View style={styles.childInfo}>
            <Text style={styles.childName}>Emma Johnson</Text>
            <Text style={styles.childAge}>6 months old</Text>
            <Text style={styles.childDob}>Born: July 15, 2023</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <MaterialCommunityIcons name="account-edit" size={24} color="#7C3AED" />
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#7C3AED" />
            <Text style={styles.actionText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <MaterialCommunityIcons name="cog-outline" size={24} color="#7C3AED" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <MaterialCommunityIcons name="help-circle-outline" size={24} color="#7C3AED" />
            <Text style={styles.actionText}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mother's Health</Text>
        <TouchableOpacity style={styles.healthCard}>
          <MaterialCommunityIcons name="heart-pulse" size={24} color="#7C3AED" />
          <View style={styles.healthInfo}>
            <Text style={styles.healthTitle}>Postpartum Checkup</Text>
            <Text style={styles.healthDate}>Next appointment: Jan 20, 2024</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <MaterialCommunityIcons name="logout" size={20} color="#DC2626" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  role: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
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
  childCard: {
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
  childImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  childInfo: {
    marginLeft: 16,
  },
  childName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  childAge: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 2,
  },
  childDob: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
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
  },
  healthCard: {
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
  healthInfo: {
    flex: 1,
    marginLeft: 12,
  },
  healthTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  healthDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    margin: 16,
    padding: 12,
    borderRadius: 12,
  },
  logoutText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});