import '../assets/css/nav.css'
import '../assets/js/nav.js'
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <nav id='navbar' className="navbar bg-body-tertiary d-flex" style={{ position: 'fixed', top: 0, width: '100%' }}>
                <div className="container-fluid d-flex justify-content-between" id='nav-container'>
                    <button onClick={() => {
                            document.getElementById('navbarNav').classList.add('slide-in-left');
                        }} id='nav-btn' className="navbar-toggler justify-content-end d-flex"
                        type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a id='nav-brand' className="display-6 ms-5" href="#">Issue-Tracker</a>
                    <div id='nav-user' className="w-10 justify-content-around d-flex">
                        <a href="#">Register</a>
                        <a href="#">Login</a>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul id='nav-list' className="navbar-nav">
                            <div id="navbar-row" className="row">
                                <div className='w-50 d-flex flex-column align-items-center'>
                                    <h3 className='text-center border-bottom border-black w-50 pb-2'>Users</h3>
                                    <div className='text-center  d-flex flex-column align-items-center justify-content-center'>
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="#">Show all Users</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Edit a User</a>
                                        </li>
                                    </div>
                                </div>
                                <div className='w-50 d-flex flex-column align-items-center'>
                                    <h3 className='text-center border-bottom border-black w-50 pb-2'>Bugs</h3>
                                    <div className='text-center d-flex flex-column align-items-center justify-content-center'>
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="#">Show all Bugs</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Edit a Bug</a>
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