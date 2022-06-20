// export function renderProfileMain(usersName) {
//   const main = document.getElementById("main");
//   main.innerHTML = "";

//   main.innerHTML = `
  
//       <div id="profile-welcome-title">  
//         <h4 id="logout" class="home-login-signup" >Welcome to your GitConnect</h4>  
//         <div><button id="logoutButton">Logout</button></div>
//         </div>
//     <div id="main-profile-page" class="container bg-dark text-white">
//       <div id="leftHandPanel"></div>
//       <div id="profileTitle">
//           <img class="profilePic" alt="no pic" src="https://cdn-wordpress-info.futurelearn.com/wp-content/uploads/FL365_Free_Certs_Blog_Header.png">
//           <div id="profile-name-wrapper"><h4 id="profileName">${usersName}</h4></div>
          
//       </div>
//       <div></div>

//   </div>
//     `;
//   const logout = document.getElementById("logoutButton");
//   logout.addEventListener("click", () => {
//     axios.delete("/api/session").then(() => {
//       window.location = "/";
//     });
//   });
// }
