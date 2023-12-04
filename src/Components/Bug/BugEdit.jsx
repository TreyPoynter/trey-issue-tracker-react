/*eslint-disable */
import '../../assets/css/loginForm.css'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ToggleSlider from './ToggleSlider'
import Error from '../Error'

export default function EditBug({auth, showSuccess, showError}) {
	const nav = useNavigate();
	const loggedUser = JSON.parse(localStorage.getItem('user'));
	const bugId = useParams().bugId;
	const [bug, setBug] = useState(null);
	const [title, setTitle] = useState(bug && bug.title);
	const [description, setDescription] = useState(bug && bug.description);
	const [classification, setClassification] = useState(bug && bug.classification.classifiedAs);
	const [stepsToReproduce, setSteps] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isClosed, setIsClosed] = useState(bug && bug.closedInfo.closed);

	useEffect(() => {
		if (!bug) {
			setIsLoading(true);
			axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}`, { withCredentials: true })
			.then(
				res => {
					setBug(res.data);
					setTitle(res.data.title);
					setDescription(res.data.description);
					setClassification(res.data.classification.classifiedAs);
					setSteps(res.data.stepsToReproduce);
					setIsClosed(res.data.closedInfo.closed);
				}
			).catch(error => { console.log(error); })
			.finally(() => {setIsLoading(false);});
		}
	});

	function updateBug(evt) {  //TODO : DO SHIT

		evt.preventDefault();
		console.log('CLICKED')
		const updatedBug = {
			title : title,
			description : description,
			classification : {
				classifiedAs : classification
			},
			closedInfo : {
				closed : isClosed
			},

			stepsToReproduce : stepsToReproduce.map(str => str.trim()).filter(Boolean)
		}
		delete updatedBug._id;
		delete updatedBug.dateCreated;
		delete updatedBug.createdBy;
		delete updatedBug.assignedInfo;
		console.log("Request Payload:", updatedBug);
		setIsLoading(true);
		axios.put(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}`,
		{...updatedBug}, {withCredentials: true})
		.then( res => {
			nav('/bugs/list');
			showSuccess(`Successfully Updated ${bugId}`);
			console.log(res)
		})
		.catch(err => {
			showError(`Failed to Update ${bugId}`);
			console.log(err)
		})
		.finally(() => {
			setIsLoading(false);
		})
	}
	const changeClosedState = () => {
		setIsClosed(!isClosed);
		console.log(isClosed)
	};
	if (isLoading) {
        return(
            <div id="body-div">
                    <div className="square-loading"></div>
            </div>
        )
    }
	if (!bug) {
		return (
			<Error message="Must be Logged in"/>
		)
	}
	if (!loggedUser.role.includes('business analyst') && loggedUser._id != bug?.assignedInfo?.assignedToUserId) {
		return(
			<Error message="Must be a Business Analyst or be Assigned to edit"/>
		);
	}
	return (
		<>
			<div id="body-div">
				<div className="centered-form">
					<div className='d-flex justify-content-between'>
						<Link to='/bugs/list'><i className="fa-solid fa-arrow-left fa-xl text-black"></i></Link>
						<ToggleSlider bool={isClosed} toggleBool={changeClosedState}/>
					</div>
					<h2 className="mb-3">Edit Bug</h2>
					
					<form onSubmit={(evt) => updateBug(evt)}>
						<div>
							<div className="mb-3 d-flex flex-column align-items-start">
								<label htmlFor="txtTitle" className="form-label mb-0">Title</label>
								<input onChange={(e) => setTitle(e.target.value)} 
								placeholder="Enter bug title" type="text" className="form-control"
								id="txtTitle" aria-describedby="emailHelp" defaultValue={bug.title} />
							</div>
							<div className="mb-3 d-flex flex-column align-items-start">
								<label htmlFor="txtDesc" className="form-label">Description</label>
								<textarea onChange={(e) => setDescription(e.target.value)} name="txtDesc"
									id="txtDesc" rows="2" defaultValue={bug.description}></textarea>
							</div>
							<div className="mb-3 d-flex flex-column align-items-start">
								<label htmlFor="cboClassifications" className="form-label">Classification</label>
								<select onChange={(e) => setClassification(e.target.value)} id='cboClassifications'
									defaultValue={bug.classification.classifiedAs} className="form-select" 
									aria-label="Default select example">
									<option value="unclassified">Unclassified</option>
									<option value="duplicate">Duplicate</option>
									<option value="approved">Approved</option>
									<option value="unapproved">Unapproved</option>
								</select>
							</div>
							{/* STEPS TO COMPLETE */}
							<div className="mb-3 d-flex flex-column align-items-start">
								<label htmlFor="txtSteps" className="form-label">Steps to Produce (comma delimited)</label>
								<textarea onChange={(e) => setSteps(e.target.value.split(','))} name="txtSteps" id="txtSteps"
									rows="4" defaultValue={bug.stepsToReproduce.map(r => r).join(', ')}></textarea>
							</div>
							<button disabled={isLoading} type='submit' id='btnSave' 
							className="btn btn-success w-75 mb-3">{isLoading ? 'Saving' : 'Save'} Changes</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}