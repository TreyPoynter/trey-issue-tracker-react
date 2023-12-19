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
import './assets/css/loading.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import CommentsList from './Components/Comments/CommentsList.jsx';
import axios from 'axios';
import AlmostThere from './Components/User/AlmostThere.jsx';
/*
<div id="content">
			</div>
*/

function App() {
	const [user, setUser] = useState(null);
	const [auth, setAuth] = useState(null);
	const [now, setNow] = useState(new Date());

	useEffect(() => {
		const handleGitHubCallback = async () => {
			try {
				// Make a request to your backend to complete GitHub OAuth
				await axios.get(`${import.meta.env.VITE_API_URL}/auth/github/callback`);
			} catch (error) {
				console.error('GitHub callback error:', error);
			}
		};
		if (window.location.search.includes('code')) {
            handleGitHubCallback();
        }

		const localUser = JSON.parse(localStorage.getItem('user'));
		// Function to update the current time
		const updateCurrentTime = () => setNow(new Date());

		// Set up an interval to update the time every second
		const intervalId = setInterval(updateCurrentTime, 1000);

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
		return () => clearInterval(intervalId);
	}, [now]);

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
			<Navbar auth={auth} onLogout={onLogout} user={user} />
			<ToastContainer />
			<Routes path='/'>
				<Route path='/' element={<Home user={user} />} />
				<Route path='login' element={<LoginForm showError={showError}
					showSuccess={showSuccess} onLogin={onLogin} />} />
				<Route path='register' element={<RegisterForm showError={showError}
					showSuccess={showSuccess} onLogin={onLogin} />} />
				<Route path=':userId/almost-there' element={<AlmostThere showError={showError}
					showSuccess={showSuccess} onLogin={onLogin} />} />
				<Route path='bugs/list' element={<BugList user={user} />} />
				<Route path='users/list' element={<UserList user={user} />} />
				<Route path='bugs/:bugId' element={<BugSummary />} />
				<Route path='bugs/:bugId/edit' element={<EditBug auth={auth} showError={showError} showSuccess={showSuccess} />} />
				<Route path='users/:userId/edit' element={<EditUser auth={auth} showError={showError} showSuccess={showSuccess}
					onLogin={onLogin} />} />
				<Route path='users/:userId' element={<UserSummary />} />
				<Route path='bugs/add' element={<AddNewBug auth={auth} user={user} showError={showError}
					showSuccess={showSuccess} />} />
				<Route path='*' element={<NotFound />} />
				<Route path='bugs/:bugId/reassign' element={<ReassignBug showSuccess={showSuccess} />} />
				<Route path='bugs/:bugId/comments' element={<CommentsList />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	)
}

export default App