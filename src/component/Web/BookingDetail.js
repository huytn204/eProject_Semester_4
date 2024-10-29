import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import '../Style/BookingDetail.css'; // Import any custom styles you want to use
import { formatter } from "../Style/utils/formater";

const BookingDetail = () => {
    const { id } = useParams();
    const [customerName, setCustomerName] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [status, setStatus] = useState('');
    const [massage, setMassage] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');

    //get roombyId
  useEffect(() => {
    if (id) {
      fetchBookingById(id); // Gọi hàm lấy sản phẩm theo ID khi component được tải
    }
  }, [id]);

    const fetchBookingById = async (bookingId) => {
        const result = await axios.get(`http://localhost:8080/api/booking/${bookingId}`);
        const booking = result.data;
        setCustomerName(booking.customerName);
        setCheckInDate(booking.checkInDate);
        setCheckOutDate(booking.checkOutDate);
        setTotalPrice(booking.totalPrice);
        setRoom(booking.room.name);
        setStatus(booking.status); 
        setMassage(booking.message); 
      };


      const handleCancelBooking = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/booking/cancel/${id}`);
            setMessage(`Booking with ID ${response.data.id} has been cancelled.`);
        } catch (error) {
            setMessage('Error cancelling booking. Please check the ID and try again.');
        }
    };
    return (
        <Container className="mt-5">
            <h2 className="mb-4">Booking Details</h2>
            <Card>
                <Card.Header as="h5">{room}</Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item><strong>Full Name:</strong> {customerName}</ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Check-in Date:</strong> {new Date(checkInDate).toLocaleDateString()}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Check-out Date:</strong> {new Date(checkOutDate).toLocaleDateString()}
                        </ListGroup.Item>
                        <ListGroup.Item><strong>Total Price:</strong> $ {formatter(totalPrice)}</ListGroup.Item>
                        <ListGroup.Item><strong>Message:</strong> {massage}</ListGroup.Item>
                        <ListGroup.Item><strong>Status:</strong> {status}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary" onClick={handleCancelBooking}>Cancel Booking</Button>
                    <p>{message}</p>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default BookingDetail;