import '../assets/css/bugList.css'
import Bug from './BugListItem'
export default function BugList() {
    return (
        <>
            <div id="content">
            </div>
            <h3 className='text-center display-1'>Bug List</h3>
            <ul className="list-group container mt-5" id="bug-list">
                <Bug title='BUG' classification='unclassified'/>
                <Bug title='SOME BUG' classification='approved'/>
                <Bug title='BUG' classification='unclassified'/>
                <Bug title='BUG' classification='unclassified'/>
            </ul>
        </>
    )
}