import {React, useState, useEffect} from 'react';
import '../Style/Offers.scss'; // Import SCSS chung đã có
import axios from "axios";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { formatter } from "../Style/utils/formater"

const RoomPage = () =>{
  const [rooms, setRooms] = useState([]);

  useEffect(() => { 
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/rooms/available");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };
  return (
    <div className="offers-container">
      <h2>Ongoing Rooms</h2>
      <div className="offers-list">
        {rooms.map((room) => (
        <div className="offer-card mt-4">
          <Link to={`/rooms/${room.id}`}>
          <img style={{ width: '340px', height: '210px' }}
            src={`http://localhost:8080/rooms/${room.imageUrl}`}
            alt="Offer 1"
          />
          </Link>
          <h3>{room.name}</h3>
          <ul>
            <li><FaLocationDot /> {room.hotel.address}</li>
            <li>giá 1 đêm</li>
            <li>{formatter(room.price)}</li>
            <li>{room.introduce}</li>
          </ul>
          {/* <button onClick={() => onSelectRoom(room)}>Book</button> */}
          <Link to={`/booking/${room.id}`} className="book-now">Book Now</Link>
        </div>
        ))}

      </div>
    </div>
  );
  };
  export default RoomPage;