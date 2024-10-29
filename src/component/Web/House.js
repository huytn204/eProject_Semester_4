import {React, useState, useEffect} from 'react';
import '../Style/Offers.scss'; // Import SCSS chung đã có
import axios from "axios";
import { Link } from "react-router-dom";
import { formatter } from "../Style/utils/formater";
import { FaLocationDot } from "react-icons/fa6";

const HousePage = () =>{
  const [hotels, setHotels] = useState([]);

  useEffect(() => { 
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/hotels");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching Hotels:", error);
    }
  };
  return (
    
    <div className="offers-container">
      <h2>Ongoing House</h2>
      
      <div className="offers-list">
        {hotels.map((hotel) => (
        <div className="offer-card mt-4">
          <Link to={'/list_hotel_room'}>
          <img style={{ width: '340px', height: '210px' }}
            src={`http://localhost:8080/hotels/${hotel.imageUrl}`}
            alt="Offer 1"
          />
          </Link>
          <h3>{hotel.name}</h3>
          <h6><FaLocationDot /> {hotel.address}</h6>
          <ul>
            <li>WiFi miễn phí</li>
            <li>Diện tích: 29m²</li>
            <li>Loại giường: 2 giường đơn</li>
          </ul>
        </div>
        ))}

      </div>
    </div>
  );
  };
  export default HousePage;