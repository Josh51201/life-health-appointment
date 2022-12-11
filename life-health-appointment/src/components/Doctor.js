import React from "react";
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Style from '../css/Doctor.module.css';

const Doctor = (props) => {
    const { doctor } = props;
    const key = doctor.id;

    return (
        <div>
            <div key={key}>
                <Link to={`/doctor/${key}`} className={Style.setLink}>
                    <div className={Style.docImageBox}>
                        <img src={doctor.picture} className={Style.img} />
                    </div>
                    <div className={Style.centerName}>
                        <h3 className={Style.noMargin} data-testid="name">{doctor.name}</h3>
                    </div>
                </Link>
                <div className={Style.setLine}>
                    <span>------------------</span>
                </div>
                <div className={Style.alignLocation}>
                    <h5 className={`${Style.noMargin} ${Style.text}`}>{doctor.specialty}</h5>
                    <h5 className={`${Style.noMargin} ${Style.text}`}>{doctor.location}</h5>
                    <div className={Style.socialHandle}>
                        <a href="https://" className={Style.socialColor}>
                            <FaFacebook />
                        </a>
                        <a href="https://" className={Style.socialColor}>
                            <FaTwitter />
                        </a>
                        <a href="https://" className={Style.socialColor}>
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Doctor;