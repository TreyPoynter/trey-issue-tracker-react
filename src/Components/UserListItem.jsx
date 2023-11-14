/* eslint-disable */
import { Link } from "react-router-dom"

export default function User({ name, role }) {
    return (
        <>
            <li className="list-group-item">
                <Link to='/users/user' className="d-flex justify-content-between align-items-center text-decoration-none text-black">
                    <div className="d-flex align-items-center">
                        <i className="fa-solid fa-user fa-sm pt-2"></i>
                        <p className="ms-3 mb-0">{name}</p>
                    </div>
                    <div className="d-flex w-17 justify-content-between">
                        <div className="justify-content-end d-flex">
                            <p className="mb-0">Role :</p>
                        </div>
                        <div className="justify-content-start d-flex">
                            <p className="mb-0">{role}</p>
                        </div>
                    </div>
                </Link>
            </li>



        </>
    )
}