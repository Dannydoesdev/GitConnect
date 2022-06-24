import { renderLogin } from "./render-login.js";
import { renderRego } from "./render-rego.js";
// import { whichPageToShow,page } from "./Function-whichPageToShow.js";


// to render the home page
export function renderHome() {
  const main = document.getElementById("main");
  // temporariiy removing search-boxes (sorry Danny)
  main.innerHTML = "";
  const homeLogo = document.createElement("img");
  homeLogo.src = "./img/gclogo.png";
  // setting logo
  homeLogo.setAttribute("id", "home-logo");
  main.appendChild(homeLogo);

  // setting login/signup
  const loginContainer = document.createElement("div");
  loginContainer.setAttribute("id", "login-container");
  main.appendChild(loginContainer);

  const heading = document.createElement("h1");
  heading.textContent = "Gitconnected;";
  heading.setAttribute("id", "home-heading");
  main.appendChild(heading);
  // setting tagline
  const tagline = document.createElement("h2");
  tagline.textContent = "The best fresh talent from around Australia"; // - placeholder
  tagline.setAttribute("id", "home-tagline");
  main.appendChild(tagline);
  // creating search box
  const searchContainer = document.createElement("div");
  searchContainer.setAttribute("id", "search-container");
  main.appendChild(searchContainer);

  const searchLogo = document.createElement("img");
  searchLogo.src = ""; // -- maybe not necesary
  searchLogo.setAttribute("id", "search-logo");
  searchContainer.appendChild(searchLogo);

  // const searchBar = document.createElement("input");
  // searchBar.value = "Search";
  // searchBar.setAttribute("id", "search-bar");
  // searchContainer.appendChild(searchBar);

  const sendingrequest = async () => {
    // Must wait till axios receives a response before processing more code
    // temporary
    const resp = await axios
      .get("/api/session")
      .then((result) => {
        if (!result.data.success) {
          // No this user is not logged in
          const login = document.createElement("h4");
          login.textContent = "Login";
          login.setAttribute("id", "login");
          login.classList.add("home-login-signup");
          const signUp = document.createElement("h4");
          signUp.textContent = "Sign Up";
          signUp.setAttribute("id", "sign-up");
          signUp.classList.add("home-login-signup");
          loginContainer.appendChild(login);
          login.addEventListener("click", () => {
            renderLogin();
          });
          loginContainer.appendChild(signUp);
          signUp.addEventListener("click", () => {
            renderRego();
          });
        // } 
        // disabling for now, this function should run after signup
        // else {
        //   // YES the user is logged in
        //   renderProfileMain(result.data.firstname);
        // }
        } else {
          // YES the user is logged in
          console.log("HERE ARE THE RESPONSE FROM TEH SERVER AFTER REGISTRATION", result); //TODO: delete console log
          document.cookie = `gitHubName=${result.data.githubname}`;
          document.cookie = `email=${result.data.email}`;
          document.cookie = `email=${result.data.gitConnectId}`;
          whichPageToShow(page.FirstTimeRegistration, result.data.githubname);
        }
      })
      .catch((error) => {
        console.log(error); //TODO: delete console log
      });

    // setting main name
  };

  sendingrequest();
}

export function logOut() {
    axios.delete("/api/session").then(() => {
      window.location = "/";
    });
  }
