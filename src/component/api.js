import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getAllRooms = async () => {
    return axios.get(`${API_URL}/rooms`);
};

export const addBooking = async (booking) => {
    return axios.post(`${API_URL}/booking`, booking);
};