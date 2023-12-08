/*eslint-disable */
import axios from "axios";
import { useState } from "react";

export default function SearchBugs({ setBugs }) {

    const [sort, setSort] = useState('');
    const [genre, setGenre] = useState('');

    const onFormSubmit = (search) => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/list`, {withCredentials:true, params:{keywords:search}})
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
    function detectEnter(evt) {
        const isEnterPressed = evt.key == 'Enter' || evt.key == 13

        if (isEnterPressed) {
            onFormSubmit();
        }
    }

    return (
        <>
            <form onEnter onSubmit={(evt) => {evt.preventDefault(); onFormSubmit(evt.target.search.value);}} 
            className="container d-flex justify-content-center mb-4">
                <div className="d-flex w-50">
                    <div className="input-group">
                        <input onKeyDown={(evt) => detectEnter(evt)} className="form-control" 
                        id="search" type="text" placeholder={`Search for bugs by keywords`} 
                            aria-label="Search" />
                        <button className="btn btn-outline-success input-group-append" type="submit">
                            Search <i className="fa-solid fa-magnifying-glass ms-2"></i>
                        </button>
                    </div>
                </div>
                <div className="w-15 ms-5">
                    <select className="form-select" aria-label="Default select example">
                        <option onChange={(e) => setSort(e.target.value)} selected defaultValue={true} hidden
                            disabled>Sort by...</option>
                        <option value="keywords">Keywords</option>
                        <option value="genre">Genre</option>
                        <option value="decending price">Decending Price</option>
                        <option value="Ascending price">Ascending Price</option>
                    </select>
                </div>
                <div className="w-15 ms-5">
                    <select className="form-select" aria-label="Default select example">
                        <option onChange={(e) => setGenre(e.target.value)} selected defaultValue={true} hidden
                            disabled>Select a Genre</option>
                        <option value="First Person Shooter">FPS</option>
                        <option value="Racing">Racing</option>
                        <option value="Puzzle">Puzzle</option>
                        <option value="Fighting">Fighting</option>
                        <option value="Sports">Sports</option>
                        <option value="Platformer">Platformer</option>
                        <option value="Party">Party</option>
                        <option value="Battle Royale">Battle Royale</option>
                    </select>
                </div>
            </form>
        </>
    )
}