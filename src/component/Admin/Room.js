import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AddRoomForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');
    const [introduce, setIntroduce] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [hotelId, setHotelId] = useState('');
    const [hotels, setHotels] = useState([]);

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
        // Fetch hotels when component loads
        const fetchHotels = async () => {
            const response = await axios.get('http://localhost:8080/api/hotels');
            setHotels(response.data);
        };
        fetchHotels();
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        setImage(file);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post('http://localhost:8080/api/rooms/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setImageUrl(response.data); // The server returns the file name or URL
        } catch (error) {
            console.error('Error uploading image', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/rooms', {
                name,
                price,
                status,
                introduce,
                imageUrl,
                hotel: { id: hotelId }
            });
            alert('Room added successfully');
        } catch (error) {
            console.error('Error adding room', error);
        }
      navigate('/admin/rooms_list');
    };


  return (
    <div className="container mt-5">
      <h2>Add Rooms</h2>
      <Link to={'/admin/rooms_list'}>All Rooms</Link>

      <Form onSubmit={handleSubmit}>
        
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Room Name :*</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Room Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPrice" className="mb-3">
          <Form.Label>Room Price:*</Form.Label>
          <Form.Control
            type="number"
            name="price"
            placeholder="Room Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formStatus" className="mb-3">
          <Form.Label>Status:*</Form.Label>
          <Form.Control as="select" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
          </Form.Control>
        </Form.Group>
    
        <Form.Group controlId="formMessage" className="mb-3">
          <Form.Label>Introduce:*</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="introduce"
            placeholder="Introduce"
            value={introduce}
            onChange={(e) => setIntroduce(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formStatus" className="mb-3">
          <Form.Label>Select Hotel:*</Form.Label>
          <Form.Control as="select" name="hotelId" value={hotelId} onChange={(e) => setHotelId(e.target.value)} >
              <option value="">Select a hotel * </option>
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Image :*</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleImageUpload}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddRoomForm;