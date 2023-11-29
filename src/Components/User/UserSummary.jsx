import '../../assets/css/summaryCard.css'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserSummary() {
    const userId = useParams().userId;
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (!user) {
            setIsLoading(true);
            axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, { withCredentials: true })
            .then(
                res => {
                    setIsLoading(false);
                    console.log(res);
                    setUser(res.data);
                }
            ).catch(error => { console.log(error) });
        }
    });
    if (isLoading) {
        return(
            <div id="body-div">
                    <div className="square-loading"></div>
            </div>
        )
    }
    if (!user) {
        return(
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
    return (
        <>
            <div id="body-div">
                <div className="form d-flex flex-column" id='bug-card'>
                    <div className='d-flex justify-content-between'>
                        <Link to='/users/list'><i className="fa-solid fa-arrow-left fa-xl text-black"></i></Link>
                    </div>
                    <div className=''>
                        <h2 className="mb-0 pb-2 display-5 text-center">{user.fullName}</h2>
                        <h3 className="pb-2 fs-5 text-center border-bottom">
                            Role{user.role.length > 1 && 's'} : {user ? user.role.map(r => r).join(', ') : 'Placeholder'}
                        </h3>
                    </div>
                    <div id='info'>
                        <div className="d-flex flex-column">
                            <p className='border-bottom fs-3 mb-0'>Account Summary</p>
                            <ul className='fs-5'>
                                <li>Member Since : {formattedDate}</li>
                            </ul>
                        </div>
                    </div>
                    <div id='btns' className='mt-auto d-flex justify-content-lg-around'>
                        <Link to={`/users/${user._id}/edit`} className='btn btn-warning w-100'>Edit</Link>
                    </div>
                </div>
            </div>
        </>
    )
}