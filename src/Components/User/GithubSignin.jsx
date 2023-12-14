import { useEffect } from "react"

export default function GithubSignin() {

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get('code');
    }, []);

    return (
        <button className="signin" type="button"
            onClick={() => 
                window.location.href = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}`}
            >
            <i className="fa-brands fa-github fs-4"></i>
            Login with Github
        </button>
    )
}