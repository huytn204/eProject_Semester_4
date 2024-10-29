import axios from 'axios';

const API_URL = 'http://localhost:8080/api/bookings';

export const createBooking = (bookingData) => {
  return axios.post(`${API_URL}/create`, bookingData);
};

export const getBookingsByRoom = (roomId) => {
  return axios.get(`${API_URL}/room/${roomId}`);
};

export const getBookingsByUser = (userId) => {
  return axios.get(`${API_URL}/user/${userId}`);
};
