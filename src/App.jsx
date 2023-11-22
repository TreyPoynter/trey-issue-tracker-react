import Home from './Components/Home.jsx';
import Navbar from './Components/Nav.jsx';
import LoginForm from './Components/LoginForm.jsx';
import RegisterForm from './Components/RegisterForm.jsx';
import BugSummary from './Components/BugSummary.jsx';
import BugList from './Components/BugList.jsx';
import UserList from './Components/UserList.jsx';
import UserSummary from './Components/UserSummary.jsx';
import EditBug from './Components/BugEdit.jsx';
import EditUser from './Components/UserEdit.jsx';
import Footer from './Components/Footer.jsx';
import AddNewBug from './Components/AddNewBug.jsx';
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
			location.reload();
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
				<Route path='bug/list' element={<BugList />} />
				<Route path='user/list' element={<UserList />} />
				<Route path='bug/:bugId' element={<BugSummary />} />
				<Route path='bugs/:bugId/edit' element={<EditBug />} />
				<Route path='users/:userId/edit' element={<EditUser />} />
				<Route path='users/:userId' element={<UserSummary/>} />
				<Route path='bug/add' element={<AddNewBug auth={auth} user={user} showError={showError}
					showSuccess={showSuccess}/>} />
			</Routes>
			<Footer />
		</BrowserRouter>
	)
}

export default App
