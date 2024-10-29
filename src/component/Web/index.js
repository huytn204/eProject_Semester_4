import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import '../Style/index.scss'; // SCSS đã có sẵn
import Offers from './Offers'; // Component mới cho phần "Ongoing Offers"

const HomePage = () => {
  const [form, setForm] = useState({
    checkInDate: '',
    checkOutDate: '',
    adults: 1,
    children: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to check availability
    console.log('Form data:', form);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://themewagon.github.io/montana/img/banner/banner2.png"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First Slide</h3>
                <p>This is the first slide description.</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://themewagon.github.io/montana/img/banner/banner.png"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Second Slide</h3>
                <p>This is the second slide description.</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://themewagon.github.io/montana/img/banner/banner2.png"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Third Slide</h3>
                <p>This is the third slide description.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      {/* Phần "Ongoing Offers" */}
      <Offers />

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="checkInDate">Check-In-Date:</label>
          <input
            type="date"
            id="checkInDate"
            name="checkInDate"
            value={form.checkInDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="checkOutDate">Check-Out-Date:</label>
          <input
            type="date"
            id="checkOutDate"
            name="checkOutDate"
            value={form.checkOutDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="adults">Adults:</label>
          <select
            id="adults"
name="adults"
            value={form.adults}
            onChange={handleInputChange}
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="children">Children:</label>
          <select
            id="children"
            name="children"
            value={form.children}
            onChange={handleInputChange}
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-button">Check Availability</button>
      </form>
    </div>
  );
};

export default HomePage;