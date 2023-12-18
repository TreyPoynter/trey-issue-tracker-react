import axios from "axios";

export default function GithubSignin() {
    const handleGitHubLogin = async () => {
        const githubAuthURL = 'https://github.com/login/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgithub%2Fcallback&scope=user%3Aemail&client_id=346ddd710f6e72227179';

  // Open GitHub OAuth URL in a new popup window
  const popup = window.open(githubAuthURL, 'GitHub OAuth', 'width=600,height=400');

  // Check for successful authentication in the popup
  const checkPopupInterval = setInterval(() => {
    if (popup.closed) {
      clearInterval(checkPopupInterval);

      // Check authentication status or handle the response as needed
      axios.get(`${import.meta.env.VITE_API_URL}/user`, { withCredentials: true })
        .then(response => {
          const userData = response.data.user;
          console.log(userData)
          // Handle the user data
        })
        .catch(error => {
          console.error(error);
          // Handle errors
        });
    }
  }, 1000);
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
