/*eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react"

export default function GithubSignin() {

    const [userData, setUserData] = useState(null);

    async function GithubLogin() {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}`
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get('code');

        if (codeParam || localStorage.getItem('accessToken') === null) {
            async function getAccessToken() {
                try {
                    const apiUrl = `${import.meta.env.VITE_API_URL}/getAuthtoken`;

                    const response = await axios.get(apiUrl, { withCredentials: true });
                    setUserData(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
            getAccessToken();
        }
    }

    return (
        <button className="signin" type="button"
            onClick={() => GithubLogin()}
        >
            <i className="fa-brands fa-github fs-4"></i>
            Login with Github
        </button>
    )
}