import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function BugSummary() {
	const user = JSON.parse(localStorage.getItem('user'));
	const bugId = useParams().bugId;
	const [bug, setBug] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [currStep, setCurrStep] = useState(0); //? index for stepsToReproduce array
	useEffect(() => {
		setIsLoading(true)
		axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}`, { withCredentials: true })
			.then(
				res => {
					setBug(res.data)
				}
			).catch(error => { console.log(error) })
			.finally(() => setIsLoading(false));
	}, []);
	if (isLoading) {
		return (
			<div id="body-div">
				<div className="square-loading"></div>
			</div>
		)
	}
	if (!bug) {
		return (
			<div id='body-div'>
				<div className='centered-form'>
					<form action="">
						<h3>Bug not found</h3>
					</form>
				</div>
			</div>
		);
	}
	function formatDate(dateCreated) {
		const date = new Date(dateCreated);
		const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		const month = monthNames[date.getMonth()];
		const day = date.getDate();
		const year = date.getFullYear();
		return month + ' ' + day + ', ' + year;
	}
	function nextStep() {
		setCurrStep(currStep + 1);
	}
	function prevStep() {
		setCurrStep(currStep - 1);
	}

	return (
		<div id="body-div">
			<div className="form d-flex flex-column info-card-form" id='bug-card'>
				<div className='d-flex justify-content-between'>
					<Link to='/bugs/list'><i className="fa-solid fa-arrow-left fa-xl text-black"></i></Link>
				</div>
				<div className=''>
					<h2 className="mb-0 pb-2 display-5 text-center">{bug.title}</h2>
					<h3 className="mb-0 pb-2 fs-5 text-center">Classification: {bug.classification.classifiedAs}</h3>
					<h2 className="border-bottom pb-2 fs-5 text-center">{bug.description}</h2>
				</div>
				<div className='d-flex justify-content-between'>
					<button disabled={currStep == 0} className='btn btn-primary mb-3 w-10' onClick={() => prevStep()}>
						<i className="fa-solid fa-caret-left"></i>
					</button>
					<p className='form-control w-60 text-center'>{currStep+1}. {bug.stepsToReproduce[currStep]}</p>
					<button disabled={currStep >= bug.stepsToReproduce.length-1} className='btn btn-primary mb-3 w-10' 
						onClick={() => nextStep()}>
						<i className="fa-solid fa-caret-right"></i>
					</button>
				</div>
				
				<div id='info' className='info-section'>
					<div className="d-flex flex-column ms-3" id='created-info'>
						<p className=' fs-3 mb-0'><i className="fa-solid fa-helmet-safety me-3"></i>Created Info :</p>
						<ul>
							<li>Created By - {bug.createdBy.name}</li>
							<li>Created On - {formatDate(bug.dateCreated)}</li>
						</ul>
					</div>
					<div className="d-flex flex-column ms-3" id='assignment-info'>
						<p className='fs-3 mb-0'><i className="fa-solid fa-folder me-3"></i>Closed Info :</p>
						<ul>
							<li>Status : {bug.closedInfo.closed ? 'Closed' : 'Open'}</li>
							{bug.closedInfo.closedBy && <li>Last Closed by - {bug.closedInfo.closedBy.fullName}</li>}
							{bug.closedInfo.closedOn && <li>Last Closed - {formatDate(bug.closedInfo.closedOn)}</li>}
						</ul>
					</div>
					<div className="d-flex flex-column ms-3" id='assignment-info'>
						<p className='fs-3 mb-0'><i className="fa-solid fa-user-tag me-3"></i>Assigned Info :</p>
						{bug.assignedInfo ?
							<ul>
								<li>Assigned To - {bug.assignedInfo.assignedToName}</li>
								<li>Assigned On - {formatDate(bug.assignedInfo.assignedOn)}</li>
							</ul> :
							<p>Not Assigned to Anyone</p>}
					</div>
					{
						bug.update &&
						<div className="d-flex flex-column ms-3" id='assignment-info'>
							<p className='fs-3 mb-0'><i className="fa-solid fa-pencil me-3"></i>Updated Info :</p>
							<ul>
								<li>Updated by - {bug.update.lastUpdatedBy}</li>
								<li>Last Updated - {formatDate(bug.update.lastUpdated)}</li>
							</ul>
						</div>
					}

				</div>
				<div id='btns' className='mt-auto d-flex flex-column'>
					{user &&
						(user.role.includes('business analyst') ||
							user._id === bug?.assignedInfo?.assignedToUserId) &&
						<Link to={`/bugs/${bugId}/edit`} className='btn btn-edit w-100 col-md-4'>
							<i className="fa-solid fa-pencil me-2"></i> Edit
						</Link>
					}
					{user &&
						(user.role.includes('technical manager') ||
							user._id === bug?.assignedInfo?.assignedToUserId) &&
						<Link to={`/bugs/${bugId}/reassign`} id='btn-reassign' className='btn w-100'>
							<i className="fa-solid fa-user-tag me-2"></i> Reassign
						</Link>
					}
					<Link to={`/bugs/${bugId}/comments`} className='btn btn-comments w-100 col-md-4'>
						<i className="fa-regular fa-comment-dots me-2"></i> Show Comments
					</Link>
				</div>
			</div>
		</div>
	)
}