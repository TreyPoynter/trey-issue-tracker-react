import Navbar from './Components/Nav.jsx';
import LoginForm from './Components/LoginForm.jsx';
import RegisterForm from './Components/RegisterForm.jsx';
import BugSummary from './Components/BugSummary.jsx';
import BugList from './Components/BugList.jsx';
import './assets/css/animista.css'
import './assets/css/styles.css'
import './assets/css/nav.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
/*
<div id="content">
            </div>
*/

function App() {
	return(
		<BrowserRouter>
			<Navbar/>
			<Routes path='/'>
				<Route path='login' element={<LoginForm/>}/>
				<Route path='register' element={<RegisterForm/>}/>
				<Route path='bugs' element={<BugList/>}/>
				<Route path='bugs/bug' element={<BugSummary/>}/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
