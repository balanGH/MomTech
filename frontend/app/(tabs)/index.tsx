import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import DateTimePicker from "@react-native-community/datetimepicker";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView, Alert, Platform, ActivityIndicator } from 'react-native';
import apiClient from '@/api/base_api';

const Auth = () => {
  const [selectedMode, setSelectedMode] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    childName: '',
    childDOB: new Date(),
    address: {
      street: '',
      city: '',
      dist: '',
      state: '',
      country: '',
    },
    fare: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true); // Added loading state
  const router = useRouter();

  const IMAGES = {
    momLogo: 'https://cdn-icons-png.flaticon.com/512/3137/3137204.png',
    momIcon: 'https://cdn-icons-png.flaticon.com/512/3011/3011270.png',
    babysitterIcon: 'https://cdn-icons-png.flaticon.com/512/11449/11449901.png',
    momHeart: 'https://cdn-icons-png.flaticon.com/512/1027/1027112.png',
  };

  // Check userType in AsyncStorage on component mount
  useEffect(() => {
    const checkUserType = async () => {
      try {
        const userType = await AsyncStorage.getItem('userType');
        if (userType === 'mom') {
          router.replace('/mom');
        } else if (userType === 'babysitter') {
          router.replace('/babysitter');
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking userType in AsyncStorage:', error);
        setLoading(false);
      }
    };

    checkUserType();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!isLogin) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.phone) newErrors.phone = 'Phone is required';
      if (selectedMode === 'mom') {
        if (!formData.childName) newErrors.childName = "Child's name is required";
      } else {
        if (!formData.fare) newErrors.fare = 'Hourly fare is required';
        if (!formData.address.street) newErrors.street = 'Street address is required';
        if (!formData.address.city) newErrors.city = 'City is required';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    setIsLogin(true);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: '',
      childName: '',
      childDOB: new Date(),
      address: {
        street: '',
        city: '',
        dist: '',
        state: '',
        country: '',
      },
      fare: '',
    });
    setErrors({});
  };

  const handleInputChange = (name, value) => {
    if (name.includes('address.')) {
      const [, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleAuthAction = async () => {
    if (!validateForm()) return;
    try {
      const url = isLogin
        ? `/auth/login`
        : `/auth/register/${selectedMode}`;

      const payload = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
        userType: selectedMode,
        ...(!isLogin && selectedMode === 'mom' && {
          childName: formData.childName,
          childDOB: formData.childDOB,
        }),
        ...(!isLogin && selectedMode === 'babysitter' && {
          fare: formData.fare,
          address: formData.address,
        }),
      };

      const response = await apiClient.post(url, payload);
      console.log('Auth response:', response);

      if (isLogin) {
        await AsyncStorage.multiSet([
          ['token', response.data.token],
          ['userType', selectedMode],
          ['email', formData.email],
          ['name', response.data.name || formData.name],
        ]);
        router.replace(selectedMode === 'babysitter' ? '/babysitter' : '/mom');
      } else {
        Alert.alert(
          'Success',
          selectedMode === 'mom'
            ? 'Mom account created successfully!'
            : 'Babysitter registration submitted!',
          [{ text: 'OK', onPress: () => setIsLogin(true) }]
        );
      }
    } catch (error) {
      console.error('Auth error:', error);
      Alert.alert(
        'Error',
        error?.response?.data?.error || error.message || 'Something went wrong'
      );
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#FF85A2" />
      </SafeAreaView>
    );
  }

  if (!selectedMode) {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={{ uri: IMAGES.momLogo }} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Welcome to MomCare</Text>
        <Text style={styles.subtitle}>Choose your mode to continue</Text>
        <TouchableOpacity
          style={[styles.modeButton, { backgroundColor: '#FF85A2' }]}
          onPress={() => handleModeSelect('mom')}
        >
          <Image source={{ uri: IMAGES.momIcon }} style={styles.modeIcon} resizeMode="contain" />
          <Text style={styles.modeText}>I'm a Mom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, { backgroundColor: '#7EC4CF' }]}
          onPress={() => handleModeSelect('babysitter')}
        >
          <Image source={{ uri: IMAGES.babysitterIcon }} style={styles.modeIcon} resizeMode="contain" />
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

        {!isLogin && (
          <>
            <TextInput
              style={[styles.input, errors.name && styles.errorInput]}
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </>
        )}

        <TextInput
          style={[styles.input, errors.email && styles.errorInput]}
          placeholder="Email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          style={[styles.input, errors.password && styles.errorInput]}
          placeholder="Password"
          secureTextEntry={true}
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        {!isLogin && (
          <>
            <TextInput
              style={[styles.input, errors.phone && styles.errorInput]}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          </>
        )}

        {!isLogin && selectedMode === 'mom' && (
          <>
            <TextInput
              style={[styles.input, errors.childName && styles.errorInput]}
              placeholder="Your Child's Name"
              value={formData.childName}
              onChangeText={(text) => handleInputChange('childName', text)}
            />
            {errors.childName && <Text style={styles.errorText}>{errors.childName}</Text>}

            <TouchableOpacity
              style={[styles.input, { justifyContent: 'center' }]}
              onPress={() => setIsDatePickerVisible(true)}
            >
              <Text>{formData.childDOB.toDateString()}</Text>
            </TouchableOpacity>

            {isDatePickerVisible && (
              <DateTimePicker
                value={formData.childDOB || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={(event, date) => {
                  if (date) {
                    handleInputChange('childDOB', date);
                  }
                  setIsDatePickerVisible(false);
                }}
              />
            )}
          </>
        )}

        {!isLogin && selectedMode === 'babysitter' && (
          <>
            <TextInput
              style={[styles.input, errors.fare && styles.errorInput]}
              placeholder="Hourly Fare (₹)"
              keyboardType="numeric"
              value={formData.fare}
              onChangeText={(text) => handleInputChange('fare', text)}
            />
            {errors.fare && <Text style={styles.errorText}>{errors.fare}</Text>}

            <Text style={styles.sectionHeader}>Address Information</Text>

            <TextInput
              style={[styles.input, errors.street && styles.errorInput]}
              placeholder="Street Address"
              value={formData.address.street}
              onChangeText={(text) => handleInputChange('address.street', text)}
            />
            {errors.street && <Text style={styles.errorText}>{errors.street}</Text>}

            <TextInput
              style={[styles.input, errors.city && styles.errorInput]}
              placeholder="City"
              value={formData.address.city}
              onChangeText={(text) => handleInputChange('address.city', text)}
            />
            {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

            <TextInput
              style={styles.input}
              placeholder="District"
              value={formData.address.dist}
              onChangeText={(text) => handleInputChange('address.dist', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="State"
              value={formData.address.state}
              onChangeText={(text) => handleInputChange('address.state', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={formData.address.country}
              onChangeText={(text) => handleInputChange('address.country', text)}
            />
          </>
        )}

        <TouchableOpacity style={styles.authButton} onPress={handleAuthAction}>
          <Text style={styles.authButtonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleAuthMode}>
          <Text style={styles.toggleAuthText}>
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  modeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  sectionHeader: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#555',
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

export default Auth;