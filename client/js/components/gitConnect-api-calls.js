//  CONSTANTS
const API_END = `/api/users/`;

//  PUBLIC API CALLS
export function getRepoDetailFromGitConnect(githubname) {
  // function to get the users repo details
  const sendingrequest = async () => {
    // Must wait till axios receives a response before processing more code
    // temporary
    return await axios
      .post(API_END+"myrepos")
      .then((result) => {
        //console.log(getCookie("gitHubName"));
        return result;
      })
      .catch((err) => {});
  };
  return sendingrequest();
}
export function getUsersReposById(gitConnectId) {
  // function to get the users repo details
  // Returns an object with all the users repos
  const sendingrequest = async () => {
    // Must wait till axios receives a response before processing more code
    // temporary
    return await axios
      .post(API_END+"reposById")
      .then((result) => {
        return result;
      })
      .catch((err) => {});
  };
  return sendingrequest();
}
export function getRepoDetailsByRepoId(RepoId) {
  // function to get the users repo details
  // Returns an object with all the users repos
  const sendingrequest = async () => {
    // Must wait till axios receives a response before processing more code
    // temporary
    return await axios
      .post(API_END + "repoDetailByRepoId")
      .then((result) => {
        //console.log(getCookie("gitHubName"));
        return result;
      })
      .catch((err) => {});
  };
  return sendingrequest();
}
