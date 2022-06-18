import { renderLogin } from "./render-login.js";
import { renderRego } from "./render-rego.js";
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

  const searchBar = document.createElement("input");
  searchBar.value = "Search";
  searchBar.setAttribute("id", "search-bar");
  searchContainer.appendChild(searchBar);

  const sendingrequest = async () => { // Must wait till axios receives a response before processing more code
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
        } else {
          // YES the user is logged in
          const logout = document.createElement("h4");
          console.log(result.data)
          logout.textContent = "Logout "+result.data.firstname;
          logout.setAttribute("id", "logout");
          logout.classList.add("home-login-signup");
          loginContainer.appendChild(logout);
          logout.addEventListener("click", () => {
            axios.delete("/api/session").then(() => {
              window.location = "/";
            });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // setting main name
  };

  sendingrequest();
}
