import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRouter } from 'expo-router';

type RootStackParamList = {
  BabySitterDashboard: undefined;
  Availability: undefined;
  BookingRequests: undefined;
  BabysitterReviews: undefined;
  Profile: undefined;
  EmergencyProtocolsScreen: undefined;
  SettingScreen: undefined;
  HelpScreen: undefined;
  PaymentCenter: undefined;
  BookingStatus: { bookingId: string };
  BabysitterReviewReport: undefined;
};

type BabySitterDashboardNavigationProp = StackNavigationProp<RootStackParamList, 'BabySitterDashboard'>;

type Booking = {
  id: string;
  familyName: string;
  initials: string;
  avatarColor: string;
  textColor: string;
  date: string;
  time: string;
  children: string;
  status: string;
  location: string;
};

type Review = {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  textColor: string;
  date: string;
  rating: number;
  text: string;
};

const BabySitterDashboard = () => {
  const router = useRouter(); 
  const navigation = useNavigation<BabySitterDashboardNavigationProp>();
  const isFocused = useIsFocused();
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [recentReviews, setRecentReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const navigateTo = (screen: string, params?: any) => {
    router.push({ pathname: `/(tabs)/components/babysitter/${screen}`, params });
  };

  const fetchBookings = async () => {
    const mockBookings: Booking[] = [
      {
        id: '1',
        familyName: 'Robinson Family',
        initials: 'JR',
        avatarColor: '#fce7f3',
        textColor: '#ec4899',
        date: 'Today, June 15',
        time: '6:00 PM - 9:00 PM',
        children: '2 children (ages 3 and 5)',
        status: 'Confirmed',
        location: '1234 Park Avenue'
      },
      {
        id: '2',
        familyName: 'Thompson Family',
        initials: 'MT',
        avatarColor: '#dbeafe',
        textColor: '#3b82f6',
        date: 'Tomorrow, June 16',
        time: '3:00 PM - 6:00 PM',
        children: '1 child (age 4)',
        status: 'Confirmed',
        location: '5678 Lake Street'
      }
    ];
    return mockBookings;
  };

  const fetchReviews = async () => {
    const mockReviews: Review[] = [
      {
        id: '1',
        name: 'Emma Thompson',
        initials: 'ET',
        avatarColor: '#fce7f3',
        textColor: '#ec4899',
        date: '2 days ago',
        rating: 5,
        text: 'Jessica was wonderful with our kids! Very attentive and engaging. We will definitely book her again.'
      },
      {
        id: '2',
        name: 'Michael Roberts',
        initials: 'MR',
        avatarColor: '#dbeafe',
        textColor: '#3b82f6',
        date: '1 week ago',
        rating: 5,
        text: 'Jessica is amazing! She took great care of our children and we felt very comfortable leaving them with her.'
      }
    ];
    return mockReviews;
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [bookings, reviews] = await Promise.all([
          fetchBookings(),
          fetchReviews()
        ]);
        setUpcomingBookings(bookings);
        setRecentReviews(reviews);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#7e22ce" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>BabySitter</Text>
          <View style={styles.navContainer}>
            <TouchableOpacity 
              style={[styles.navItem, styles.activeNavItem]}
              onPress={() => navigateTo('BabySitterDashboard')}
            >
              <Text style={[styles.navText, styles.activeNavText]}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.navItem}
              onPress={() => navigateTo('Availability')}
            >
              <Text style={styles.navText}>Availability</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.navItem}
              onPress={() => navigateTo('BookingRequests')}
            >
              <Text style={styles.navText}>Bookings</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.navItem}
              onPress={() => navigateTo('BabysitterReviews')}
            >
              <Text style={styles.navText}>Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.navItem}
              onPress={() => navigateTo('Profile')}
            >
              <Text style={styles.navText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.navItem}
              onPress={() => navigateTo('EmergencyProtocolsScreen')}
            >
              <Text style={styles.navText}>Emergency Protocols</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.navItem}
              onPress={() => navigateTo('SettingScreen')}
            >
              <Text style={styles.navText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.navItem}
              onPress={() => navigateTo('HelpScreen')}
            >
              <Text style={styles.navText}>Help</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.switchButton}
            onPress={() => console.log('Switch to Parent')}
          >
            <Text style={styles.switchButtonText}>Switch to Parent</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo('Profile')}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JS</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Welcome Section */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>Welcome back, Jessica!</Text>
            <Text style={styles.welcomeSubtitle}>
              You have {upcomingBookings.length} upcoming {upcomingBookings.length === 1 ? 'booking' : 'bookings'} this week
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.availabilityButton}
            onPress={() => navigateTo('Availability')}
          >
            <Text style={styles.availabilityButtonText}>Update Availability</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {/* Earnings Card */}
          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => navigateTo('PaymentCenter')}
          >
            <View style={[styles.statIcon, { backgroundColor: '#f3e8ff' }]}>
              <MaterialIcons name="attach-money" size={24} color="#7e22ce" />
            </View>
            <Text style={styles.statLabel}>This Month Earnings</Text>
            <Text style={styles.statValue}>$1,235.00</Text>
            <View style={styles.statFooter}>
              <Text style={styles.statLink}>View all</Text>
              <MaterialIcons name="chevron-right" size={20} color="#7e22ce" />
            </View>
          </TouchableOpacity>

          {/* Bookings Card */}
          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => navigateTo('BookingRequests')}
          >
            <View style={[styles.statIcon, { backgroundColor: '#dbeafe' }]}>
              <FontAwesome name="users" size={20} color="#2563eb" />
            </View>
            <Text style={styles.statLabel}>Total Bookings</Text>
            <Text style={styles.statValue}>12</Text>
            <View style={styles.statFooter}>
              <Text style={styles.statLink}>View all</Text>
              <MaterialIcons name="chevron-right" size={20} color="#2563eb" />
            </View>
          </TouchableOpacity>

          {/* Jobs Card */}
          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => navigateTo('BookingStatus', { bookingId: '1' })}
          >
            <View style={[styles.statIcon, { backgroundColor: '#dcfce7' }]}>
              <MaterialIcons name="date-range" size={20} color="#16a34a" />
            </View>
            <Text style={styles.statLabel}>Upcoming Jobs</Text>
            <Text style={styles.statValue}>{upcomingBookings.length}</Text>
            <View style={styles.statFooter}>
              <Text style={styles.statLink}>View schedule</Text>
              <MaterialIcons name="chevron-right" size={20} color="#16a34a" />
            </View>
          </TouchableOpacity>

          {/* Rating Card */}
          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => navigateTo('BabysitterReviewReport')}
          >
            <View style={[styles.statIcon, { backgroundColor: '#fef9c3' }]}>
              <FontAwesome name="star" size={20} color="#ca8a04" />
            </View>
            <Text style={styles.statLabel}>Ratings</Text>
            <Text style={styles.statValue}>
              {recentReviews.length > 0 ? 
                (recentReviews.reduce((sum, review) => sum + review.rating, 0) / recentReviews.length).toFixed(1) : 
                '0.0'}
            </Text>
            <View style={styles.statFooter}>
              <Text style={styles.statLink}>View Ratings</Text>
              <MaterialIcons name="chevron-right" size={20} color="#ca8a04" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Upcoming Bookings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
            <TouchableOpacity onPress={() => navigateTo('BookingRequests')}>
              <Text style={styles.sectionLink}>View all</Text>
            </TouchableOpacity>
          </View>
          
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking) => (
              <TouchableOpacity 
                key={booking.id} 
                style={styles.bookingCard}
                onPress={() => navigateTo('BookingStatus', { bookingId: booking.id })}
              >
                <View style={styles.bookingHeader}>
                  <View style={[styles.bookingAvatar, { backgroundColor: booking.avatarColor }]}>
                    <Text style={[styles.bookingAvatarText, { color: booking.textColor }]}>{booking.initials}</Text>
                  </View>
                  <View style={styles.bookingInfo}>
                    <Text style={styles.bookingFamily}>{booking.familyName}</Text>
                    <Text style={styles.bookingTime}>{booking.date} • {booking.time}</Text>
                    <Text style={styles.bookingDetails}>{booking.children}</Text>
                  </View>
                  <View style={styles.bookingStatusContainer}>
                    <Text style={[styles.bookingStatus, 
                      { color: booking.status === 'Confirmed' ? '#16a34a' : '#d97706' }]}>
                      {booking.status}
                    </Text>
                  </View>
                </View>
                <View style={styles.bookingFooter}>
                  <View style={styles.locationContainer}>
                    <MaterialIcons name="location-on" size={16} color="#6b7280" />
                    <Text style={styles.bookingLocation}>{booking.location}</Text>
                  </View>
                  <View style={styles.bookingActions}>
                    <TouchableOpacity 
                      style={styles.messageButton}
                      onPress={() => navigateTo('HelpScreen')}
                    >
                      <MaterialIcons name="message" size={20} color="#4b5563" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={48} color="#9ca3af" />
              <Text style={styles.emptyStateText}>No upcoming bookings</Text>
              <Text style={styles.emptyStateSubtext}>Update your availability to get more bookings</Text>
              <TouchableOpacity 
                style={styles.emptyStateButton}
                onPress={() => navigateTo('Availability')}
              >
                <Text style={styles.emptyStateButtonText}>Update Availability</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Recent Reviews */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Reviews</Text>
            <TouchableOpacity onPress={() => navigateTo('BabysitterReviews')}>
              <Text style={styles.sectionLink}>View all</Text>
            </TouchableOpacity>
          </View>
          
          {recentReviews.length > 0 ? (
            recentReviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={[styles.reviewAvatar, { backgroundColor: review.avatarColor }]}>
                    <Text style={[styles.reviewAvatarText, { color: review.textColor }]}>{review.initials}</Text>
                  </View>
                  <View style={styles.reviewInfo}>
                    <Text style={styles.reviewName}>{review.name}</Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    {[...Array(5)].map((_, i) => (
                      <FontAwesome 
                        key={i} 
                        name="star" 
                        size={16} 
                        color={i < review.rating ? '#f59e0b' : '#d1d5db'} 
                      />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewText}>{review.text}</Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="star-outline" size={48} color="#9ca3af" />
              <Text style={styles.emptyStateText}>No reviews yet</Text>
              <Text style={styles.emptyStateSubtext}>Your reviews will appear here</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7e22ce',
    marginRight: 24,
  },
  navContainer: {
    flexDirection: 'row',
  },
  navItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  activeNavItem: {
    backgroundColor: '#f3e8ff',
  },
  navText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500',
  },
  activeNavText: {
    color: '#7e22ce',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchButton: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 12,
    backgroundColor: '#f9fafb',
  },
  switchButtonText: {
    color: '#4b5563',
    fontSize: 14,
    fontWeight: '500',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e9d5ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#7e22ce',
    fontWeight: 'bold',
    fontSize: 14,
  },
  welcomeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  availabilityButton: {
    backgroundColor: '#7e22ce',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginLeft: 12,
  },
  availabilityButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  statFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statLink: {
    fontSize: 14,
    color: '#7e22ce',
    fontWeight: '500',
    marginRight: 4,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  sectionLink: {
    fontSize: 14,
    color: '#7e22ce',
    fontWeight: '500',
  },
  bookingCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  bookingHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bookingAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bookingAvatarText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingFamily: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  bookingTime: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 4,
  },
  bookingDetails: {
    fontSize: 14,
    color: '#6b7280',
  },
  bookingStatusContainer: {
    alignSelf: 'flex-start',
  },
  bookingStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingLocation: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  bookingActions: {
    flexDirection: 'row',
  },
  messageButton: {
    padding: 6,
    marginLeft: 8,
  },
  reviewCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewAvatarText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 14,
    color: '#9ca3af',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#4b5563',
    marginTop: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
    textAlign: 'center',
  },
  emptyStateButton: {
    backgroundColor: '#7e22ce',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  emptyStateButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default BabySitterDashboard;