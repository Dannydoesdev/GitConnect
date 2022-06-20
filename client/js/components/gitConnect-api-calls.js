//  CONSTANTS
const API_END = `/api/users/myrepos`;

//  PUBLIC API CALLS
export function getRepoDetailFromGitConnect(githubname) {
  // function to get the users repo details
  const sendingrequest = async () => {
    // Must wait till axios receives a response before processing more code
    // temporary
    return await axios
      .post(API_END)
      .then((result) => {
        //console.log(getCookie("gitHubName"));
        return result;
      })
      .catch((err) => {});
  };
  return sendingrequest();
}

// PRIVATE FUNCTIONS for the API calls
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
