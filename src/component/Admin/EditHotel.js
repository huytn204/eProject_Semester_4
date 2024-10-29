import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function UpdateHotelForm() {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);
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
        // Fetch the hotel details when component loads
        const fetchHotel = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/hotels/${id}`);
                const hotel = response.data;
                setName(hotel.name);
                setAddress(hotel.address);
                setCurrentImageUrl(`http://localhost:8080/api/hotels/images/${hotel.imageUrl}`);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };
        fetchHotel();
    }, [id]);

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);

        if (image) {
            formData.append('file', image);
        }

        try {
            await axios.put(`http://localhost:8080/api/hotels/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Hotels updated successfully');
            navigate('/admin/hotel_list')
        } catch (error) {
            console.error('Error updating hotels', error);
            alert('Hotels updated error');
        }
    };

  return (
    <div className="container mt-5">
      <h2>Add Hotels</h2>
      <Link to={'/admin/hotel_list'}>All Hotels</Link>

      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Hotel Name:*</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="address" className="mb-3">
          <Form.Label>Address :*</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Image :*</Form.Label>
          {currentImageUrl && <img src={`http://localhost:8080/hotels/${currentImageUrl}`} alt="Current Hotels" width="100" />}
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

export default UpdateHotelForm;