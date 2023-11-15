/* eslint-disable */
import '../assets/css/home.css'
import LootBug from '../assets/images/Golden_LootBug.png'
import { Link } from 'react-router-dom'

export default function Home({ user }) {
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
                                            Hello, {user.givenName}
                                        </p>) :
                                        <p className='display-2 fw-bold'>
                                            <Link to='/login' className='link-light'>Login</Link> or <Link to='/register'
                                                className='link-light'>Register</Link> today!
                                        </p>
                                }
                            </div>
                            <div className='col-4 d-flex justify-content-center '>
                                <img id='bug-img' src={LootBug} alt="" height={250} />
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </>
    )
}