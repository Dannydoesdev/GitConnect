import { makeAnEl } from "../../utils/dom-create.js";

export function renderNav() {
  const main = document.getElementById("main");
  const navBar = document.getElementById("navbar");
  const logo = document.createElement("img");
  logo.src = "./img/gclogo.png";
  logo.setAttribute("id", "navbar-logo");
  navBar.appendChild(logo);

  const sendingrequest = async () => {
    // temporary
    const resp = await axios.get("/api/session").then((result) => {
      if (result.data.success) {
        const editProfileForm = makeAnEl("h4", {
          className: "navbar-links",
          textContent: "EDIT PROFILE",
          id: "navbar-edit-profile",
        });
        navBar.appendChild(editProfileForm);
        const editRepoForm = makeAnEl("h4", {
          className: "navbar-links",
          textContent: "EDIT REPO",
          id: "navbar-edit-repo",
        });
        navBar.appendChild(editRepoForm);
      } else {
        console.log("RESULTS", result.data.success);
      }
    });

    // setting main name
  };

  // generate navigation bar and header - to move into components
  const browse = document.createElement("h4");
  browse.classList.add("navbar-links");
  browse.textContent = "BROWSE";
  navBar.appendChild(browse);

  const search = document.createElement("h4");
  search.classList.add("navbar-links");
  search.textContent = "SEARCH";
  search.setAttribute("id", "navbar-search");
  navBar.appendChild(search);

  const lorem = document.createElement("h4");
  lorem.classList.add("navbar-links");
  lorem.textContent = "LOREM";
  navBar.appendChild(lorem);
  sendingrequest();
}
