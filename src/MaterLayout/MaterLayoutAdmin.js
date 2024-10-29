
import { Outlet } from 'react-router-dom';
import React from 'react';
import Sidebar from 'component/Admin/component/Sidebar';
import AdminNavbar from 'component/Admin/component/AdminNavbar ';

const MasterLayoutAdmin = () => {
  return (

    <div >
      <AdminNavbar /> 
      <div className="row">
        <div className='col-sm-2'>
          <Sidebar/>  
        </div>
        <div className="col-lg-10">
          <main><Outlet /></main>
        </div>
      </div>
    </div>
  );
}

export default MasterLayoutAdmin;