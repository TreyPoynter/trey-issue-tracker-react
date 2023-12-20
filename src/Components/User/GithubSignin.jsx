import { useState } from "react";
import axios from "axios";

export default function GithubSignin() {
    const [isLoading, setIsLoading] = useState(false);
    const handleGitHubLogin = async () => {
        setIsLoading(true);
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
        
        setIsLoading(false);
    };
    const handleGitHubCallback = async () => {
        try {
            // Extract the code parameter from the URL
            const code = new URLSearchParams(window.location.search).get("code");

            if (code) {
                // Make a request to the server to handle the GitHub callback
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/github/callback?code=${code}`);

                // Check if the response contains user information
                if (response.data && response.data.user) {
                    // Set the user state with the retrieved user information
                    localStorage.setItem('user',response.data.user);
                } else {
                    // Handle the case where user information is not available
                    console.error('User information not found in the response');
                }
            } else {
                // Handle the case where the code parameter is missing
                console.error('Code parameter not found in the URL');
            }
        } catch (error) {
            console.error('Error handling GitHub callback:', error);
        } finally {
            // Set isLoading to false, indicating that the request has completed
            setIsLoading(false);
        }
    };

    return (
        <button
            disabled={isLoading}
            className="signin"
            type="button"
            onClick={(e) => {
                e.preventDefault();
                handleGitHubLogin();
                handleGitHubCallback();
            }}
        >
            <i className="fa-brands fa-github fs-4"></i>
            Login with Github
        </button>
    );
}
