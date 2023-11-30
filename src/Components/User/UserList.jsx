import '../../assets/css/bugList.css'
import User from './UserListItem'
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function UserList() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/users/list`, { withCredentials: true })
            .then(
                res => {
                    setUsers(res.data)
                }
            ).catch(error => {
                console.log(error)
            }).finally(() => setIsLoading(false));
    });
    if (isLoading) {
        return(
            <div id="body-div">
                <div className="square-loading"></div>
            </div>
        )
    }
    return (
        <>
            <div id="content">
            </div>
            <h3 className='text-center display-1 mb-4'>User List</h3>
            <div className='container'>
                <div className='row d-flex justify-content-start'>
                    {users.length < 1 ? <h3>No results...</h3> :
                        users.map(user => {
                            return (
                                <User isDisabled={false} key={user._id} user={user} />
                            )

                        })}
                </div>
            </div>
        </>
    )
}