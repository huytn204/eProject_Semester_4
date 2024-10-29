import {React, useState, useEffect } from 'react';      
import { Link } from 'react-router-dom';
import { formatter } from "../Style/utils/formater";
import axios from 'axios';
import '../Style/RoomDetail.scss';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaWallet, FaStar } from 'react-icons/fa';
import { AiOutlineCarryOut } from "react-icons/ai";
import { MdFreeCancellation } from "react-icons/md";

const BookCanceled = () => {
    const [booking, setBooking] = useState([]);
    const [cancelledBookings, setCancelledBookings] = useState([]);

    const statuses = [
        { icon: <Link to={'/book'}><FaWallet /></Link> , label: 'Chờ xác nhận' },
        { icon: <Link to={'/Confirmed'}><AiOutlineCarryOut /></Link>, label: 'Đã xác nhận' },
        { icon: <Link to={'/Canceled'}><MdFreeCancellation /></Link>, label: 'Đã Hủy' },
        { icon: <Link to={'#'}><FaStar /></Link>, label: 'Đánh giá' }
    ];

    useEffect(() => {
        const fetchCancelledBookings = async () => {
            const response = await axios.get('http://localhost:8080/api/booking/cancelled');
            setCancelledBookings(response.data);
        };
        fetchCancelledBookings();
    }, []);
    return (
        <div className='container'>
            <Container className="mt-4">
                <h5>Đơn Đặt</h5>
                <Row>
                    {statuses.map((status, index) => (
                        <Col key={index} xs={3} className="text-center">
                            <Card className="border-0">
                                <Card.Body>
                                    <div className="icon mb-2" style={{ fontSize: '45px' }}>
                                        {status.icon}
                                    </div>
                                    <Card.Text>{status.label}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div className="mt-3">
                    <a href="#" className="text-muted">Xem lịch sử đặt phòng &gt;</a>
                </div>
            </Container>
            <div className="room-detail">
            <div>
            <h2>Cancelled Bookings</h2>
            <ul>
                {cancelledBookings.map((booking) => (
                    <li key={booking.id}>
                        Room: {booking.room.name}, Customer: {booking.customerName}, 
                        Check-in: {booking.checkInDate}, Check-out: {booking.checkOutDate}
                    </li>
                ))}
            </ul>
        </div>
            </div>
        </div>
    );
};

export default BookCanceled;


