import {React, useState, useEffect } from 'react';      
import { useParams, Link } from 'react-router-dom';
import { formatter } from "../Style/utils/formater";
import axios from 'axios';
import { FaLocationDot, FaRegCircleUser } from "react-icons/fa6";
import '../Style/RoomDetail.scss';
import { FaStar } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';

const RoomDetailPage = ({ stars }) => {
    const { id } = useParams(); // Lấy ID từ URL
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [introduce, setIntroduce] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [status, setStatus] = useState('');

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(0);

    const maxStars = 5; // Số sao tối đa

    const handleClick = (value) => {
      setNewRating(value);
  };

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
      fetchComments();
  }, [id]);

  const fetchComments = async () => {
    const response = await axios.get(`http://localhost:8080/api/comments/room/${id}`);
    setComments(response.data);
};

useEffect(() => { 
  fetchRooms();
}, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/rooms/available/top3");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };


    //get roombyId
  useEffect(() => {
    if (id) {
      fetchRoomById(id); // Gọi hàm lấy sản phẩm theo ID khi component được tải
    }
  }, [id]);

  const handleCommentSubmit = async () => {
    const comment = {
        username: "Anonymous", // or use authenticated user's name
        commentText: newComment,
        stars: newRating,
        room: { id: id }
    };

    await axios.post('http://localhost:8080/api/comments', comment);
    fetchComments();
    setNewComment("");
};
  

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

    return (
        <div className="room-detail">
            {/* Tiêu đề và địa chỉ khách sạn */}
            <h1 className="hotel-name">{name}</h1>
            <div className="hotel-address"><FaLocationDot /> {address}</div>

            {/* Thư viện hình ảnh */}
            <div className='ctn_flex'>
                <div className="image-gallery">
                    <img src={`http://localhost:8080/rooms/${imageUrl}`} alt="Phòng khách sạn" className="gallery-img" />
                </div>
                <div className="hotel-description">
                    <h2>Giới thiệu</h2>
                    <p>{introduce}</p>
                    <b>{formatter(price)}</b><span style={{ marginLeft: '400px'}}>Giá 1 Đêm</span>

                    <Link to={`/booking/${id}`} className="book-now-btn">Book Now</Link>
                </div>
            </div>

            {/* Danh sách tiện nghi */}
            <div className="amenities-list">
                <h2>Danh sách tiện nghi</h2>
                <ul>
                    <li>Ô tô cho thuê</li>
                    <li>Dịch vụ taxi</li>
                    <li>Bãi đỗ xe có nhân viên</li>
                    <li>Accessible by elevator</li>
                    <li>Điều hòa</li>
                </ul>
            </div>

            {/* Đánh Giá Và Bình Luận */}
            <div className="amenities-list">
              <h2>Đánh Giá & Bình Luận</h2>
                {comments.map((comment, index) => (
                  <p key={index}><strong><FaRegCircleUser size={20} /> {comment.username}:</strong> {comment.commentText}<br />
                {[...Array(maxStars)].map((_, index) => (
                <FaStar
                  color={index < comment.stars ? '#ffc107' : '#e4e5e9'}
                  />
                ))}
                </p>
                ))}
              <div className="contact-form">
                <Form onSubmit={handleCommentSubmit}>
                  <label>Stars:
                    {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleClick(star)}
                      style={{
                        color: star <= newRating ? '#ffc107' : '#e4e5e9',
                        fontSize: '24px',
                        cursor: 'pointer',
                      }}
                      onChange={(e) => setNewRating(e.target.value)} >
                      <FaStar />
                    </span>
                    ))}
                  </label>
                  <Form.Group controlId="formMessage" className="mb-3">
                    <Form.Label>Message:*</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        placeholder="Message...."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Send
                  </Button>
                </Form>
              </div>
            </div>

            {/* Danh sách gợi ý phòng */}
            <div className="room-suggestions">
                <h2>Gợi ý phòng</h2>
                {rooms.map((room) => (
                <div className="room-card">
                    <div className="room-image">
                        <Link to={`/rooms/${room.id}`}>
                        <img src={`http://localhost:8080/rooms/${room.imageUrl}`} alt="Room 1" />
                        </Link>
                    </div>
                    <div className="room-info">
                        <h3>{room.name}</h3>
                        <ul className="room-services">
                            <li>WiFi miễn phí</li>
                            <li>Diện tích: 29m²</li>
                            <li>Loại giường: 2 giường đơn</li>
                        </ul>
                        <div className="room-price">
                            <span>gia mot dem</span>
                            <p>{formatter(room.price)}</p>
                            <Link to={`/booking/${room.id}`} className="add-to-cart">Book Now </Link>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};

export default RoomDetailPage;


