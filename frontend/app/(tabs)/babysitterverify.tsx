import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Alert 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useState } from 'react';

export default function BabysitterVerificationScreen() {
  const [documents, setDocuments] = useState({
    babysitting: null,
    firstAid: null,
    cpr: null,
    otherDocuments: null,
  });

  const pickDocument = async (type) => {
    let result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
    console.log("Selected document:", result); // Debugging

    if (result.type !== 'cancel' && result.assets && result.assets[0]) {
      const file = result.assets[0];
      const uri = file.uri.startsWith("file://") ? file.uri : FileSystem.documentDirectory + file.name;
      setDocuments((prev) => ({
        ...prev,
        [type]: {
          name: file.name,
          uri: uri,
        },
      }));
    }
  };

  const clearAllDocuments = () => {
    setDocuments({
      babysitting: null,
      firstAid: null,
      cpr: null,
      otherDocuments: null,
    });
  };

  const uploadDocuments = async () => {
    if (!documents.babysitting || !documents.firstAid || !documents.cpr || !documents.otherDocuments) {
      Alert.alert('Error', 'Please upload all required certificates.');
      return;
    }

    const formData = new FormData();
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
      const response = await fetch('http://192.168.1.100:5000/upload', { // Replace with your local IP
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
      <Text style={styles.subHeader}>Upload your certificates for verification.{"\n"}Complete the steps below.
      </Text>


      <Text style={styles.progressText}>
        {`Progress: ${
          Object.values(documents).filter((doc) => doc).length
        }/4 certificates uploaded`}
      </Text>

      <View style={styles.uploadSection}>
        {Object.keys(documents).map((key) => (
          <View key={key} style={styles.uploadItem}>
            <View style={styles.uploadRow}>
              <Text style={styles.uploadLabel}>
                {key === 'babysitting' 
                  ? 'Babysitting Course' 
                  : key === 'firstAid' 
                  ? 'First Aid' 
                  : key === 'cpr' 
                  ? 'CPR' 
                  : 'Other Documents'} Certificate
              </Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => pickDocument(key)}
              >
                <MaterialCommunityIcons name="file-upload" size={24} color="#7C3AED" />
                <Text style={styles.uploadText}>
                  {documents[key] ? 'Replace' : 'Upload'}
                </Text>
              </TouchableOpacity>
            </View>
            {documents[key]?.name && (
              <Text style={styles.fileName}>
                {`Uploaded: ${documents[key].name}`}
              </Text>
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.clearButton} onPress={clearAllDocuments}>
        <Text style={styles.clearText}>Clear All</Text>
      </TouchableOpacity>

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
    paddingHorizontal: 16,
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
  progressText: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  uploadSection: {
    marginBottom: 24,
  },
  uploadItem: {
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
  uploadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  uploadLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
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
  fileName: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  clearButton: {
    backgroundColor: '#E11D48',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  clearText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
