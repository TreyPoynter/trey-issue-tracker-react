import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function BugSummary() {
	const bugId = useParams().bugId;
	const [bug, setBug] = useState(null);
	useEffect(() => {
		axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}`, { withCredentials: true })
			.then(
				res => {
					setBug(res.data)
				}
			).catch(error => { console.log(error) });
	});

	function handleExitAnimation() {
		document.getElementById('bug-card').classList.add('slide-out-elliptic-top-bck');

		function navigateToBugs() {
			window.location.href = '/bugs';
		}

		// Listen for the 'animationend' event
		document.getElementById('bug-card').addEventListener('animationend', navigateToBugs, { once: true });
	}
	if (!bug) {
		return (
			<>
				<h1>Bug not found</h1>
			</>
		);
	}
	const dateCreated = new Date(bug.dateCreated);
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const month = monthNames[dateCreated.getMonth()];
	const day = dateCreated.getDate();
	const year = dateCreated.getFullYear();
	const formattedDate = month + ' ' + day + ', ' + year;
	return (
		<>
			<div id="body-div">
				<div className="form d-flex flex-column" id='bug-card'>
					<div className='d-flex justify-content-between'>
						<Link to='/bugs/list'><i className="fa-solid fa-arrow-left fa-xl text-black"></i></Link>
					</div>
					<div className=''>
						<h2 className="mb-0 pb-2 display-5 text-center">{bug.title}</h2>
						<h3 className="mb-0 pb-2 fs-5 text-center">Classification : {bug.classification.classifiedAs}</h3>
						<h2 className="border-bottom pb-2 fs-5 text-center">{bug.description}</h2>
					</div>
					<div id='info'>
						<div className="d-flex flex-column" id='created-info'>
							<p className='border-bottom fs-3 mb-0'>Created Info</p>
							<ul>
								<li>Created By - {bug.createdBy.name}</li>
								<li>Created On - {formattedDate}</li>
							</ul>
						</div>
						<div className="d-flex flex-column" id='assignment-info'>
							<p className='border-bottom fs-3 mb-0'>Assigned Info</p>
							{bug.assignedInfo ?
								<ul>
									<li>Assigned To - John Doe</li>
									<li>Assigned On - 11/13/2023</li>
									<li>Last Assignment Change - 11/13/2023</li>
								</ul> :
								<h5>Not Assigned to Anyone</h5>}

						</div>
					</div>
				</div>
			</div>
		</>
	)
}