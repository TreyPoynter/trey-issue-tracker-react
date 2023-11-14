import '../assets/css/loginForm.css'
import { Link } from 'react-router-dom';

export default function EditBug() {
    const steps = ['Do this', 'Do that', 'Under there'];

    return (
        <>
            <div id="body-div">
                <div className="centered-form">
                    <div className='d-flex justify-content-between'>
                        <Link to='/bugs/bug'><i className="fa-solid fa-arrow-left fa-xl text-black"></i></Link>
                    </div>
                    <h2 className="mb-3">Edit Bug</h2>
                    <form action="">
                        <div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="txtTitle" className="form-label mb-0">Title</label>
                                <input placeholder="Enter bug title" type="text" className="form-control" id="txtTitle" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="txtDesc" className="form-label mb-0">Description</label>
                                <input placeholder="Enter bug description" type="text" className="form-control" id="txtDesc" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="txtClass" className="form-label mb-0">Classification</label>
                                <input placeholder="Enter bug classification" type="text" className="form-control" id="txtClass" />
                            </div>
                            {/* STEPS TO COMPLETE */}
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="step0" className="form-label mb-0">Steps to Complete</label>
                                <ul className='w-100'>
                                    {steps.map((step, index) => (
                                        <li key={index}>
                                            <input placeholder={step} type="text" className="form-control w-100" id={`step${index}`} />
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link to='/bugs/bug' id='btnSave' className="btn btn-success w-75 mb-3">Save</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}