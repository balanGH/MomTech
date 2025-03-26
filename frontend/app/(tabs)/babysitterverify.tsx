import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BabysitterVerificationScreen() {
  const [documents, setDocuments] = useState([]);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      setDocuments([...documents, result]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Alex Carter</Text>
        <Text style={styles.role}>Experienced Babysitter</Text>
      </View>

      {/* Upload Certificates Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upload Your Certificates</Text>
        
        <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
          <MaterialCommunityIcons name="file-upload" size={24} color="#7C3AED" />
          <Text style={styles.uploadText}>Upload Certificate</Text>
        </TouchableOpacity>

        {documents.length > 0 && (
          <View style={styles.uploadedFiles}>
            {documents.map((doc, index) => (
              <View key={index} style={styles.fileItem}>
                <MaterialCommunityIcons name="file-check-outline" size={20} color="#059669" />
                <Text style={styles.fileName}>{doc.name}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Verification Submission */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit for Verification</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  profileSection: {
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
  uploadButton: {
    backgroundColor: '#EDE9FE',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#7C3AED',
    marginLeft: 8,
  },
  uploadedFiles: {
    marginTop: 12,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  fileName: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4B5563',
  },
  submitButton: {
    backgroundColor: '#7C3AED',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    margin: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
