import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchAdminPage = async () => {
        if (!username) {
            navigate('/login'); // Redirect to login if not logged in
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8080/api/auth?username=${username}`);
            console.log(response.data); // Do something with the data
        } catch (error) {
            console.error('Error fetching admin page:', error);
            navigate('/login'); // Redirect to login on error
        }
    };

    fetchAdminPage();
}, [username, navigate]);

  useEffect(() => { 
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/hotels");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleDelete = async (hotelId) => {
    try {
      await axios.delete(`http://localhost:8080/api/hotels/delete/${hotelId}`);
      setHotels(hotels.filter((hotel) => hotel.id !== hotelId));
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };


  return (
    <div>
      <h1>Hotel List</h1>
      <a href="/admin/add_hotel">Add New Hotel</a>
      <table width="100%">
        <thead>
          <tr>
            <th>Name Hotel</th>
            <th>Address Hotel</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id}>
              <td>{hotel.name}</td>
              <td>{hotel.address}</td>
              <td>
                {hotel.imageUrl && (
                  <img src={`http://localhost:8080/hotels/${hotel.imageUrl}`} alt={hotel.name} width="100" />
                )}
              </td>
              <td>
              <button onClick={() => handleDelete(hotel.id)}>Delete</button>
              <Link to={`${hotel.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotelList;