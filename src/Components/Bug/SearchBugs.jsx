/*eslint-disable */
import axios from "axios";
import { sortBy } from "lodash";
import { useEffect, useState } from "react";

export default function SearchBugs({ setBugs, page }) {
    const [sort, setSort] = useState('');
    const [classifiedBy, setClassifiedBy] = useState('');
    const [search, setSearch] = useState('');

    const onFormSubmit = (searchValue) => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/list/`, {
            withCredentials:true,
            params: { keywords: searchValue, sortBy: sort, classification:classifiedBy },
            validateStatus:false
        })
            .then(res => {
                console.log(res)
                if (res.data.length < 1) {
                    setBugs([]);
                } else {
                    setBugs(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        onFormSubmit(search);
    }, [classifiedBy, sort])

    const handleSortChange = (event) => {
        const newValue = event.target.value;
        setSort(newValue);
    };
    const handleClassifiedChange = (event) => {
        const newValue = event.target.value;
        setClassifiedBy(newValue);
    };
    function detectEnter(evt) {
        const isEnterPressed = evt.key == 'Enter' || evt.key == 13

        if (isEnterPressed) {
            onFormSubmit();
        }
    }

    return (
        <form
            onSubmit={(evt) => {
                evt.preventDefault();
                try {
                    onFormSubmit(evt.target.search.value);
                } catch (error) {
                    console.log('ERROR')
                    setBugs([]);
                }
                
            }}
            className="container mb-4">
            <div className="row">
                <div className="col-md-4 mb-3">
                    <div className="input-group">
                        <input
                            onKeyDown={(evt) => detectEnter(evt)}
                            onChange={(e) => setSearch(e.target.value)}
                            className="form-control"
                            id="search"
                            type="text"
                            placeholder={`Search for bugs by keywords`}
                            aria-label="Search"
                        />
                        <button className="btn btn-primary input-group-append" type="submit">
                            Search <i className="fa-solid fa-magnifying-glass ms-2"></i>
                        </button>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <select onChange={(e) => handleSortChange(e)}
                        id="sortBy" className="form-select" aria-label="Default select example">
                        <option selected defaultValue={true} hidden disabled value={''}>Sort by...</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="title">Title</option>
                        <option value="classification">Classification</option>
                        <option value="assignedTo">Assigned To</option>
                        <option value="createdBy">Created By</option>
                    </select>
                </div>
                <div className="col-md-4 mb-3">
                    <select onChange={(e) => handleClassifiedChange(e)}
                        id="classifiedBy" className="form-select" aria-label="Default select example">
                        <option selected defaultValue={true} value={''}>No Filter by Classification</option>
                        <option value="approved">Approved</option>
                        <option value="unclassified">Unclassified</option>
                        <option value="duplicate">Duplicate</option>
                        <option value="unapproved">Unapproved</option>
                    </select>
                </div>
            </div>
        </form>


    )
}