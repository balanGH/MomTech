import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { Alert } from 'react-native';

const App = () => {
  const [selectedMode, setSelectedMode] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    childName: '',
    childAge: ''
  });

  // Network image URLs
  const IMAGES = {
    momLogo: 'https://cdn-icons-png.flaticon.com/512/3137/3137204.png',
    momIcon: 'https://cdn-icons-png.flaticon.com/512/3011/3011270.png',
    babysitterIcon: 'https://cdn-icons-png.flaticon.com/512/11449/11449901.png',
    momHeart: 'https://cdn-icons-png.flaticon.com/512/1027/1027112.png'
  };

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    setIsLogin(true);
  };

  const handleInputChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

//   const handleAuthAction = () => {
//     alert(`${isLogin ? 'Login' : 'Signup'} successful as ${selectedMode}`);
//   };
// Add these imports


// Update handleAuthAction
// const handleAuthAction = async () => {
//   try {
//     const url = isLogin 
//       ? 'http://10.16.64.177:5000/auth/login'
//       : `http://10.16.64.177:5000/auth/register/${selectedMode}`;

//     const response = await axios.post(url, {
//       ...formData,
//       userType: selectedMode
//     });

//     if (isLogin) {
//       await AsyncStorage.setItem('token', response.data.token);
//       router.replace('/(tabs)/');
//     } else {
//       Alert.alert('Success', 'Check your email for verification');
//       setIsLogin(true);
//     }
//   } catch (error) {
//     Alert.alert('Error', error.response?.data?.error || 'Something went wrong');
//   }
// };
const handleAuthAction = async () => {
    try {
      // Input validation
      if (!formData.email || !formData.password) {
        Alert.alert('Error', 'Please fill all required fields');
        return;
      }
  
      const url = isLogin 
        ? 'http://10.16.64.177:5000/auth/login' 
        : 'http://10.16.64.177:5000/auth/register/mom';
  
      const response = await axios.post(url, {
        ...formData,
        userType: selectedMode
      });
  
      if (isLogin) {
        await AsyncStorage.setItem('token', response.data.token);
        router.replace('/(tabs)/');
      } else {
        Alert.alert(
          'Success', 
          'Account created! Check your email for verification'
        );
        setIsLogin(true); // Switch back to login after signup
      }
    } catch (error) {
      Alert.alert(
        'Error', 
        error.response?.data?.error || 'Something went wrong'
      );
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: '',
      childName: '',
      childAge: ''
    });
  };

  if (!selectedMode) {
    return (
      <SafeAreaView style={styles.container}>
        <Image 
          source={{ uri: IMAGES.momLogo }} 
          style={styles.logo} 
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to MomCare</Text>
        <Text style={styles.subtitle}>Choose your mode to continue</Text>
        
        <TouchableOpacity 
          style={[styles.modeButton, {backgroundColor: '#FF85A2'}]}
          onPress={() => handleModeSelect('mom')}
        >
          <Image 
            source={{ uri: IMAGES.momIcon }} 
            style={styles.modeIcon} 
            resizeMode="contain"
          />
          <Text style={styles.modeText}>I'm a Mom</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.modeButton, {backgroundColor: '#7EC4CF'}]}
          onPress={() => handleModeSelect('babysitter')}
        >
          <Image 
            source={{ uri: IMAGES.babysitterIcon }} 
            style={styles.modeIcon} 
            resizeMode="contain"
          />
          <Text style={styles.modeText}>I'm a Babysitter</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.authContainer}>
        <Image 
          source={{ uri: selectedMode === 'mom' ? IMAGES.momHeart : IMAGES.babysitterIcon }} 
          style={styles.authLogo} 
          resizeMode="contain"
        />
        <Text style={styles.authTitle}>
          {isLogin ? 'Welcome Back!' : selectedMode === 'mom' ? 'Join Our Mom Community' : 'Babysitter Registration'}
        </Text>
        
        {!isLogin && selectedMode === 'mom' && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Your Child's Name"
              value={formData.childName}
              onChangeText={(text) => handleInputChange('childName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Your Child's Age"
              keyboardType="numeric"
              value={formData.childAge}
              onChangeText={(text) => handleInputChange('childAge', text)}
            />
          </>
        )}
        
        {!isLogin && selectedMode === 'babysitter' && (
          <TextInput
            style={styles.input}
            placeholder="Your Full Name"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />
        )}
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
        />
        
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
          />
        )}
        
        <TouchableOpacity style={styles.authButton} onPress={handleAuthAction}>
          <Text style={styles.authButtonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={toggleAuthMode}>
          <Text style={styles.toggleAuthText}>
            {isLogin 
              ? "Don't have an account? Sign Up" 
              : "Already have an account? Login"}
          </Text>
        </TouchableOpacity>
        
        {selectedMode === 'mom' && (
          <Text style={styles.heartwarmingText}>
            "Because every mom deserves a helping hand ❤️"
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles remain exactly the same as in your original code
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9FB',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF85A2',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 30,
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 25,
    marginHorizontal: 40,
    marginVertical: 10,
    elevation: 3,
  },
  modeIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  authContainer: {
    padding: 30,
    alignItems: 'center',
  },
  authLogo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  authTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF85A2',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  authButton: {
    width: '100%',
    backgroundColor: '#FF85A2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  authButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleAuthText: {
    color: '#FF85A2',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  heartwarmingText: {
    marginTop: 30,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default App;