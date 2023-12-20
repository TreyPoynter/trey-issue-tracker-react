/* eslint-disable */
import '../assets/css/home.css'
import { Link } from 'react-router-dom'
import CollabIcon from '../assets/images/collab.png'
import InfoCard from './InfoCard';
import BugIcon from '../assets/images/bug.png'
import BugForum from '../assets/images/antivirus.png'

export default function Home({ user }) {
	function displayGreeting() {
		const hour = new Date().getHours();
		if (hour >= 0 && hour < 12) {
			return `Good Morning, ${user.givenName}`;
		} else if (hour >= 12 && hour < 18) {
			return `Good Afternoon, ${user.givenName}`;
		} else {
			return `Good Evening, ${user.givenName}`;
		}
	}
	return (
		<>
			<div className=''>
				<section className={`jumbotron ${!user && ' notLoggedIn'}`} id='home'>
					<div className="pe=0 container">
						<div id='jumbotron-content' className="row mt-5 d-flex align-items-center">
							<div className='slide-in-left col-8 d-flex justify-content-center flex-column'>
								<h1 id='header-slogan' >
									Navigate, Collaborate, Conquer: <br />
									Bugs, Consider Yourself <span className=''>Warned.</span>
								</h1>
								{
									user ? (
										<p className='display-1 fw-bold'>
											{displayGreeting()}
										</p>) :
										<p className='display-2 fw-bold'>
											<Link to='/login' className='link-light'>Login</Link> or <Link to='/register'
												className='link-light'>Register</Link> today!
										</p>
								}
							</div>
						</div>
					</div>
				</section>
			</div>
			<div className='container'>
				<div className='row d-flex d-flex mt-5'>
					<div className='col-md-4'>
						<InfoCard title={'Navigate'}
							description={'View Other Bugs Made by the Community and Help The Community Fix Them.'}
							image={BugForum} />
					</div>
					<div className='col-md-4'>
						<InfoCard title={'Collaborate'}
							description={'Post Your Own Comments, Or View What Other Users Have To Say on Bugs.'}
							image={CollabIcon} />
					</div>
					<div className='col-md-4'>
						<InfoCard title={'Report'}
							description={'Have a Bug? Report It! We Allow For The Ability For Users To Report Any Bugs of their choosing.'}
							image={BugIcon} />
					</div>
				</div>
			</div>

		</>
	)
}