/*eslint-disable */
import '../../assets/css/loginForm.css'
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditBug() {
	const bugId = useParams().bugId;
	const [bug, setBug] = useState(null);
	const [classification, setClassification] = useState(bug && bug.classification.classifiedAs);
	const [stepsToReproduce, setSteps] = useState('');
	console.log(classification)

	useEffect(() => {
		axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}`, { withCredentials: true })
			.then(
				res => {
					setBug(res.data)
				}
			).catch(error => { console.log(error) });
	});

	if (!bug) {
		return (
			<>
				<h3>ERROR</h3>
			</>
		)
	}
	return (
		<>
			<div id="body-div">
				<div className="centered-form">
					<div className='d-flex justify-content-between'>
						<Link to='/bugs/list'><i className="fa-solid fa-arrow-left fa-xl text-black"></i></Link>
					</div>
					<h2 className="mb-3">Edit Bug</h2>
					<form action="">
						<div>
							<div className="mb-3 d-flex flex-column align-items-start">
								<label htmlFor="txtTitle" className="form-label mb-0">Title</label>
								<input placeholder="Enter bug title" type="text" className="form-control"
									id="txtTitle" aria-describedby="emailHelp" defaultValue={bug.title} />
							</div>
							<div className="mb-3 d-flex flex-column align-items-start">
								<label htmlFor="txtDesc" className="form-label">Description</label>
								<textarea onChange={(e) => setSteps(e.target.value)} name="txtSteps"
									id="txtDesc" rows="2" defaultValue={bug.description}></textarea>
							</div>
							<div className="mb-3 d-flex flex-column align-items-start">
								<label htmlFor="cboClassifications" className="form-label">Classification</label>
								<select onChange={(e) => setClassification(e.target.value)} id='cboClassifications'
									className="form-select" aria-label="Default select example">
									<option style={{ display: 'none' }} defaultValue="1">Open this select menu</option>
									<option value="unclassified">Unclassified</option>
									<option value="duplicate">Duplicate</option>
									<option value="approved">Approved</option>
									<option value="unapproved">Unapproved</option>
								</select>
							</div>
							{/* STEPS TO COMPLETE */}
							<div className="mb-3 d-flex flex-column align-items-start">
								<label htmlFor="txtSteps" className="form-label">Steps to Produce (comma delimited)</label>
								<textarea onChange={(e) => setSteps(e.target.value)} name="txtSteps" id="txtSteps"
									rows="4" defaultValue={bug.stepsToReproduce.map(r => r).join(', ')}></textarea>
							</div>

							<Link to='/bugs/bug' id='btnSave' className="btn btn-success w-75 mb-3">Save</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}