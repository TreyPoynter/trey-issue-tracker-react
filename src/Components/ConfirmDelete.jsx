/*eslint-disable */
import axios from "axios"
import '../assets/css/confirmDelete.css'


//? deleteWhat is what specifies of what we're deleting so Bug or User
//? so we don't need to remake these
export default function ConfirmDelete({ deleteWhat, handleCancel, obj, loggedUser }) {

    function handleDelete(evt) {
        evt.preventDefault();
        axios.delete(`${import.meta.env.VITE_API_URL}/api/${deleteWhat == 'User' ? 'users' : 'bugs'}/${obj._id}`,
        {withCredentials:true})
        .then(res => {
            if (loggedUser._id == obj._id) {
                axios.post(`${import.meta.env.VITE_API_URL}/api/users/logout`,{},
                {withCredentials: true}).then(res => {
                    navigate('/');
                    localStorage.removeItem('user');
                    location.reload();
                }).catch(err => {console.log(err)});
            }
        });
    }

    return (
        <>
            <div className="delete-container">
                <div className="box">
                    <h3>Delete {deleteWhat}?</h3>
                    <p>Are you sure you want to delete</p>

                    <div className="warn_info">
                        <h4><i className="fa fa-warning"></i> Warning</h4>
                        <p>By deleting {deleteWhat=='User' ? obj.fullName :
                            obj.title} media you can't undo this action.</p>
                    </div>

                    <div className="clearfix d-flex justify-content-center w-100">
                        <button className="btn btn-secondary w-25 me-3" 
                        type="button" onClick={handleCancel}>Cancel</button>
                        <button className="btn btn-danger w-25" onClick={(evt) => handleDelete(evt)} type="button"
                        id="cancel" href="">Delete {deleteWhat} <i className="fa fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </>
    );

}