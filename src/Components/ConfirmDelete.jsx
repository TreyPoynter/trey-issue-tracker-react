/*eslint-disable */
import axios from "axios"
import '../assets/css/confirmDelete.css'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useState } from "react";

//? deleteWhat is what specifies of what we're deleting so Bug or User
//? so we don't need to remake these
export default function ConfirmDelete({ deleteWhat, handleCancel, obj, loggedUser }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    function showError(message) {
        toast(message, { type: 'error', position: 'top-right' });
    }
    function showSuccess(message) {
        toast(message, { type: 'success', position: 'top-right' });
    }
    function handleDelete(evt) {
        setIsLoading(true);
        evt.preventDefault();
        axios.delete(`${import.meta.env.VITE_API_URL}/api/${deleteWhat == 'User' ? 'users' : 'bugs'}/${loggedUser._id == obj._id && deleteWhat == 'User' ? 'me' : obj._id}`,
            { withCredentials: true }).then(res => {
                setIsLoading(false);
                showSuccess(`${deleteWhat == 'User' ? obj.fullName : obj.title} has been deleted`);
                if (loggedUser._id == obj._id && deleteWhat == 'User') {
                    axios.post(`${import.meta.env.VITE_API_URL}/api/users/logout`, {},
                        { withCredentials: true }).then(res => {
                            localStorage.removeItem('user');
                            navigate('/');
                            location.reload();
                            return;
                        }).catch(err => { console.log(err) });
                }
                navigate(`/${deleteWhat == 'User' ? 'users' : 'bugs'}/list`);
            }).catch(err => {
                console.log(err)
                showError(err.response.data.error)
            });
    }

    return (
        <>
            <div className="delete-container">
                <div className="box">
                    <h3 className="display-6">Delete {deleteWhat}?</h3>
                    <p className="fs-5 m-0 text-center">Are you sure you want to delete</p>

                    <div className="warn_info">
                        <h4><i className="fa fa-warning"></i> Warning</h4>
                        <p>By deleting {deleteWhat == 'User' ? obj.fullName :
                            obj.title} you can't undo this action.</p>
                    </div>

                    <div className="container mt-auto">
                        <div className="row mb-4">
                            <div className="col-md-6 col-12 mb-3">
                                <button
                                    className="btn btn-secondary w-100 text-center"
                                    type="button"
                                    disabled={isLoading}
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                            <div className="col-md-6 col-12">
                                <button
                                    className="btn btn-danger w-100"
                                    onClick={(evt) => handleDelete(evt)}
                                    type="button"
                                    id="cancel"
                                    disabled={isLoading}>
                                    {isLoading ? 'Deleting...' : `Delete ${deleteWhat}`}
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );

}