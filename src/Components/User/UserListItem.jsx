/* eslint-disable */
import { Link } from "react-router-dom"

export default function User({ user }) {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    function formatDate(dateCreated) {
		const date = new Date(dateCreated);

		const formattedDate = date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});
		return formattedDate;
	}
    return (
        <div className="col-lg-4 col-md-6 mb-3 d-flex justify-content-center">
			<Link className="text-decoration-none" to={`/users/${user._id}`}>
				<div className="info-card d-flex flex-column pt-2">
					<div className="info-card-image d-flex justify-content-center align-items-center">
						<i class="fa-solid fa-user"></i>
					</div>
					<p className="info-card-title">{user.fullName}</p>
					<div className="flex-grow-1"></div> {/* This div will push the info-footers to the bottom */}
					<div className="d-flex flex-column justify-content-end align-items-end">
						<p className="info-footer"><i class="fa-solid fa-scroll"></i> Roles : {user.role.join(', ')}<span className="by-name">
							</span>
						</p>
						<p className="info-footer"><i class="fa-regular fa-clock"></i> Joined <span className="by-name">
							</span> on <span className="by-name">{formatDate(user.creationDate)}</span>
						</p>
					</div>
				</div>
			</Link>
		</div>
    )
}