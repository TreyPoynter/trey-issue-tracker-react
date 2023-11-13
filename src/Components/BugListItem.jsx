import { Link } from "react-router-dom"

export default function Bug({ title, classification }) {
    return (
        <>
            <li className="list-group-item">
                <Link to='/bugs/bug' className="d-flex justify-content-between align-items-center text-decoration-none text-black">
                    <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle text-success fa-sm pt-2"></i>
                        <p className="ms-3 mb-0">{title}</p>
                    </div>
                    <div className="d-flex w-17 justify-content-between">
                        <div className="justify-content-end d-flex">
                            <p className="mb-0">Classification :</p>
                        </div>
                        <div className="justify-content-start d-flex">
                            <p className="mb-0">{classification}</p>
                        </div>
                    </div>
                </Link>
            </li>



        </>
    )
}