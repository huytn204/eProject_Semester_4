import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { formatter } from "../Style/utils/formater";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

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
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleDelete = async (roomId) => {
    try {
      await axios.delete(`http://localhost:8080/api/rooms/${roomId}`);
      setRooms(rooms.filter((room) => room.id !== roomId));
    } catch (error) {
      console.error("Error deleting room:", error);
    }
    alert('Room delete successfully');
  };

  const handleStatusChange = async (id, newStatus) => {
    await axios.put(`http://localhost:8080/api/rooms/${id}/status`, {
        status: newStatus,
    });
    fetchRooms(); // Refresh list
};

  return (
    <div>
      <h1>Rooms List</h1>
      <Link to={'/admin/add_rooms'}>Add New Rooms</Link>
      <table width="100%">
        <thead>
          <tr>
            <th>Hotel Name</th>
            <th>Room Type</th>
            <th>Image</th>
            <th>Room Price</th>
            <th>Introduce</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>                       
          {rooms.map((room) => (
            <tr key={room.id}>

              <td>{room.hotel.name}</td>

              <td>{room.name}</td>

              <td>
                {room.imageUrl && (
                  <img src={`http://localhost:8080/rooms/${room.imageUrl}`} alt={room.name} width="100" />
                )}
              </td>

              <td>{formatter(room.price)}</td>

              <td style={{ width: '400px'}}>{room.introduce}</td>

              <td>
                  <button onClick={() => handleStatusChange(room.id, room.status === 'Available' ? 'Booked' : 'Available')}>
                  {room.status}
                   </button>
              </td>
              
              <td>
              <Link variant="primary" to={`${room.id}`}>Edit</Link>
              <button onClick={() => handleDelete(room.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomList;