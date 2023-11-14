import '../assets/css/bugList.css'
import User from './UserListItem'
export default function UserList() {
    return (
        <>
            <div id="content">
            </div>
            <h3 className='text-center display-1'>User List</h3>
            <ul className="list-group container mt-5" id="bug-list">
                <User name='John Doe' role='admin'/>
                <User name='User' role='developer'/>
            </ul>
        </>
    )
}