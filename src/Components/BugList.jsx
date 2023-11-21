import '../assets/css/bugList.css'
import Bug from './BugListItem'
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function BugList() {

    const [bugs, setBugs] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/list`, { withCredentials: true })
            .then(
                res => {
                    setBugs(res.data)
                }
            ).catch(error => {
                console.log(error)
            });
    });
    return (
        <>
            <div id="content">
            </div>
            <h3 className='text-center display-1 mb-4'>Bug List</h3>
            <div className='container'>
                <div className='row d-flex justify-content-start'>
                    {bugs.length < 1 ? <h3>No results...</h3> : 
                     bugs.map(bug => {
                        return(
                            <Bug key={bug._id} bug={bug} />
                        )
                        
                     })}
                </div>
            </div>
        </>
    )
}