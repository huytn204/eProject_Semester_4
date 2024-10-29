import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import './component/Style/Home.css';

import AddHotelForm from 'component/Admin/Hotel';
import AddRoomForm from 'component/Admin/Room';
import HotelList from 'component/Admin/HotelList';
import RoomList from 'component/Admin/RoomList';
import HomePage from 'component/Web';
import LoginPage from 'component/Web/Login';
import MasterLayout from 'MaterLayout/MaterLayout';
import Register from 'component/Web/Register';
import RoomPage from 'component/Web/Rooms';
import HousePage from 'component/Web/House';
import BookedPage from 'component/Web/Booked';
import ContactPage from 'component/Web/Contact';
import MasterLayoutAdmin from 'MaterLayout/MaterLayoutAdmin';
import UpdateHotelForm from 'component/Admin/EditHotel';
import UpdateRoomForm from 'component/Admin/EditRoom';
import BookingForm from 'component/Admin/Booking';
import BookingWebPage from 'component/Web/Booking';
import RoomDetailPage from 'component/Web/RoomDetail';
import BookByRoom from 'component/Web/BookAll';
import BookConfirmed from 'component/Web/ConfirmedBooking';
import BookCanceled from 'component/Web/CanceledBooking';
import BookingDetail from 'component/Web/BookingDetail';
import BookingDetailAdmin from 'component/Admin/BookingDetailAdmin';

function App() {
  return (
    <Router>
          <Routes>
            {/* Page Routes */}
            <Route path="*" element={<MasterLayout>
              <Routes>
                  {/* Add pages here which will be wrapped in the master layout */}
                  <Route path="/" element={<HomePage />} /> 
                  <Route path="/rooms" element={<RoomPage />} />
                  <Route path="/houses" element={<HousePage />} />
                  <Route path="/booked" element={<BookedPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/rooms/:id" element={<RoomDetailPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/booking/:id" element={<BookingWebPage />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/book" element={<BookByRoom />} />
                  <Route path="/confirmed" element={<BookConfirmed />} />
                  <Route path="/Canceled" element={<BookCanceled />} />
                  <Route path="/bookingdetail/:id" element={<BookingDetail />} />
                  {/* Add other routes within the layout */}
                </Routes>
            </MasterLayout>} />
              
            {/* Admin Routes */}
            <Route path="/admin" element={< MasterLayoutAdmin />} >
              <Route index element={<BookingForm />} />
              <Route path="/admin/add_hotel" element={<AddHotelForm />} />
              <Route path="/admin/add_rooms" element={<AddRoomForm />} />
              <Route path="/admin/hotel_list" element={<HotelList />} />
              <Route path="/admin/rooms_list" element={<RoomList />} />
              <Route path="/admin/hotel_list/:id" element={<UpdateHotelForm />} />
              <Route path="/admin/rooms_list/:id" element={<UpdateRoomForm />} />
              <Route path="/admin/bookingdetailadmin/:id" element={<BookingDetailAdmin />} />
            </Route>
            
            
          
          </Routes>
    </Router>
  );
}

export default App;
