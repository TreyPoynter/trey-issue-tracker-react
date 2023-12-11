/* eslint-disable */
import { Link, NavLink } from "react-router-dom"
import '../../assets/css/infoCard.css'
import { useState } from "react";

export default function BugListItem({ bug }) {
	const user = JSON.parse(localStorage.getItem('user'));
	function timeElapsedAgo(dateObject) {
		const currentTimestamp = Math.floor(Date.now() / 1000);
		const timestamp = Math.floor(dateObject.getTime() / 1000);
		const timeDifference = currentTimestamp - timestamp;

		if (timeDifference < 60) {
			return `${timeDifference} seconds ago`;
		} else if (timeDifference < 3600) {
			const minutes = Math.floor(timeDifference / 60);
			return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
		} else if (timeDifference < 86400) {
			const hours = Math.floor(timeDifference / 3600);
			return `${hours} hour${hours > 1 ? 's' : ''} ago`;
		} else if (timeDifference < 2592000) {
			const days = Math.floor(timeDifference / 86400);
			return `${days} day${days > 1 ? 's' : ''} ago`;
		} else if (timeDifference < 31536000) {
			const months = Math.floor(timeDifference / 2592000);
			return `${months} month${months > 1 ? 's' : ''} ago`;
		} else {
			const years = Math.floor(timeDifference / 31536000);
			return `${years} year${years > 1 ? 's' : ''} ago`;
		}
	}
	return (
		<div className="col-lg-4 col-md-6 mb-3 d-flex justify-content-center">
			<Link className="text-decoration-none" to={`/bugs/${bug._id}`}>
				<div className="info-card d-flex flex-column pt-2">
					<div className="d-flex justify-content-between mb-2">
						<i className={`badge bg-${bug.classification.classifiedAs == 'approved' ? 'success' :
							bug.classification.classifiedAs == 'unapproved' || bug.classification.classifiedAs == 'duplicate'
								? 'danger' : 'warning'}`}>{bug.classification.classifiedAs}
						</i>
						<i className={`badge bg-${!bug.closedInfo.closed ? 'success ' : 'danger'}`}>
							{!bug.closedInfo.closed ? 'open' : 'closed'}
						</i>
					</div>
					<div className="info-card-image d-flex justify-content-center align-items-center">
						<i class="fa-solid fa-spider"></i>
					</div>
					<p className="info-card-title">{bug.title}</p>
					<div className="flex-grow-1"></div> {/* This div will push the info-footers to the bottom */}
					<div className="d-flex flex-column justify-content-end align-items-end">
						<p className="info-footer"><i class="fa-solid fa-user-tag"></i> Assigned to <span className="by-name">
							{bug.assignedInfo ? bug.assignedInfo.assignedToName : 'No one'}</span>
						</p>
						<p className="info-footer"><i class="fa-regular fa-clock"></i> Created by <span className="by-name">
							{bug.createdBy.name}</span> <span className="by-name">{timeElapsedAgo(new Date(bug.dateCreated))}</span>
						</p>
					</div>
				</div>
			</Link>
		</div>

	)
}