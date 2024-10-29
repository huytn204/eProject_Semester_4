import {React, useState, useEffect } from 'react';      
import { Link } from 'react-router-dom';
import { formatter } from "../Style/utils/formater";
import axios from 'axios';
import '../Style/RoomDetail.scss';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaWallet, FaStar } from 'react-icons/fa';
import { AiOutlineCarryOut } from "react-icons/ai";
import { MdFreeCancellation } from "react-icons/md";

const BookConfirmed = () => {
    const [booking, setBooking] = useState([]);
    const statuses = [
        { icon: <Link to={'/book'}><FaWallet /></Link> , label: 'Chờ xác nhận' },
        { icon: <Link to={'/Confirmed'}><AiOutlineCarryOut /></Link>, label: 'Đã xác nhận' },
        { icon: <Link to={'/Canceled'}><MdFreeCancellation /></Link>, label: 'Đã Hủy' },
        { icon: <Link to={'#'}><FaStar /></Link>, label: 'Đánh giá' }
    ];

    useEffect(() => { 
        fetchBooking();
    }, []);

    const fetchBooking = async () => {
        try {
        const response = await axios.get("http://localhost:8080/api/booking/confirmed");
        setBooking(response.data);
        } catch (error) {
        console.error("Error fetching rooms:", error);
        }
    };
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
                {/* Danh sách gợi ý phòng */}
                <div className="room-suggestions">
                    <h2>Booking Confirmed</h2>
                    {booking.map((book) => (
                    <div className="room-card">
                        <div className="room-image">
                            <img src={`http://localhost:8080/rooms/${book.room.imageUrl}`} alt="Room 1" />
                        </div>
                        <div className="room-info">
                            <h3>{book.room.name}</h3>
                            <ul className="room-services">
                                <li>WiFi miễn phí</li>
                                <li>Diện tích: 29m²</li>
                                <li>Loại giường: 2 giường đơn</li>
                            </ul>
                            <div className="room-price">
                                <span>TotalPrice</span>
                                <p>{formatter(book.totalPrice)}</p>
                            </div>
                            <div className="room-price">
                                <Link to={'/detail'}>Detail</Link>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookConfirmed;


