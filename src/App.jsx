import Navbar from './Components/Nav.jsx';
import LoginForm from './Components/LoginForm.jsx';
import RegisterForm from './Components/RegisterForm.jsx';
import './assets/css/animista.css'
import './assets/css/styles.css'
import './assets/css/nav.css'
import {Routes, Route} from 'react-router-dom'

/*
<div id="content">
            </div>
*/

function App() {
	return(
		<>
			<Navbar/>
			<RegisterForm />
			<LoginForm />
		</>
	)
}

export default App
