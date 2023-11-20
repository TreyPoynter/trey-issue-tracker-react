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
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);

	const handleUserChange = (user) => {
		setCurrentUser(user);
	};

	return(
		<BrowserRouter>
			<Navbar isLoggedIn={isLoggedIn} handleLogout={() => setLoggedIn(false)} updateUser={handleUserChange}/>
			<Routes path='/'>
				<Route path='/' element={<Home user={currentUser}/>}/>
				<Route path='login' element={<LoginForm isLoggedIn={isLoggedIn} handleLogin={() => setLoggedIn(true)} updateUser={handleUserChange}/>}/>
				<Route path='register' element={<RegisterForm user={currentUser} handleLogin={() => setLoggedIn(true)} updateUser ={handleUserChange}/>}/>
				<Route path='bug/list' element={<BugList/>}/>
				<Route path='user/list' element={<UserList/>}/>
				<Route path='bugs/bug' element={<BugSummary/>}/>
				<Route path='bugs/bug/edit' element={<EditBug/>}/>
				<Route path='users/user/edit' element={<EditUser/>}/>
				<Route path='users/user' element={<UserSummary user={currentUser}/>}/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
