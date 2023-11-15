/* eslint-disable */
import { Link } from "react-router-dom"

export default function Bug({ title, classification, isClosed }) {
    return (
        <>
            <Link to='/bugs/bug' className="col-md-3 col-sm-12 d-flex justify-content-center mb-4 text-decoration-none">
                <div className="folder-card">
                    <div className={isClosed ? "top-section closed" : "top-section open"}>
                        <div className="folder-border"></div>
                        <div className="icons">
                        </div>
                    </div>
                    <div className="bottom-section">
                        <span className="title">BUG</span>
                        <div className="row row1">
                            <div className="item">
                                <span className="big-text">2626</span>
                                <span className="regular-text">BUG</span>
                            </div>
                            <div className="item">
                                <span className="big-text">2626</span>
                                <span className="regular-text">BUG</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>



        </>
    )
}