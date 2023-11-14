import '../assets/css/summaryCard.css'
import { Link } from 'react-router-dom'

export default function UserSummary({ name, role }) {
    return (
        <>
            <div id="body-div">
                <div className="form d-flex flex-column" id='bug-card'>
                    <div className='d-flex justify-content-between'>
                        <Link to='/users'><i className="fa-solid fa-arrow-left fa-xl text-black"></i></Link>
                    </div>
                    <div className=''>
                        <h2 className="mb-0 pb-2 display-5 text-center">USER</h2>
                        <h3 className="pb-2 fs-5 text-center border-bottom">Role : developer</h3>
                    </div>
                    <div id='info'>
                        <div className="d-flex flex-column">
                            <p className='border-bottom fs-3 mb-0'>Account Summary</p>
                            <ul className='fs-5'>
                                <li>Bugs Created : 2</li>
                                <li>Comments made : 7</li>
                                <li>Member Since : 2/6/2023</li>
                            </ul>
                        </div>
                    </div>
                    <div id='btns' className='mt-auto d-flex justify-content-lg-around'>
                        <Link to='/users/user/edit' className='btn btn-warning w-100'>Edit</Link>
                    </div>
                </div>
            </div>
        </>
    )
}