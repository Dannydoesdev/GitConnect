
export function getTheUsersReposFromGitHub(username) {
 const REPO_API = `https://api.github.com/users/${username}/repos`;   
  // function to get the users repo details
  const sendingrequest = async () => {
    // Must wait till axios receives a response before processing more code
    // temporary
    return await axios
      .get(REPO_API)
      .then((result) => {
        return result;
      })
        .catch((err) => {
          console.log("ERROR OCCURED getting the user repos from github----> ",err)
      });
  };
  return sendingrequest();
}
export function getTheUsersDetailsFromGitHub(username) {
  const REPO_API = `https://api.github.com/users/${username}`;
  // function to get the users repo details
  const sendingrequest = async () => {
    // Must wait till axios receives a response before processing more code
    // temporary
    return await axios
      .get(REPO_API)
      .then((result) => {
        return result;
      })
      .catch((err) => {
          console.log("ERROR OCCURED getting the user repos from github----> return fake data", err);
          return {message:"not working"}
      });
  };
  return sendingrequest();
}

