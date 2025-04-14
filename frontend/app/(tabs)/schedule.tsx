// // import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// // import { MaterialCommunityIcons } from '@expo/vector-icons';

// // export default function ScheduleScreen() {
// //   return (
// //     <ScrollView style={styles.container}>
// //       <View style={styles.dateHeader}>
// //         <TouchableOpacity>
// //           <MaterialCommunityIcons name="chevron-left" size={24} color="#4B5563" />
// //         </TouchableOpacity>
// //         <Text style={styles.dateText}>Today, January 15</Text>
// //         <TouchableOpacity>
// //           <MaterialCommunityIcons name="chevron-right" size={24} color="#4B5563" />
// //         </TouchableOpacity>
// //       </View>

// //       <View style={styles.section}>
// //         <Text style={styles.sectionTitle}>Feeding Schedule</Text>
// //         <View style={styles.timelineContainer}>
// //           <View style={styles.timelineItem}>
// //             <View style={styles.timeColumn}>
// //               <Text style={styles.timeText}>7:00 AM</Text>
// //             </View>
// //             <View style={styles.contentColumn}>
// //               <View style={[styles.eventCard, { borderLeftColor: '#7C3AED' }]}>
// //                 <MaterialCommunityIcons name="baby-bottle" size={20} color="#7C3AED" />
// //                 <Text style={styles.eventText}>Morning Feed</Text>
// //                 <Text style={styles.eventDetails}>180ml Formula</Text>
// //               </View>
// //             </View>
// //           </View>

// //           <View style={styles.timelineItem}>
// //             <View style={styles.timeColumn}>
// //               <Text style={styles.timeText}>11:00 AM</Text>
// //             </View>
// //             <View style={styles.contentColumn}>
// //               <View style={[styles.eventCard, { borderLeftColor: '#059669' }]}>
// //                 <MaterialCommunityIcons name="food-apple" size={20} color="#059669" />
// //                 <Text style={styles.eventText}>Snack Time</Text>
// //                 <Text style={styles.eventDetails}>Mashed Banana</Text>
// //               </View>
// //             </View>
// //           </View>
// //         </View>
// //       </View>

// //       <View style={styles.section}>
// //         <Text style={styles.sectionTitle}>Sleep Schedule</Text>
// //         <View style={styles.sleepCard}>
// //           <View style={styles.sleepHeader}>
// //             <MaterialCommunityIcons name="sleep" size={24} color="#7C3AED" />
// //             <Text style={styles.sleepTitle}>Next Nap</Text>
// //           </View>
// //           <Text style={styles.sleepTime}>1:00 PM - 3:00 PM</Text>
// //           <View style={styles.sleepStats}>
// //             <Text style={styles.sleepStat}>Duration: 2 hours</Text>
// //             <Text style={styles.sleepStat}>Quality: Good</Text>
// //           </View>
// //         </View>
// //       </View>

// //       <View style={styles.section}>
// //         <Text style={styles.sectionTitle}>Activities</Text>
// //         <TouchableOpacity style={styles.activityCard}>
// //           <MaterialCommunityIcons name="yoga" size={24} color="#7C3AED" />
// //           <View style={styles.activityContent}>
// //             <Text style={styles.activityTitle}>Tummy Time</Text>
// //             <Text style={styles.activityTime}>4:00 PM</Text>
// //           </View>
// //           <MaterialCommunityIcons name="chevron-right" size={24} color="#6B7280" />
// //         </TouchableOpacity>
// //       </View>
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F3F4F6',
// //   },
// //   dateHeader: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     padding: 16,
// //     backgroundColor: '#fff',
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#E5E7EB',
// //   },
// //   dateText: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //     color: '#1F2937',
// //   },
// //   section: {
// //     padding: 16,
// //   },
// //   sectionTitle: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     color: '#1F2937',
// //     marginBottom: 12,
// //   },
// //   timelineContainer: {
// //     marginTop: 8,
// //   },
// //   timelineItem: {
// //     flexDirection: 'row',
// //     marginBottom: 16,
// //   },
// //   timeColumn: {
// //     width: 80,
// //     alignItems: 'center',
// //   },
// //   timeText: {
// //     fontSize: 14,
// //     color: '#6B7280',
// //   },
// //   contentColumn: {
// //     flex: 1,
// //   },
// //   eventCard: {
// //     backgroundColor: '#fff',
// //     borderRadius: 12,
// //     padding: 16,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     borderLeftWidth: 4,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 2,
// //   },
// //   eventText: {
// //     fontSize: 16,
// //     fontWeight: '500',
// //     color: '#1F2937',
// //     marginLeft: 12,
// //   },
// //   eventDetails: {
// //     fontSize: 14,
// //     color: '#6B7280',
// //     marginLeft: 'auto',
// //   },
// //   sleepCard: {
// //     backgroundColor: '#fff',
// //     borderRadius: 12,
// //     padding: 16,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 2,
// //   },
// //   sleepHeader: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 8,
// //   },
// //   sleepTitle: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //     color: '#1F2937',
// //     marginLeft: 12,
// //   },
// //   sleepTime: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     color: '#7C3AED',
// //     marginBottom: 8,
// //   },
// //   sleepStats: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //   },
// //   sleepStat: {
// //     fontSize: 14,
// //     color: '#6B7280',
// //   },
// //   activityCard: {
// //     backgroundColor: '#fff',
// //     borderRadius: 12,
// //     padding: 16,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 2,
// //   },
// //   activityContent: {
// //     flex: 1,
// //     marginLeft: 12,
// //   },
// //   activityTitle: {
// //     fontSize: 16,
// //     fontWeight: '500',
// //     color: '#1F2937',
// //   },
// //   activityTime: {
// //     fontSize: 14,
// //     color: '#6B7280',
// //     marginTop: 2,
// //   },
// // });
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';

// export default function ScheduleTab() {
//   // Updated with the correct feature names that match the trained model
//   const [input, setInput] = useState({
//     "Sleep Duration (hrs)": "7",
//     "Exercise Duration (mins)": "20",
//     "Water Intake (glasses)": "8",
//     "Pain Level (0-10)": "3",
//     "Stress Level (1-10)": "4",
//     "Anxiety Level (1-10)": "3",
//     "Energy Morning (0-10)": "6",
//     "Energy Afternoon (0-10)": "5",
//     "Energy Night (0-10)": "4",
//     "Baby Sleep Affected Your Sleep?": "0",
//     "Breastfeeding Done Today?": "1",
//     "Exercise Type": "1",
//     "Feeding Duration (avg mins)": "15",
//     "Feeding Frequency": "6"
//     // Add any other missing features that were in the model training
//   });
  
//   const [score, setScore] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Update this URL to match your Flask server address
//   const SERVER_URL = "http://10.21.76.241:5001";

//   const handlePredict = async () => {
//     try {
//       setIsLoading(true);
//       setError("");
      
//       console.log("Sending request to:", `${SERVER_URL}/predict`);
      
//       const response = await fetch(`${SERVER_URL}/predict`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(
//           Object.fromEntries(
//             Object.entries(input).map(([k, v]) => [k, parseFloat(v)])
//           )
//         )
//       });
      
//       console.log("Response status:", response.status);
      
//       const result = await response.json();
//       console.log("Response data:", result);
      
//       if (result.error) {
//         setError(result.error);
//       } else {
//         setScore(result["Wellness Score"]);
//       }
//     } catch (error) {
//       console.error("Prediction Error:", error);
//       setError("Failed to connect to server. Please check your connection and try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Mom Wellness Input</Text>
      
//       {Object.entries(input).map(([key, value]) => (
//         <View key={key} style={styles.inputGroup}>
//           <Text style={styles.label}>{key}</Text>
//           <TextInput
//             value={value}
//             onChangeText={(text) => setInput({ ...input, [key]: text })}
//             keyboardType="numeric"
//             style={styles.input}
//           />
//         </View>
//       ))}
      
//       <Button
//         title={isLoading ? "Processing..." : "CALCULATE WELLNESS SCORE"}
//         onPress={handlePredict}
//         disabled={isLoading}
//         color="#3b5998"
//       />
      
//       {error ? (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>{error}</Text>
//         </View>
//       ) : score ? (
//         <View style={styles.resultContainer}>
//           <Text style={styles.scoreText}>Wellness Score: {score}</Text>
//         </View>
//       ) : null}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   inputGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: 'white',
//   },
//   errorContainer: {
//     backgroundColor: '#ffebee',
//     padding: 15,
//     borderRadius: 5,
//     marginTop: 20,
//     borderWidth: 1,
//     borderColor: '#ffcdd2',
//   },
//   errorText: {
//     color: '#c62828',
//   },
//   resultContainer: {
//     backgroundColor: '#e8f5e9',
//     padding: 15,
//     borderRadius: 5,
//     marginTop: 20,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#c8e6c9',
//   },
//   scoreText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2e7d32',
//   }
// });

//chatgpt:
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const ScheduleTab = () => {
  const [formData, setFormData] = useState({
    "Sleep Duration (hrs)": '',
    "Exercise Duration (mins)": '',
    "Water Intake (glasses)": '',
    "Breastfeeding": '',
    "Baby Sleep Affected Sleep": '',
    "Feeding Frequency": '',
    "Feeding Duration (mins)": '',
    "Pain Level (0-10)": '',
    "Stress Level (1-10)": '',
    "Anxiety Level (1-10)": '',
    "Energy Morning (0-10)": '',
    "Energy Afternoon (0-10)": '',
    "Energy Night (0-10)": '',
    "Mood": ''
  });

  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateScore = async () => {
    try {
      // Convert all inputs to appropriate types
      const formattedData: any = {};
      Object.keys(formData).forEach(key => {
        const val = formData[key];
        formattedData[key] = isNaN(Number(val)) ? val : Number(val);
      });

      const response = await axios.post('http://10.21.76.241:5001/predict', formattedData);
      const { score, level, tip } = response.data;
      setResult(`Score: ${score}\nLevel: ${level}\nTip: ${tip}`);
      setError('');
    } catch (err: any) {
      setResult('');
      setError(err.response?.data?.error || 'Something went wrong');
      console.error('Error details:', err.response?.data);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.keys(formData).map((field, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.label}>{field}</Text>
          <TextInput
            style={styles.input}
            keyboardType={field.includes('Level') || field.includes('Duration') || field.includes('Intake') ? "numeric" : "default"}
            value={formData[field]}
            onChangeText={(val) => handleChange(field, val)}
          />
        </View>
      ))}
      <Button title="CALCULATE WELLNESS SCORE" onPress={calculateScore} />
      {result ? <Text style={styles.result}>{result}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  inputContainer: {
    marginBottom: 15
  },
  label: {
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginTop: 5
  },
  result: {
    marginTop: 20,
    color: 'green'
  },
  error: {
    marginTop: 20,
    color: 'red'
  }
});

export default ScheduleTab;