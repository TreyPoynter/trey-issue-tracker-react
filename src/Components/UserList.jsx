import '../assets/css/bugList.css'
import User from './UserListItem'
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/users/list`, { withCredentials: true })
            .then(
                res => {
                    setUsers(res.data)
                }
            ).catch(error => {
                console.log(error)
            });
    });
    return (
        <>
            <div id="content">
            </div>
            <h3 className='text-center display-1'>User List</h3>
            <ul className="list-group container mt-5" id="bug-list">
            {users.length < 1 ? <h3>No results...</h3> : 
                     users.map(user => {
                        return(
                            <User key={user._id} user={user} />
                        )
                        
                     })}
            </ul>
        </>
    )
}