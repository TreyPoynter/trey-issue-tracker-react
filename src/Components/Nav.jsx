import '../assets/css/nav.css'
import '../assets/js/nav.js'
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <nav id='navbar' className="navbar bg-body-tertiary d-flex" style={{ position: 'fixed', top: 0, width: '100%' }}>
                <div className="container-fluid d-flex w-100" id='nav-container'>
                    <div className='w-10'>
                    <button onClick={() => {
                        document.getElementById('navbarNav').classList.add('slide-in-left');
                    }} id='nav-btn' className="navbar-toggler justify-content-end d-flex"
                        type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    </div>
                    
                    <div className="w-50 d-flex justify-content-center text-center">
                        <a id='nav-brand' className="display-6" href="#">Issue-Tracker</a>
                    </div>
                    <div id='nav-user' className="w-10 justify-content-around d-flex">
                        <Link to='register'>Register</Link>
                        <Link to='login'>Login</Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul id='nav-list' className="navbar-nav">
                            <div id="navbar-row" className="row">
                                <div className='w-50 d-flex flex-column align-items-center'>
                                    <h3 className='text-center border-bottom border-black w-50 pb-2'>Users</h3>
                                    <div className='text-center  d-flex flex-column align-items-center justify-content-center'>
                                        <li className="nav-item">
                                            <Link to='users' className="nav-link active">Show all Users</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='users/edit' className="nav-link active">Edit a User</Link>
                                        </li>
                                    </div>
                                </div>
                                <div className='w-50 d-flex flex-column align-items-center'>
                                    <h3 className='text-center border-bottom border-black w-50 pb-2'>Bugs</h3>
                                    <div className='text-center d-flex flex-column align-items-center justify-content-center'>
                                        <li className="nav-item">
                                            <Link to='bugs' className="nav-link active">Show all Bugs</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='bugs/edit' className="nav-link active">Edit a Bug</Link>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}