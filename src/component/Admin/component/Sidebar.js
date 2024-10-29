import React from 'react';
import './Sidebar.scss';
import { FaHome, FaUser, FaChartBar, FaTable, FaCalendarAlt, FaHotel  } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>CREATIVE TIM</h2>
        <div className="profile">
          <img src="https://via.placeholder.com/50" alt="Profile" />
          <h3>Tania Andrew</h3>
        </div>
      </div>
      <ul className="sidebar-menu">

        <li><FaChartBar />
          <Link to={"/admin"}>BOOKED</Link>
        </li>

        <li><FaHome />
          <Link to={"/admin/hotel_list"}>Hotel</Link>
        </li>

        <li><FaHotel />
        <Link to={"/admin/rooms_list"}>Rooms</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;