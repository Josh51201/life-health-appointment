import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Style from '../css/CreateAppointment.module.css';
import url from '../api/apiLink';
import SideNav from "../components/SideNav";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditAppointment = () => {
    /* eslint-disable camelcase */
    const appointment = useSelector((state) => state.appointments.appointment);
    let {
        id,
        doctorId,
        userId,
        location,
        date
    } = appointment;
    const [dt, setDt] = useState(new Date());
    const [loc, setLoc] = useState(location);
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);

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
        setLoc(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editAppointment(id)
    }

    useEffect(() => {
        axios.get(`${url}/Doctor`)
        .then((response) => {
          setDoctors(response.data)
        })
    })

    const data = { id, doctorId, userId, dt, loc }

    const editAppointment = (id) => {
        date = dt;
        location = loc;
        const data = { id, doctorId, userId, date, location}
        axios.put(`${url}/Appointments/${id}`, data)
            .then((response) => {
                navigate('/appointmentDisplay');
            })
    }

    return (
        <section className={Style.setPage}>
            <SideNav />
            <div className={Style.formContainer}>
                <form className={Style.formBox}>
                    <input type="text" name="doctor_name" value={doctors.map((doctor) => {
                        if (doctor.id === data.doctorId) {
                            return doctor.name
                        }
                        })} required />
                    <DatePicker 
                        selected={dt} 
                        showTimeSelect 
                        onChange={(val) => setDt(val)} 
                        dateFormat="Pp"
                        minDate={moment().toDate()}
                    />
                    <select name="location" id="select" value={loc} onChange={handleClick}>
                        {locations.map((city) => <option value={city} key={city}>{city}</option>)}
                    </select>
                    <button type="submit" className={Style.createBtn} onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </section>
    )
};

export default EditAppointment;