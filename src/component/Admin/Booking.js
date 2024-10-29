import React, { useState, useEffect} from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { formatter } from "../Style/utils/formater";

const BookingPage = () =>{
  const [booking, setBooking] = useState([]);
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
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/booking");
      setBooking(response.data);
    } catch (error) {
      console.error("Error fetching Booking:", error);
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:8080/api/booking/${bookingId}`);
      setBooking(book.filter((book) => book.id !== bookingId));
    } catch (error) {
      console.error("Error deleting bookings:", error);
    }
    alert('delete booking success')
  };

  const handleStatusChange = async (id, newStatus) => {
    await axios.put(`http://localhost:8080/api/booking/${id}/status`, {
        status: newStatus,
    });
    fetchBooking(); // Refresh list
};

  return (
    <div>
      <h1>Booking List</h1>
      <table width="100%">
        <thead>
          <tr>
            <th>Room Type</th>
            <th>Room Price</th>
            <th>Customer Name</th>
            <th>CheckInDate</th>
            <th>checkOutDate</th>
            <th>TotalPrice</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>                       
          {booking.map((book) => (
            <tr key={book.id}>
              <td>{book.room.name}</td>

              <td>{formatter(book.room.price)}</td>

              <td>{book.customerName}</td>

              <td>{book.checkInDate}</td>

              <td>{book.checkOutDate}</td>
              <td>{formatter(book.totalPrice)}</td>

              <td>
                  <button onClick={() => handleStatusChange(book.id, book.status === 'Pending' ? 'Confirmed' : 'Pending')}>
                  {book.status}
                   </button>
              </td>
              
              <td>
              <button onClick={() => handleDelete(book.id)}>Delete</button>
              <Link variant="primary" to={`bookingdetailadmin/${book.id}`}>Detail</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
  export default BookingPage;