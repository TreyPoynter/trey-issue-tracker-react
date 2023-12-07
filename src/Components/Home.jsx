/* eslint-disable */
import '../assets/css/home.css'
import { Link } from 'react-router-dom'

export default function Home({ user }) {
    function displayGreeting() {
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 12) {
            return `Good Morning, ${user.givenName}`;
        } else if (hour >= 12 && hour < 18) {
            return `Good Afternoon, ${user.givenName}`;
        } else {
            return `Good Evening, ${user.givenName}`;
        }
    }
    return (
        <>
            <div className=''>
                <section className="jumbotron" id='home'>
                    <div className="pe=0 container">
                        <div id='jumbotron-content' className="row mt-5 d-flex align-items-center">
                            <div className='slide-in-left col-8 d-flex justify-content-center flex-column'>
                                <h1 id='header-slogan' >
                                    Navigate, Collaborate, Conquer: <br />
                                    Bugs, Consider Yourself <span className=''>Warned.</span>
                                </h1>
                                {
                                    user ? (
                                        <p className='display-1 fw-bold'>
                                            {displayGreeting()}
                                        </p>) :
                                        <p className='display-2 fw-bold'>
                                            <Link to='/login' className='link-light'>Login</Link> or <Link to='/register'
                                                className='link-light'>Register</Link> today!
                                        </p>
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}