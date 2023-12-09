/*eslint-disable */
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ReassignBug({ showSuccess }) {
    const navigate = useNavigate();
    const bugId = useParams().bugId;
    const [bug, setBug] = useState(null);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                //? First Axios request to get bug data
                const bugResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}`,
                    { withCredentials: true });
                setBug(bugResponse.data);

                //? Second Axios request to get user list
                const usersResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/list`,
                    { withCredentials: true });
                setUsers(usersResponse.data);
            } catch (error) {
                const resError = error?.response?.data;
                console.log(resError);
            }
        };
        fetchData();
    }, [bugId]);

    function handleReassigning(assignedUserId, evt) {
        console.log(`User Id : ${assignedUserId}\nBug Id : ${bugId}`);
        evt.preventDefault();
        axios.put(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}/assign`, {
            assignedUserId
        }, {
            withCredentials: true
        }).then(res => {
            showSuccess(`Successfully Assigned Bug`);
            console.log(res);
            navigate('/bugs/list');
        }).catch(error => {
            const resError = error?.response?.data;
            console.log(resError);
        });
    }

    return (
        <>
            <div id="content">
            </div>
            <h3 className='text-center display-1 mb-4'>Select a User to Reassign</h3>
            <div className='container'>
                <div className='row d-flex justify-content-start'>
                    {users.length < 1 ? <h3>No results...</h3> :
                        users.map((user) => {
                            return (
                                <div className="col-lg-4 col-md-6 mb-3">
                                    <Link className="text-decoration-none" to={`/users/${user._id}`}>
                                        <div className="info-card reassign d-flex flex-column pt-2">
                                            <div className="info-card-image d-flex justify-content-center align-items-center">
                                                <i class="fa-solid fa-user"></i>
                                            </div>
                                            <p className="info-card-title">{user.fullName}</p>
                                            <div className="flex-grow-1"></div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                </div>
            </div>
        </>
    )
}