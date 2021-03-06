/*
        When the user first time registers they are directed to this page .
        It should contact GitConnect server and retrive all repo info
*/
import * as gitConnectAPI from "./gitConnect-api-calls.js";
import * as gitHubApiCalls from "./gitHubApiCalls.js";
import { whichPageToShow,page } from "./Function-whichPageToShow.js"

export function renderFirstTimeRegistration(gitHubName) {
  const results = document.getElementById('results')
  results.innerHTML = "";
  
  const main = document.getElementById("main");
  main.innerHTML = `
  <head>
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>
 </head>
      <div id="profile-welcome-title">  
        <h4 id="logout" class="home-login-signup" >Welcome to your GitConnect</h4>  
        <div><button id="logoutButton">Logout</button></div>
        </div>
    <div id="main-profile-page" class="container bg-dark text-white">
    <div id="main-profile-page2" class="container bg-dark text-white">
      <div id="leftHandPanel">
        <img id="userProfileimg" class="profilePic" alt="no pic" src="">
        <div id="profile-name-wrapper"><h4 id="profileName">${gitHubName}</h4></div>
        <div id="userBio"></div>
        <div class="profileLinks"><i id="githubicon style="text-align:left;" class='fa fa-github'><a style='margin:0 5px;' id="usersGitHubPage"></a></i></div>
        <div class="profileLinks"><i id="githubicon" class='fa fa-github'><a style='margin:0 5px;' id="usersExternalProfileLink">place holder</a></i></div>
        <div class="profileLinks"><i id="githubicon" class='fa fa-github'><a style='margin:0 5px;' id="usersContact">place holder</a></i></div>
      </div>
      <div id="midPanel">
        <div id="yourprofiledoesnthaveanylinks"><a>Your profile doesnt have any links</a></div>
        <div id="addrepos"><button id="addRepoButton">add repos</button></div>

      </div>  
      <div id="rightHandPanel"></div>
      </div>
  </div>
    `;
  document.getElementById("logoutButton").addEventListener("click", () => {
    logout();
  });
  document.getElementById("addRepoButton").addEventListener("click", () => {
      whichPageToShow(page.ProfileEdit, gitHubName);
  });
  (
    //  Perform all rendering within the below async
    async () => {
      const resp = async () => {
        const GitConnectUserRepoData = await gitConnectAPI.getRepoDetailFromGitConnect(gitHubName);
        console.log(GitConnectUserRepoData);
          (async () => {
            const resp2 = async () => {
              const usersGitHubOverview = await gitHubApiCalls.getTheUsersDetailsFromGitHub(gitHubName);
              console.log("GITHUB REPO RESULTS", usersGitHubOverview); //TODO:delete console

              if (usersGitHubOverview.data.avatar_url) {
                document.getElementById("userProfileimg").src = usersGitHubOverview.data.avatar_url;
              }
              document.getElementById("userBio").textContent = usersGitHubOverview.data.bio;
              document.getElementById("usersGitHubPage").textContent = "my git hub home";
              document.getElementById("usersGitHubPage").href = usersGitHubOverview.data.html_url; //TODO: temp
              // document.getElementById("usersExternalProfileLink").textContent = "my git hub home";
              document.getElementById("githubicon").src = "";
              // document.getElementById("usersContact").textContent = usersGitHubOverview.data.email;
            };
            await resp2();
          })();        
        if (!GitConnectUserRepoData.data.length) {
          console.log("user has no repo data in GitConnect base"); // TODO: delete this console.log
          console.log(GitConnectUserRepoData); // TODO: delete this console.log  its the repo data from GitConnect
          //  TODO: At this point the user is only registered if a valid github member
          //  If they have no repo data in our database its because its first time register or no repos on github
          //  FIXME: This code assumes its always a first time register for now. Later this needs to be changed.
          // Get the client to pull all their repo data

          // const usersGitHubRepos = await gitHubApiCalls.getTheUsersReposFromGitHub(gitHubName)
          // console.log("GITHUB REPO RESULTS",usersGitHubRepos);

        } else {
          console.log("user has repo data");
        }
      };
      await resp();
    }
  )();
}
function logout() {
  axios.delete("/api/session").then(() => {
    window.location = "/";
  });
}

