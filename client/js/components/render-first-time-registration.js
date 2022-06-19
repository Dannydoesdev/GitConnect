export function whichPageToShow(thePageToShow, gitHubName) {
  switch (thePageToShow) {
    case 1:
      renderFirstTimeRegistration(gitHubName);
      break;
    case 2:
      // code block
      break;
    default:
    // code block
  }
}

function renderFirstTimeRegistration(gitHubName) {
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
  const logout = document.getElementById("logoutButton");
  logout.addEventListener("click", () => {
    axios.delete("/api/session").then(() => {
      window.location = "/";
    });
  });
}
