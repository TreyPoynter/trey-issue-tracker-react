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
import './assets/css/animista.css'
import './assets/css/styles.css'
import './assets/css/nav.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
/*
<div id="content">
			</div>
*/

function App() {
	const [user, setUser] = useState(null);
	const [auth, setAuth] = useState(null);

	function showError(message) {
		toast(message, { type: 'error', position: 'top-right' });
	}
	function showSuccess(message) {
		toast(message, { type: 'success', position: 'top-right' });
	}

	function onLogin(auth, user) {
		setAuth(auth);
		setUser(user)
	}
	function onLogout() {
		setAuth(null);
		setUser(null);
		showSuccess('Logged out!');
	}

	return (
		<BrowserRouter>
			<Navbar auth={auth} onLogout={onLogout} user={user}/>
			<ToastContainer />
			<Routes path='/'>
				<Route path='/' element={<Home user={user} />} />
				<Route path='login' element={<LoginForm showError={showError}
					showSuccess={showSuccess} onLogin={onLogin}/>} />
				<Route path='register' element={<RegisterForm user={user}
					showError={showError} showSuccess={showSuccess} onLogin={onLogin}/>} />
				<Route path='bug/list' element={<BugList />} />
				<Route path='user/list' element={<UserList />} />
				<Route path='bugs/bug' element={<BugSummary />} />
				<Route path='bugs/bug/edit' element={<EditBug />} />
				<Route path='users/user/edit' element={<EditUser />} />
				<Route path='users/user' element={<UserSummary user={user} />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	)
}

export default App
