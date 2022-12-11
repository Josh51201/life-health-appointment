import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorDetails from '../pages/DoctorDetails';
import DoctorList from '../pages/DoctorList';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Main from './Main';
import CreateAppointment from '../pages/CreateAppointment';
import DisplayAppointments from '../pages/DisplayAppointment';
import EditAppointment from '../pages/EditAppointment';

const Links = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/doctor" element={<DoctorList />} />
      <Route path="/doctor/:id" element={<DoctorDetails />} />
      <Route path="/appointment" element={<CreateAppointment />} />
      <Route path="/appointmentDisplay" element={<DisplayAppointments />} />
      <Route path="/edit" element={<EditAppointment />} />
    </Routes>
  </Router>
);

export default Links;