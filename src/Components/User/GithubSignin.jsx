import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function GithubSignin() {
    const [queryParameters] = useSearchParams();

    const handleGitHubLogin = async () => {
        window.open(`${import.meta.env.VITE_API_URL}/auth/github`, "_self");
    };

    return (
        <button
            className="signin"
            type="button"
            onClick={(e) => {
                e.preventDefault();
                handleGitHubLogin();
            }}
        >
            <i className="fa-brands fa-github fs-4"></i>
            Login with Github
        </button>
    );
}
