import '../assets/css/loginForm.css'
import { Link } from 'react-router-dom';

export default function RegisterForm() {
    function handleBtnAnimation(evt) {
        var btn = document.getElementById(evt.target.id);
        if (!btn.classList.contains('jello-horizontal')) {
            btn.classList.add('jello-horizontal');

            setTimeout(function () {
                btn.classList.remove('jello-horizontal');
            }, 1000);
        }
    }
    return (
        <>
            <div id="body-div">
                <div className="centered-form">
                    <h2 className="mb-3">Register</h2>
                    <form action="" >
                        <div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="txtFullName" className="form-label">Full Name</label>
                                <input placeholder="John Doe" type="text" className="form-control" id="txtFullName" />
                            </div>
                            <div className=' mb-3 d-flex justify-content-between'>
                                <div className="d-flex flex-column align-items-start w-47">
                                    <label htmlFor="txtGivenName" className="form-label">Given Name</label>
                                    <input placeholder="John" type="text" className="form-control" id="txtGivenName" aria-describedby="emailHelp" />
                                </div>
                                <div className="d-flex flex-column align-items-start w-47">
                                    <label htmlFor="txtFamilyName" className="form-label">Family Name</label>
                                    <input placeholder="Doe" type="text" className="form-control" id="txtFamilyName" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="txtEmail" className="form-label">Email</label>
                                <input placeholder="jdoe@example.com" type="email" className="form-control" id="txtEmail" />
                            </div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="txtPass" className="form-label">Password</label>
                                <input placeholder="Please enter password" type="password" className="form-control" id="txtPass" />
                            </div>
                            <button onClick={(e) => handleBtnAnimation(e)}
                                type="button" id='btnRegister' className="btn btn-primary w-75 mb-3">Click to Register</button>
                        </div>
                    </form>
                    <p className="mb-0 register-now">Already have an account? <Link to='/login'>Login</Link></p>
                </div>
            </div>
        </>
    )
}