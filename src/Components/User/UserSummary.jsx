import '../../assets/css/summaryCard.css'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CalendarChart from '../CalendarChart';

export default function UserSummary() {
    const navigate = useNavigate();
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    const userId = useParams().userId;
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isViewingProductivity, setViewingProductivity] = useState(false);
    
    useEffect(() => {
        setIsLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, { withCredentials: true })
            .then(
                res => {
                    setIsLoading(false);
                    console.log(res);
                    setUser(res.data);
                }
            ).catch(error => { console.log(error) });
    }, []);
    if (isLoading) {
        return (
            <div id="body-div">
                <div className="square-loading"></div>
            </div>
        )
    }
    if (!user) {
        return (
            <div className="mt-5" id="body-div">
                <div className="centered-form">
                    <h3>User not Found</h3>
                </div>
            </div>
        );
    }
    const dateCreated = new Date(user.creationDate);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[dateCreated.getMonth()];
    const day = dateCreated.getDate();
    const year = dateCreated.getFullYear();
    const formattedDate = month + ' ' + day + ', ' + year;
    const goBack = () => {
        navigate(-1);
    };
    const setNotViewing =() => {
        setViewingProductivity(false);
    }
    return (
        <div id="body-div">
            {isViewingProductivity &&
            <CalendarChart userId={user._id} setNotViewing={setNotViewing}/>}
            <div className="form d-flex flex-column">
                <div className='d-flex justify-content-between'>
                    <Link onClick={() => goBack()}><i className="fa-solid fa-arrow-left fa-xl text-black"></i></Link>
                </div>
                <div className='text-center'>
                    <h2 className="mb-0 pb-2 display-5">{user.fullName}</h2>
                    <h3 className="pb-2 fs-5 border-bottom">
                        Role{user.role.length > 1 && 's'}: {user ? user.role.map(r => r).join(', ') : 'Placeholder'}
                    </h3>
                </div>
                <div id='info' className="mt-3">
                    <div className="d-flex flex-column">
                        <p className='border-bottom fs-4 mb-0'>Account Summary :</p>
                        <ul className='fs-5 list-group'>
                            <li id='email' className='list-group-item'>Email: {user.email}</li>
                            <li id='member-since' className='list-group-item'>Member Since: {formattedDate}</li>
                        </ul>
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    
                </div>
                
                {loggedUser &&
                    (loggedUser.role.includes('technical manager') ||
                        user._id === loggedUser._id) &&
                    <div id='' className='mt-auto d-flex flex-column align-items-center justify-content-center'>
                        <button onClick={() => setViewingProductivity(!isViewingProductivity)} 
                        className='btn btn-secondary w-75 mb-2'>Show Productivity</button>
                        <Link to={`/users/${user._id}/edit`} className='btn btn-edit w-75'>Edit</Link>
                    </div>
                }
            </div>
        </div>

    )
}