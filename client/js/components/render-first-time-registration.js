/*
        When the user first time registers they are directed to this page .
        It should contact GitConnect server and retrive all repo info
*/
import * as gitConnectAPI from "./gitConnect-api-calls.js";

export function renderFirstTimeRegistration(gitHubName) {
  const main = document.getElementById("main");
  main.innerHTML = `
      <div id="profile-welcome-title">  
        <h4 id="logout" class="home-login-signup" >Welcome to your GitConnect</h4>  
        <div><button id="logoutButton">Logout</button></div>
        </div>
    <div id="main-profile-page" class="container bg-dark text-white">
      <div id="leftHandPanel"></div>
      <div id="profileTitle">
          <img class="profilePic" alt="no pic" src="https://cdn-wordpress-info.futurelearn.com/wp-content/uploads/FL365_Free_Certs_Blog_Header.png">
          <div id="profile-name-wrapper"><h4 id="profileName">${gitHubName}</h4></div> 
      </div>
      <div></div>

  </div>
    `;
  document.getElementById("logoutButton").addEventListener("click", () => {
    logout();
  });
  //  Perform all rendering within the below async
  (async () => {
    const resp = async () => {
      const userRepoData = await gitConnectAPI.getRepoDetailFromGitConnect(gitHubName);
      console.log(userRepoData)
      if (!userRepoData.data.length) {
        console.log("user has no data");
      } else {
        console.log("user has data");
      }
    };
    await resp();
  })();


}
  function logout() {
    axios.delete("/api/session").then(() => {
      window.location = "/";
    });
  };