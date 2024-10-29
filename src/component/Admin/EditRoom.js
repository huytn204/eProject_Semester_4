import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function UpdateRoomForm() {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');
    const [introduce, setIntroduce] = useState('');
    const [image, setImage] = useState(null);
    const [hotelId, setHotelId] = useState('');
    const [hotels, setHotels] = useState([]);
    const [currentImageUrl, setCurrentImageUrl] = useState('');

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
        // Fetch the room details when component loads
        const fetchRoom = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/rooms/${id}`);
                const room = response.data;
                setName(room.name);
                setPrice(room.price);
                setStatus(room.status);
                setIntroduce(room.introduce);
                setHotelId(room.hotel.id);
                setCurrentImageUrl(`http://localhost:8080/api/rooms/images/${room.imageUrl}`);
            } catch (error) {
                console.error('Error fetching room:', error);
            }
        };

        const fetchHotels = async () => {
            const response = await axios.get('http://localhost:8080/api/hotels');
            setHotels(response.data);
        };

        fetchRoom();
        fetchHotels();
    }, [id]);

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('status', status);
        formData.append('introduce', introduce);
        formData.append('hotelId', hotelId);

        if (image) {
            formData.append('file', image);
        }

        try {
            await axios.put(`http://localhost:8080/api/rooms/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Room updated successfully');
            navigate('/admin/rooms_list')
        } catch (error) {
            console.error('Error updating room', error);
        }
    };
  return (
    <div className="container mt-5">
      <h2>Update Rooms</h2>
      <Link to={'/admin/rooms_list'}>All Rooms</Link>

      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Room Type:*</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
          />
        </Form.Group>

        <Form.Group controlId="price" className="mb-3">
          <Form.Label>Room Price:*</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="status" className="mb-3">
          <Form.Label>Status :*</Form.Label>
          <Form.Control as="select" name="status" onChange={(e) => setStatus(e.target.value)}>
            <option value={status}>{status}</option>
            <option value="available">Available</option>
            <option value="Booked">Booked</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formMessage" className="mb-3">
          <Form.Label>Introduce:*</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="introduce"
            value={introduce}
            onChange={(e) => setIntroduce(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Image :*</Form.Label>
          {currentImageUrl  && <img src={`http://localhost:8080/rooms/${currentImageUrl }`} alt="Current Hotels" width="100" />}
          <Form.Control
            type="file"
            name="image"
            onChange={handleImageUpload}
          />
        </Form.Group> 

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UpdateRoomForm;