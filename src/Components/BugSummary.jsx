import '../assets/css/bugSummary.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import BugList from './BugList';

export default function BugSummary() {
    const [isClosed, setIsClosed] = useState(false);
    function handleExitAnimation() {
        document.getElementById('bug-card').classList.add('slide-out-elliptic-top-bck');
        setTimeout(() => {
            window.location.href= '/bugs'
        }, 750);
    }
    return (
        <>
            <div id="body-div">
                <div className="bug-form d-flex flex-column" id='bug-card'>
                    <div className='d-flex justify-content-between'>
                        <Link to='/bugs'><i className="fa-solid fa-arrow-left fa-xl text-black"></i></Link>
                        <button onClick={() => isClosed ? setIsClosed(false) : setIsClosed(true)} className={isClosed ? 'closed' : 'open'}></button>
                    </div>
                    <div className=''>
                        <h2 className="mb-0 pb-2 display-5 text-center">MY SUPER BUG</h2>
                        <h3 className="mb-0 pb-2 fs-5 text-center">Classification : unclassified</h3>
                        <h2 className="border-bottom pb-2 fs-5 text-center">This will show the bug description</h2>
                    </div>
                    <div id='info'>
                        <div className="d-flex flex-column" id='created-info'>
                            <p className='border-bottom fs-3 mb-0'>Created Info</p>
                            <ul>
                                <li>Created By - John Doe</li>
                                <li>Created On - 11/13/2023</li>
                                <li>Created By - John Doe</li>
                            </ul>
                        </div>
                        <div className="d-flex flex-column" id='assignment-info'>
                            <p className='border-bottom fs-3 mb-0'>Assigned Info</p>
                            <ul>
                                <li>Assigned To - John Doe</li>
                                <li>Assigned On - 11/13/2023</li>
                                <li>Last Assignment Change - 11/13/2023</li>
                            </ul>
                        </div>
                    </div>


                    <div id='btns' className='mt-auto sticky-bottom d-flex justify-content-lg-around'> {/* Use mt-auto to push the buttons to the bottom */}
                        <button onClick={() => handleExitAnimation()} className='btn btn-danger w-40 mr-2'>Delete</button>
                        <button className='btn btn-warning w-40'>Edit</button>
                    </div>
                </div>
            </div>


        </>
    )
}