import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    if (!email || !password || (isSignUp && !name)) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const url = isSignUp
      ? "http://192.168.137.116:5000/api/signup"
      : "http://192.168.137.116:5000/api/login";

    const payload = isSignUp ? { name, email, password } : { email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", isSignUp ? "Account Created!" : "Logged In!");
        setIsAuthenticated(true);
      } else {
        Alert.alert("Error", data.message || "Authentication Failed");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.authContainer}>
        <Text style={styles.title}>{isSignUp ? "Sign Up" : "Login"}</Text>

        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
          <Text style={styles.authButtonText}>{isSignUp ? "Create Account" : "Login"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
          <Text style={styles.toggleText}>
            {isSignUp ? "Already have an account? Login" : "New user? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeSection}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800" }}
          style={styles.headerImage}
        />
        <Text style={styles.welcomeText}>Welcome, {name}!</Text>
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
          <MaterialCommunityIcons name="calendar-check" size={32} color="#7C3AED" />
          <Text style={styles.actionText}>Appointments</Text>
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
        <View style={styles.eventCard}>
          <MaterialCommunityIcons name="needle" size={24} color="#7C3AED" />
          <View style={styles.eventDetails}>
            <Text style={styles.eventTitle}>Vaccination Due</Text>
            <Text style={styles.eventTime}>Tomorrow at 10:00 AM</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  authContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#333" },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  authButton: { backgroundColor: "#7C3AED", paddingVertical: 12, width: "100%", alignItems: "center", borderRadius: 8 },
  authButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  toggleText: { marginTop: 15, color: "#6B7280", fontSize: 16 },
  welcomeSection: { padding: 20, backgroundColor: "#fff" },
  headerImage: { width: "100%", height: 200, borderRadius: 10, marginBottom: 16 },
  welcomeText: { fontSize: 24, fontWeight: "bold", color: "#1F2937" },
  subtitle: { fontSize: 16, color: "#6B7280", marginTop: 4 },
  quickActions: { flexDirection: "row", justifyContent: "space-between", padding: 20 },
  actionCard: { backgroundColor: "#fff", padding: 16, borderRadius: 12, alignItems: "center", width: "30%" },
  actionText: { marginTop: 8, fontSize: 14, color: "#4B5563", textAlign: "center" },
  aiSection: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#1F2937", marginBottom: 12 },
  insightCard: { backgroundColor: "#fff", padding: 16, borderRadius: 12, flexDirection: "row", alignItems: "center" },
  insightText: { flex: 1, marginLeft: 12, fontSize: 14, color: "#4B5563" },
  upcomingSection: { padding: 20 },
  eventCard: { backgroundColor: "#fff", padding: 16, borderRadius: 12, flexDirection: "row", alignItems: "center" },
  eventDetails: { marginLeft: 12 },
  eventTitle: { fontSize: 16, fontWeight: "600", color: "#1F2937" },
  eventTime: { fontSize: 14, color: "#6B7280", marginTop: 2 },
});
