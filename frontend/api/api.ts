import axios from 'axios';

// Use a configurable base URL
const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Book a babysitter with additional details
export const bookBabysitter = async (
  momId: string,
  babysitterId: string,
  date: string,
  time: string,
  familyName: string,
  numberOfChildren: number,
  address: string,
  specialInstructions?: string
) => {
  try {
    const response = await axios.post(`${API_URL}/book`, {
      momId,
      babysitterId,
      date,
      time,
      familyName,
      numberOfChildren,
      address,
      specialInstructions,
    });

    console.log('Booking Successful:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Booking failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to book babysitter');
  }
};

// Add rating and review
export const rateBooking = async (bookingId: string, rating: number, review: string) => {
  try {
    const response = await axios.post(`${API_URL}/rate/${bookingId}`, {
      rating,
      review,
    });

    console.log('Rating Successful:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Rating failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to rate booking');
  }
};

// Get babysitter's booking requests
export const getBabysitterBookings = async (babysitterId: string) => {
  try {
    const response = await axios.get(`${API_URL}/babysitter/${babysitterId}`);

    console.log('Bookings fetched:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Fetching bookings failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch bookings');
  }
};

// Accept or reject booking
export const updateBookingStatus = async (bookingId: string, status: string) => {
  try {
    const response = await axios.put(`${API_URL}/update/${bookingId}`, { status });

    console.log('Booking status updated:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Updating booking status failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to update booking status');
  }
};

export default {
  bookBabysitter,
  rateBooking,
  getBabysitterBookings,
  updateBookingStatus,
};