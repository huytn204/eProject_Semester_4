import {React, useState, useEffect } from 'react';        
import { Card, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { formatter } from "../Style/utils/formater";
import axios from 'axios';
import { addBooking } from '../api';
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const BookingWebPage = () =>{
  const navigate = useNavigate();
    const { id } = useParams(); // Lấy ID từ URL
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');
    const [introduce, setIntroduce] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [address, setAddress] = useState('');

  const [formData, setFormData] = useState({
    customerName: '',
    checkInDate: '',
    checkOutDate: '',
    status: 'Pending',
    message: '',
    room: { id: id },
    totalPrice: ''
  });

  const today = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại ở định dạng YYYY-MM-DD

  useEffect(() => {
    calculateTotalPrice();
  }, [formData.checkInDate, formData.checkOutDate]);

  const calculateTotalPrice = () => {
    const { checkInDate, checkOutDate } = formData;
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const days = (end - start) / (1000 * 60 * 60 * 24);
      if (days > 0) {
        setFormData((prevData) => ({
          ...prevData,
          totalPrice: days * price,
        }));
      } else {
        setFormData((prevData) => ({ ...prevData, totalPrice: 0 }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, totalPrice: 0 }));
    }
  };

  //get roombyId
  useEffect(() => {
    if (id) {
      fetchRoomById(id); // Gọi hàm lấy sản phẩm theo ID khi component được tải
    }
  }, [id]);
  

  const fetchRoomById = async (roomId) => {
    const result = await axios.get(`http://localhost:8080/api/rooms/${roomId}`);
    const room = result.data;
    setName(room.name);
    setPrice(room.price);
    setStatus(room.status);
    setIntroduce(room.introduce);
    setAddress(room.hotel.address);
    setImageUrl(room.imageUrl); // Hiển thị ảnh hiện tại
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
    e.preventDefault();
    addBooking(formData).then(response => {
        console.log("Booking Successful", response.data);
    });
    alert("Booking Room Successful")
    navigate('/book')
};

    return (
      <div className="contact-container">

        <Card style={{ width: '30rem', marginLeft: '7rem' }}>
          <Card.Img style={{ width: '90%', marginLeft: '25px', marginTop: '25px'}} variant="top" src={`http://localhost:8080/rooms/${imageUrl}`} />
          <Card.Body style={{ width: '90%', marginLeft: '25px', }}>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              <div style={{ marginTop: '20px'}}>
                Price: {formatter(price)} <span style={{ marginLeft: '150px'}}>Giá 1 Đêm</span> <br />
              </div>
              <div style={{ marginTop: '20px'}}>
              < FaLocationDot /> {address}
              </div>
              <div style={{ marginTop: '20px'}}>
                Description: {introduce }
              </div>
            </Card.Text>
          </Card.Body>
        </Card>

        <div className="contact-form">
          <h2>Booking Form :</h2>
          <p>Required fields are followed by *</p>
          <Form onSubmit={handleSubmit}>
        
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Full Name :*</Form.Label>
              <Form.Control
                type="text"
                name="customerName"
                placeholder="Full Name"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCheckInDate" className="mb-3">
              <Form.Label>Check In Date:*</Form.Label>
              <Form.Control
                type="date"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                min={today} // Không cho phép chọn ngày trước ngày hôm nay
                required
              />
            </Form.Group>

            <Form.Group controlId="formCheckOutDate" className="mb-3">
              <Form.Label>Check Out Date:*</Form.Label>
              <Form.Control
                type="date"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleChange}
                min={formData.checkInDate || today} // Không cho phép chọn ngày trước ngày check-in
                required
              />
            </Form.Group>

            <Form.Group controlId="formCheckOutDate" className="mb-3">
              <Form.Label>TotalPrice:*</Form.Label>
              <Form.Control
                type="number"
                name="totalPrice"
                value={formData.totalPrice}
                onChange={handleChange}
                readOnly
              />
            </Form.Group>
        
            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Label>Message:*</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                placeholder="Message...."
                value={formData.message}
                onChange={handleChange}
              />
            </Form.Group>


            <Button variant="primary" type="submit">
              Confirm Booking
            </Button>
          </Form>
        </div>

    </div>
    );
  };
  export default BookingWebPage;