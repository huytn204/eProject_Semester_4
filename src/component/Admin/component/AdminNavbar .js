import {React, useState} from 'react';
import { Navbar, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { FaSearch, FaBell, FaUserCircle, FaBars } from 'react-icons/fa';
import { BsGlobe } from 'react-icons/bs';
import axios from "axios";  

const AdminNavbar = () => {
  const [keyword, setKeyword] = useState('');
  const [hotels, setHotels] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/hotels/search?keyword=${keyword}`);
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };


  return (
    <Navbar bg="primary" expand="lg" className="px-3">
      <Navbar.Brand href="#home" className="text-white">
        <FaBars className="me-2" />
        JASSA
      </Navbar.Brand>

      {/* Thanh tìm kiếm */}
      <Form className="d-flex mx-auto" style={{ maxWidth: '400px' }}>
        <FormControl
          type="search"
          value={keyword} 
          placeholder="Search..."
          className="me-2"
          aria-label="Search"
          onChange={(e) => setKeyword(e.target.value)} 
        />
        <Button variant="light" onClick={handleSearch}>
          <FaSearch />
        </Button>
      </Form>

      <Nav className="ms-auto d-flex align-items-center">
        {/* Dropdown ngôn ngữ */}
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic" className="text-white">
            <BsGlobe className="me-1" /> English
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">English</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Vietnamese</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Nút fullscreen */}
        <Button variant="primary" className="text-white mx-3">
          <i className="fas fa-expand-arrows-alt"></i>
        </Button>

        {/* Icon thông báo */}
        <Nav.Link href="#notifications" className="text-white position-relative">
          <FaBell />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </Nav.Link>

        {/* Avatar người dùng */}
        <Nav.Link href="#profile" className="text-white">
          <FaUserCircle size={30} />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default AdminNavbar;