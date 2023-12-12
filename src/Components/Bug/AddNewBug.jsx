/*eslint-disable */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../assets/css/loginForm.css'
import axios from "axios";

export default function AddNewBug({ auth, user, showError, showSuccess }) {
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [stepsToReproduce, setSteps] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	function handleBugCreation(evt) {
		evt.preventDefault();
		const stepsArray = stepsToReproduce.split(',');

		if (!title) { showError('Title is required'); return; }
		if (!description) { showError('Description is required'); return; }
		if (!stepsToReproduce || stepsArray.length < 1) { showError('Atleast 1 step is required'); return; }
		setIsLoading(true);
		axios.put(`${import.meta.env.VITE_API_URL}/api/bugs/new`, {
			title, description, stepsToReproduce : stepsArray
		}, {
			withCredentials: true
		}).then(res => {
			console.log(res);
			showSuccess(`Bug ${title} Added Successfully`);
			navigate('/bugs/list');
		}).catch(error => {

		}).finally(() => {
			setIsLoading(false);
		});
	}

	if (!user) {
		return (
			<>
				<div id='body-div'>
					<div className='centered-form'>
						<form action="">
							<h3>Must be Logged In</h3>
						</form>
					</div>
				</div>
			</>
		)
	}

	return (
		<>
			<div id="body-div">
				{isLoading && <div className="square-loading"></div>}
				<div className="centered-form">
					<h2 className="mb-3">Register New Bug</h2>
					<form action="">
						<div>
							<div className="mb-3 d-flex flex-column align-items-start">
								<label htmlFor="txtFullName" className="form-label">Title</label>
								<input onChange={(e) => setTitle(e.target.value)} placeholder="Bug Title" type="text" className="form-control"
									id="txtFullName" />
							</div>
							<div className="mb-3 d-flex flex-column align-items-start">
								<label htmlFor="txtDesc" className="form-label">Description</label>
								<textarea onChange={(e) => setDescription(e.target.value)} name="txtDesc" id="txtDesc" rows="2"></textarea>
							</div>
							<div className="mb-3 d-flex flex-column align-items-start">
								<label htmlFor="txtSteps" className="form-label">Steps to Produce (comma delimited)</label>
								<textarea onChange={(e) => setSteps(e.target.value)} name="txtSteps" id="txtSteps" rows="4"></textarea>
							</div>
							<button
								type="button" disabled={isLoading} onClick={(e) => handleBugCreation(e)} id='btnRegister' 
								className="btn btn-primary w-75 mb-3">{!isLoading ? 'Click to Register' : 'Registering...'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}