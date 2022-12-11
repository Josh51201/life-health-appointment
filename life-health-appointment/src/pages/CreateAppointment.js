import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import SideNav from '../components/SideNav';
import { bookAppointment } from '../actions/appointmentAction';
import Style from '../css/CreateAppointment.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import url from '../api/apiLink';

const CreateAppointment = () => {
    const user = useSelector((state) => state.user.user);
    const doctor = useSelector((state) => state.doctor);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = user.id;
    const doctorId = doctor.id;
    const [date, setDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const doctorName = doctor.name;

    const locations = [
        'Select location',
        'Walgreens',
        'Pheonix HealthCare Clinic',
        'Midwest Healthcare Services',
        'CVS',
        'MinuteClinic',
        'Urgent Care'
    ];

    const handleClick = (e) => {
        const { value } = e.target;
        setLocation(value);
    }

    const handleCreate = () => {
        navigate('/appointmentDisplay')
    }

    const data = { doctorId, userId, date, location }

    const createAppointment = () => {
        axios.post(`${url}/Appointments`, data)
            .then((response) => {
                dispatch(bookAppointment(response))
                handleCreate();
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createAppointment();
    }

    return (
        <section className={Style.setPage}>
            <SideNav />
            <div className={Style.formContainer}>
                <form className={Style.formBox}>
                    <input type="text" name="doctorName" value={doctorName} required />
                    <DatePicker 
                        selected={date} 
                        showTimeSelect 
                        onChange={(val) => setDate(val)} 
                        dateFormat="Pp"
                        minDate={moment().toDate()}
                    />
                    <select name="location" onChange={handleClick}>
                        {locations.map((location) => <option value={location}>{location}</option>)}
                    </select>
                    <button type="submit" className={Style.createBtn} onClick={handleSubmit}>Create Appointment</button>
                </form>
            </div>
        </section>
    )
}

export default CreateAppointment;