import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { displayDoctors, filterDoctors } from '../actions/doctorAction';
import Doctor from '../components/Doctor';
import DoctorFilter from '../components/DoctorFilter';
import Style from '../css/DoctorList.module.css';
import { useNavigate } from 'react-router-dom';
import url from '../api/apiLink';

const DoctorList = () => {
    const doctors = useSelector((state) => state.allDoctors.doctors);
    const filter = useSelector((state) => state.filter);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchDoctors = () => {
        axios.get(`${url}/Doctor`)
            .then((response) => {
                const docList = response.data;
                dispatch(displayDoctors(docList));
            })
            .catch(() => {console.log("Failed to fetch doctors")});
    }

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleFilter = (filter) => {
        dispatch(filterDoctors(filter));
    }

    const handleLogout = () => {
        localStorage.setItem('user', JSON.stringify({ username: 'Guest' }));
        navigate('/');
    }

    const handleAppoint = () => {
        navigate('/appointmentDisplay');
    }

    const filteredDoctors = () => {
        if (filter === 'All') return doctors;
        return doctors.filter((doctor) => doctor.specialty === filter);
    }

    return (
        <>
            <div className={Style.container}>
                <DoctorFilter 
                    handleFilter={handleFilter}
                    handleLogout={handleLogout}
                    handleAppoint={handleAppoint}
                />
                <div>
                    <div className={Style.setUsername}>
                        <h3>
                            {`${user.username}`}
                        </h3>
                    </div>
                    <div className={Style.textCenter}>
                        <h1 className={Style.noMargin}>Choose Experienced Doctor</h1>
                        <p className={Style.greyText}>Consultants with many years of experience</p>
                    </div>
                    <div className={Style.displayDoctors}>
                        {filteredDoctors().map((doctor) => (
                            <Doctor key={doctor.id} doctor={doctor} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoctorList;