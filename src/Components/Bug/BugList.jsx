/*eslint-disable */
import '../../assets/css/bugList.css';
import BugListItem from './BugListItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Error from '../Error';
import SearchBugs from'./SearchBugs'
import BugsPaging from './BugsPaging';

export default function BugList({user}) {
	const [bugs, setBugs] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [currPage, setPage] = useState(1);
	const pageSize = 6;

	useEffect(() => {
		axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/list?pageNum=${currPage}&pageSize=${pageSize}`, { withCredentials: true })
			.then((res) => {
				console.log(res)
				setBugs(res.data);
			})
			.catch((error) => { })
			.finally(() => {
				setLoading(false);
			});
	}, [currPage]); // Empty dependency array to ensure the effect runs only once on component mount

	if (isLoading) {
        return(
            <div id="body-div">
                    <div className="square-loading"></div>
            </div>
        )
    }
	if(!user) {
		return(<Error message="Must be Logged in"/>);
	}

	return (
		<>
			<div id="content">
			</div>
			<h3 className='text-center display-1 mb-4'>Bug List</h3>
			<SearchBugs setBugs={setBugs}/>
			<div className='container'>
				<div className='row d-flex justify-content-center'>
					{bugs.length < 1 ?
						(<div className='text-center mt-4 mb-4'>
							<i class="fa-solid fa-magnifying-glass fs-1"></i>
							<h3 className='display-3'>No Bugs Found</h3>
						</div>) :
						bugs.map(bug => (
							<BugListItem key={bug._id} bug={bug} page={currPage}/>
						))}
				</div>
			</div>
			<div className='d-flex justify-content-center'>
				<BugsPaging setPaging={setPage} allBugs={bugs} pageSize={6} pageNum={currPage}/>
			</div>
			<div id="content">
			</div>
		</>
	);
}
