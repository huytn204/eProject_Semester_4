import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AddHotelForm = ({ onHotelAdded }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        setImage(file);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post('http://localhost:8080/api/hotels/upload-image', formData, {
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
          await axios.post('http://localhost:8080/api/hotels', {
              name,
              address,
              imageUrl
          });
          alert('Hotels added successfully');
      } catch (error) {
          console.error('Error adding hotels', error);
      }
      navigate('/admin/hotel_list')
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
            name="name"
            placeholder="Hotel Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="address" className="mb-3">
          <Form.Label>Address :*</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
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

export default AddHotelForm;