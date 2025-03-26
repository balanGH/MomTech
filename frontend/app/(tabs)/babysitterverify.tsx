import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';

export default function BabysitterVerificationScreen() {
  const [documents, setDocuments] = useState({
    babysitting: null,
    firstAid: null,
    cpr: null,
  });

  const pickDocument = async (type) => {
    let result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
    if (result.type !== 'cancel') {
      setDocuments((prev) => ({ ...prev, [type]: result }));
    }
  };

  const uploadDocuments = async () => {
    const formData = new FormData();

    // Add each file to the FormData object
    Object.keys(documents).forEach((key) => {
      if (documents[key]) {
        formData.append(key, {
          uri: documents[key].uri,
          type: 'application/pdf',
          name: documents[key].name,
        });
      }
    });

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert('Success', 'Documents uploaded successfully!');
      } else {
        Alert.alert('Error', 'Failed to upload documents.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while uploading documents.');
      console.error('Upload error:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Babysitter Verification</Text>
      <Text style={styles.subHeader}>Upload your certificates for verification</Text>

      <View style={styles.uploadSection}>
        {Object.keys(documents).map((key) => (
          <View key={key} style={styles.uploadItem}>
            <Text style={styles.uploadLabel}>
              {key === 'babysitting' ? 'Babysitting Course' : key === 'firstAid' ? 'First Aid' : 'CPR'} Certificate
            </Text>
            <TouchableOpacity style={styles.uploadButton} onPress={() => pickDocument(key)}>
              <MaterialCommunityIcons name="file-upload" size={24} color="#7C3AED" />
              <Text style={styles.uploadText}>
                {documents[key] ? documents[key].name : 'Upload'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={uploadDocuments}>
        <Text style={styles.submitText}>Submit for Verification</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  uploadSection: {
    marginBottom: 24,
  },
  uploadItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  uploadLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#7C3AED',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
