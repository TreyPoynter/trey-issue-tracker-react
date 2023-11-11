import Navbar from './Components/Nav.jsx';
import LoginForm from './Components/LoginForm.jsx';
import RegisterForm from './Components/RegisterForm.jsx';
import './assets/css/animista.css'
import './assets/css/styles.css'
import './assets/css/nav.css'

/*
<div id="content">
            </div>
*/

function App() {
	return(
		<>
			<Navbar/>
			<RegisterForm/>
		</>
	)
}

export default App
