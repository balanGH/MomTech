import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  ActivityIndicator, 
  Linking 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useState } from 'react';

export default function BabysitterVerificationScreen() {
  const [documents, setDocuments] = useState({
    babysitting: null,
    firstAid: null,
    anaphylaxis: null,
    otherDocuments: null, // Optional
  });
  const [loading, setLoading] = useState(false);

  // User email (Replace this with actual authentication-based email retrieval)
  const user_mailid = "sara@momtech.in";
  console.log("user_mailid", user_mailid);

  // Function to pick a document
  const pickDocument = async (type) => {
    let result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
    console.log("Selected document:", result);

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

  // Function to clear all documents
  const clearAllDocuments = () => {
    setDocuments({
      babysitting: null,
      firstAid: null,
      anaphylaxis: null,
      otherDocuments: null,
    });
  };

  // Function to upload documents
  const uploadDocuments = async () => {
    if (!documents.babysitting || !documents.firstAid || !documents.anaphylaxis) {
      Alert.alert('Error', 'Please upload all required certificates.');
      return;
    }
  
    setLoading(true);
    const formData = new FormData();
  
    Object.keys(documents).forEach((key) => {
      if (documents[key]) {
        const originalName = documents[key].name;
        const extension = originalName.split('.').pop();
        const formattedName = `${user_mailid.replace(/[@.]/g, '')}_${key}.${extension}`;
  
        formData.append(key, {
          uri: documents[key].uri,
          type: 'application/pdf',
          name: formattedName,
        });
      }
    });
  
    // Add User Email for Backend Verification
    formData.append('email', user_mailid);
  
    try {
      const response = await fetch('http://192.168.137.97:5000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Successfully uploaded!');
        clearAllDocuments();
      } else {
        Alert.alert('Error', result.error || 'Failed to upload documents.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while uploading documents.');
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Babysitter Verification</Text>
      <Text style={styles.subHeader}>
        Upload your certificates for verification.{'\n'}Complete the steps below.
      </Text>

      <Text style={styles.progressText}>
        {`Progress: ${Object.values(documents).filter((doc) => doc).length}/3 required certificates uploaded`}
      </Text>

      <View style={styles.uploadSection}>
        {['babysitting', 'firstAid', 'anaphylaxis'].map((key) => (
          <View key={key} style={styles.uploadItem}>
            <View style={styles.uploadRow}>
              <Text style={styles.uploadLabel}>
                {key === 'babysitting' 
                  ? 'Babysitting Course' 
                  : key === 'firstAid' 
                  ? 'First Aid' 
                  : 'Anaphylaxis'} Certificate
              </Text>
              <TouchableOpacity style={styles.uploadButton} onPress={() => pickDocument(key)}>
                <MaterialCommunityIcons name="file-upload" size={24} color="#7C3AED" />
                <Text style={styles.uploadText}>{documents[key] ? 'Replace' : 'Upload'}</Text>
              </TouchableOpacity>
            </View>
            {documents[key]?.name && <Text style={styles.fileName}>{`Uploaded: ${documents[key].name}`}</Text>}
          </View>
        ))}

        {/* Optional document */}
        <View style={styles.uploadItem}>
          <View style={styles.uploadRow}>
            <Text style={styles.uploadLabel}>Other Documents (Optional)</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={() => pickDocument('otherDocuments')}>
              <MaterialCommunityIcons name="file-upload" size={24} color="#7C3AED" />
              <Text style={styles.uploadText}>{documents.otherDocuments ? 'Replace' : 'Upload'}</Text>
            </TouchableOpacity>
          </View>
          {documents.otherDocuments?.name && <Text style={styles.fileName}>{`Uploaded: ${documents.otherDocuments.name}`}</Text>}
        </View>
      </View>

      <TouchableOpacity style={styles.clearButton} onPress={clearAllDocuments}>
        <Text style={styles.clearText}>Clear All</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.submitButton, loading && { opacity: 0.6 }]} 
        onPress={uploadDocuments} 
        disabled={loading}
      >
        {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.submitText}>Submit for Verification</Text>}
      </TouchableOpacity>

      {/* Terms and Conditions Link */}
      <TouchableOpacity onPress={() => Linking.openURL('http://yourtermsandconditions.com')}>
        <Text style={styles.termsText}>Terms and Conditions Apply</Text>
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
  termsText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#7C3AED',
    marginTop: 16,
    textDecorationLine: 'underline',
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
