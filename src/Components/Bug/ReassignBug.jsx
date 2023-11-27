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
                                <div key={user._id} className="col-lg-3 col-md-6 mb-3">
                                    <div className="justify-content-center mb-4 text-decoration-none card p-1">
                                        <Link onClick={(e) => { handleReassigning(user._id, e) }} to={`/users/${user._id}`}
                                            className="text-black text-decoration-none">
                                            <div className="text-decoration-none">
                                                <h3 className="text-center fs-5">{user.fullName}</h3>
                                            </div>
                                            <div className="card-body text-center">
                                                <i className={`fas mb-2 fa-solid fa-5x fa-user`}></i>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </>
    )
}