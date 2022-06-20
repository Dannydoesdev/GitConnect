import { makeAnEl } from "../../utils/dom-create.js";
import { renderProjectEdit } from "./render-project-edit.js";
import { renderProfileEdit } from "./render-profile-edit.js";
import { renderSearch } from "./render-repo-search.js";
import { renderProject } from "./render-project.js";
// import { whichPageToShow, page } from "./Function-whichPageToShow";

export function renderNav() {
//   const main = document.getElementById("main");
  const navBar = document.getElementById("navbar");
  const logo = document.createElement("img");

  logo.src = "./img/gclogo.png";
  logo.setAttribute("id", "navbar-logo");
  navBar.appendChild(logo);
  logo.addEventListener("click", (event) => {
    window.location = "/";
  });

  const sendingrequest = async () => { // This is done as we have to wait for the response from the GitConnect server before rendering the page
    // temporary
    const resp = await axios.get("/api/session").then((result) => {
      if (result.data.success) {
        const editProfileForm = makeAnEl("h4", {
          className: "navbar-links",
          textContent: "EDIT PROFILE",
          id: "navbar-edit-profile",
        });
        editProfileForm.addEventListener("click", () => {
          renderProfileEdit();
        });
        navBar.appendChild(editProfileForm);
        const editRepoForm = makeAnEl("h4", {
          className: "navbar-links",
          textContent: "EDIT REPO",
          id: "navbar-edit-repo",
        });
        navBar.appendChild(editRepoForm);
        editRepoForm.addEventListener("click", () => {
          renderProjectEdit();
        });
        const viewProject = makeAnEl("h4", {
            className: "navbar-links",
            textContent: "VIEW PROJECT",
            id: "navbar-view-project",
          });
        navBar.appendChild(viewProject);
        viewProject.addEventListener("click", () => {
          renderProject();
        });
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
  search.addEventListener("click", (event) => {
    renderSearch();
  });

  const lorem = document.createElement("h4");
  lorem.classList.add("navbar-links");
  lorem.textContent = "LOREM";
  navBar.appendChild(lorem);
  sendingrequest();
}
