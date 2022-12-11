import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { loadAppointments, selectedAppointment } from '../actions/appointmentAction';
import BookNav from '../components/BookNav';
import Style from '../css/DisplayAppoint.module.css';
import { useNavigate } from 'react-router-dom';
import url from '../api/apiLink';

const DisplayAppointments = () => {
    const user = useSelector((state) => state.user.user);
    const appointments = useSelector((state) => state.appointments.appointments);
    const [doctors, setDoctors] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userAppointments, setUserAppointments] = useState([]);

    const getAppointments = () => {
      axios.get(`${url}/Appointments`)
        .then((response) => {
          const list = response.data;
          dispatch(loadAppointments(list));
          setUserAppointments(appointments.filter((app) => app.userId === user.id));
        })
      axios.get(`${url}/Doctor`)
        .then((response) => {
          setDoctors(response.data)
        })
    }

    const deleteAppoint = (e) => {
      const { id } = e.target;
      axios.delete(`${url}/Appointments/${id}`)
        .then((response) => {
          if (response.data) {
            navigate('/doctor')
            navigate('/appointmentDisplay');
          }
        })
    }

    const handleEdit = (e) => {
      const { id } = e.target;
      userAppointments.forEach((x) => {
        const val = (x.id).toString();
        if (val === id) {
          dispatch(selectedAppointment(x));
        }
      })
      navigate('/edit')
    }

    useEffect(() => {
      getAppointments();
    }, [userAppointments])


    return (
        <section className={Style.setPage}>
      <BookNav />
      <div className={Style.listBox}>
        {userAppointments.length === 0 && <div className={Style.setInfo}>
          {
            <div>
              <h3>No Appointment Booked</h3>
            </div>
          }
        </div>}
        {userAppointments.length !== 0 && <div>
          <h2 className={`${Style.font} ${Style.smallFont}`}>My Booked Appointment</h2>
          <div className={`${Style.rowHead} ${Style.font}`}>
            <div>Doctor Name</div>
            <div>Appointment Date</div>
            <div className={Style.city}>Location</div>
            <div>Actions</div>
          </div>
          { userAppointments.map((data) => (
            <div key={data.id} className={Style.itemBox}>
              <div className={`${Style.data} ${Style.docName}`}>{
                doctors.map((doctor) => {
                  if (doctor.id === data.doctorId) {
                    return doctor.name
                  }
                })
              }</div>
              <div className={`${Style.data} ${Style.dataDate}`}>
                {new Date(data.date)
                  .toLocaleDateString()}
              </div>
              <div className={`${Style.data} ${Style.alignRight} ${Style.alignCol}`}>{data.location}</div>
              <div className={Style.setActionBtn}>
                <button type="button"  id={data.id} style={{ backgroundColor: '#E60B2F'}} onClick={deleteAppoint}>Delete</button>
                <button type="button" id={data.id} style={{ backgroundColor: '#1885F2' }} onClick={handleEdit}>Edit</button>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </section>
    )
};

export default DisplayAppointments;