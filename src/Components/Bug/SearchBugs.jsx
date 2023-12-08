/*eslint-disable */
import axios from "axios";
import { useState } from "react";

export default function SearchBugs({ setBugs }) {

    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [pageNum, setPageNum] = useState(1);

    const onFormSubmit = (search, sortBy) => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/list/`, {withCredentials:true, params:{keywords:search, sortBy}})
        .then(res => {
            console.log(res)
            if (res.data.length < 1) {
                setBugs([]);
                return;
            }
            setBugs(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }
    const handleSortChange = (event) => {
        const newValue = event.target.value;
        setSort(newValue);

        onFormSubmit(search, newValue);
    };
    function detectEnter(evt) {
        const isEnterPressed = evt.key == 'Enter' || evt.key == 13

        if (isEnterPressed) {
            onFormSubmit();
        }
    }

    return (
        <>
            <form onSubmit={(evt) => {evt.preventDefault();
             onFormSubmit(evt.target.search.value,evt.target.sortBy.value);}} 
            className="container d-flex justify-content-center mb-4">
                <div className="d-flex w-50">
                    <div className="input-group">
                        <input onKeyDown={(evt) => detectEnter(evt)} onChange={(e) => setSearch(e.target.value)}
                            className="form-control" id="search"type="text" placeholder={`Search for bugs by keywords`} 
                            aria-label="Search" />
                        <button className="btn btn-primary input-group-append" type="submit">
                            Search <i className="fa-solid fa-magnifying-glass ms-2"></i>
                        </button>
                    </div>
                </div>
                <div className="w-25 ms-5">
                    <select onChange={(e) => handleSortChange(e)} id="sortBy" className="form-select"
                    aria-label="Default select example">
                        <option selected defaultValue={true} hidden disabled value={''}>Sort by...</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="title">Title</option>
                        <option value="classification">Classification</option>
                        <option value="assignedTo">Assigned To</option>
                        <option value="createdBy">Created By</option>
                    </select>
                </div>
            </form>
        </>
    )
}