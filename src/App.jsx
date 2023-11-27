import Home from './Components/Home.jsx';
import Navbar from './Components/Nav.jsx';
import LoginForm from './Components/User/LoginForm.jsx';
import RegisterForm from './Components/User/RegisterForm.jsx';
import BugSummary from './Components/Bug/BugSummary.jsx';
import BugList from './Components/Bug/BugList.jsx';
import UserList from './Components/User/UserList.jsx';
import UserSummary from './Components/User/UserSummary.jsx';
import EditBug from './Components/Bug/BugEdit.jsx';
import EditUser from './Components/User/UserEdit.jsx';
import Footer from './Components/Footer.jsx';
import AddNewBug from './Components/Bug/AddNewBug.jsx';
import NotFound from './Components/NotFound.jsx';
import ReassignBug from './Components/Bug/ReassignBug.jsx';
import './assets/css/animista.css'
import './assets/css/styles.css'
import './assets/css/nav.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
/*
<div id="content">
			</div>
*/

function App() {
	const [user, setUser] = useState(null);
	const [auth, setAuth] = useState(null);

	useEffect(() => {
		const localUser = JSON.parse(localStorage.getItem('user'));
		const now = new Date();
		if (!localUser) {
			return;
		}
		if (now.getTime() > localUser.expiration) {  //? If the item is expired, remove it from localStorage
			localStorage.removeItem('user');
			setUser(null);
			window.location.reload();
		}
		if (localUser && localUser !== user) {
			setUser(localUser);
		}
	}, []);

	function showError(message) {
		toast(message, { type: 'error', position: 'top-right' });
	}
	function showSuccess(message) {
		toast(message, { type: 'success', position: 'top-right' });
	}

	function onLogin(auth, user) {
		console.log(auth)
		console.log(user)
		setAuth(auth);
		setUser(user)
	}
	function onLogout() {
		setAuth(null);
		setUser(null);
		showSuccess('Logged out!');
	}
	console.log(auth)
	return (
		<BrowserRouter>
			<Navbar auth={auth} onLogout={onLogout} user={user}/>
			<ToastContainer />
			<Routes path='/'>
				<Route path='/' element={<Home user={user} />} />
				<Route path='login' element={<LoginForm showError={showError}
					showSuccess={showSuccess} onLogin={onLogin}/>} />
				<Route path='register' element={<RegisterForm showError={showError} 
					showSuccess={showSuccess} onLogin={onLogin}/>} />
				<Route path='bugs/list' element={<BugList />} />
				<Route path='users/list' element={<UserList />} />
				<Route path='bug/:bugId' element={<BugSummary />} />
				<Route path='bugs/:bugId/edit' element={<EditBug auth={auth} showError={showError} showSuccess={showSuccess}/>} />
				<Route path='users/:userId/edit' element={<EditUser auth={auth} showError={showError} showSuccess={showSuccess} />} />
				<Route path='users/:userId' element={<UserSummary/>} />
				<Route path='bugs/add' element={<AddNewBug auth={auth} user={user} showError={showError}
					showSuccess={showSuccess}/>} />
				<Route path='*' element={<NotFound/>}/>
				<Route path='bugs/:bugId/reassign' element={<ReassignBug showSuccess={showSuccess}/>}/>
			</Routes>
			<Footer />
		</BrowserRouter>
	)
}

export default App
