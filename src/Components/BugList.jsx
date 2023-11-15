import '../assets/css/bugList.css'
import Bug from './BugListItem'
export default function BugList() {
    return (
        <>
            <div id="content">
            </div>
            <h3 className='text-center display-1'>Bug List</h3>
            <div className='row d-flex justify-content-start '>
                <Bug title='BUG' classification='unclassified' isClosed={true}/>
                <Bug title='SOME BUG' classification='approved' isClosed={false}/>
                <Bug title='BUG' classification='unclassified' isClosed={true}/>
                <Bug title='BUG' classification='unclassified' isClosed={true}/>
            </div>
        </>
    )
}