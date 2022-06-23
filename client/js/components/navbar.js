import { makeAnEl } from "../../utils/dom-create.js";
import { renderProjectEdit } from "./render-project-edit.js";
import { renderProfileEdit } from "./render-profile-edit.js";
import { renderSearch } from "./render-repo-search.js";
import { logOut } from "./home-startup.js";
import { renderProject } from "./render-project.js";

// import { renderProfile, renderProfileTemplate } from "./render-profile.js";
import { renderProfile, renderProfileTemplate } from "./render-profile.js";
import { renderRego } from "./render-rego.js";
import { renderLogin } from "./render-login.js";

// import { whichPageToShow, page } from "./Function-whichPageToShow";


export function renderNav() {

//   const main = document.getElementById("main");

//   const logo = document.createElement("img");
//   logo.src = "./img/gclogo.png";
//   logo.setAttribute("id", "navbar-logo");
    
    const navBar = document.getElementById("navbar");
    
    // creating a bootstrap container for logo
    const logoContainer = makeAnEl("a", {
        className: "navbar-brand",
        href: "#"
    });
    
    const logo = makeAnEl("img", {
        src: "./img/gclogo.png",
        className: "img-fluid",
        id: "navbar-logo",
        alt: "Gitconnect logo"
    });

    logoContainer.appendChild(logo);
    navBar.appendChild(logoContainer);

//   const navBar = document.getElementById("navbar");
//   navBar.classList.add("container-fluid")
  

//   const logo = makeAnEl('img', {
//     src: "./img/gclogo.png",
//     classList: ['navbar-links', 'col'],
//     id: "navbar-logo"
//   })
 
//   navBar.appendChild(logo);

  logo.addEventListener("click", (event) => {
    window.location = "/";
  });

    // const row = makeAnEl('div', [logo])
    const toggleResponsiveDropDown = makeAnEl("button", {
        class: "navbar-toggler",
        type: "button",
        data: {
            bsToggle: "collapse",
            bsTarget: "#navbarNavAltMarkup",
        },
    }, [
        makeAnEl("span", {
            class: "navbar-toggler-icon",
        }),
    ]
    )
    navBar.appendChild(toggleResponsiveDropDown);
    
    const allNavItemsContainer = makeAnEl("div", {
        className: ['collapse', 'navbar-collapse'],
        id: "navbarNavAltMarkup",
    })
    const allNavItems = makeAnEl("div", {
        className: "navbar-nav",
        // id: "navbar-nav"
    });
    allNavItemsContainer.appendChild(allNavItems);
    navBar.appendChild(allNavItemsContainer);

  const sendingrequest = async () => { // This is done as we have to wait for the response from the GitConnect server before rendering the page
    // temporary
    const resp = await axios.get("/api/session").then((result) => {

        if (result.data.success) {
            console.log(result)
            const githubName = result.data.githubname;
          console.log(githubName)
          console.log(result.data)
          const id = result.data.id;

            // const myProfile = makeAnEl("h4", {
            //   className: "navbar-links",
            //   textContent: "My Profile",
            //   id: "navbar-my-profile"
            // });
            // navBar.appendChild(myProfile);
            // myProfile.addEventListener('click', () => {
            //   // need to call specific username here
            //   renderProfileMain();
            // })
            
            //     <ul class="navbar-nav">
            //     <li class="nav-item">
            //       <a class="nav-link active" aria-current="page" href="#">Home</a>
            //     </li>
            //     <li class="nav-item">
            //       <a class="nav-link" href="#">Features</a>
            //     </li>
            //     <li class="nav-item">
            //       <a class="nav-link" href="#">Pricing</a>
            //     </li>
            //     <li class="nav-item">
            //       <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            //     </li>
            //   </ul>
            //     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            //     <span class="navbar-toggler-icon"></span>
            //   </button >
      
            // const toggleResponsiveDropDown = makeAnEl("button", {
            //     class: "navbar-toggler",
            //     type: "button",
            //     data: {
            //         bsToggle: "collapse",
            //         bsTarget: "#navbarNavAltMarkup",
            //     },
            // }, [
            //     makeAnEl("span", {
            //         class: "navbar-toggler-icon",
            //     }),
            // ]
            // )
            // navBar.appendChild(toggleResponsiveDropDown);
            
            // const allNavItemsContainer = makeAnEl("div", {
            //     className: ['collapse', 'navbar-collapse'],
            //     id: "navbarNavAltMarkup",
            // })
            // const allNavItems = makeAnEl("div", {
            //     className: "navbar-nav",
            //     // id: "navbar-nav"
            // });


            const editProfileForm = makeAnEl("a", {
                className: "nav-link",
                textContent: "EDIT PROFILE",
                href: "#",
                id: "navbar-edit-profile",
            });

            const editRepoForm = makeAnEl("a", {
                className: "nav-link",
                textContent: "EDIT REPO",
                href: "#",
                id: "navbar-edit-repo",
            });  
            
            const addRepoForm = makeAnEl("a", {
                className: "nav-link",
                textContent: "ADD REPO",
                href: "#",
                id: "navbar-add-repo",
              });  
       
              const viewProfile = makeAnEl("a", {
                className: "nav-link",
                  textContent: "VIEW PROFILE",
                  href: "#",
                id: "navbar-view-profile",
              });
            
              const viewProject = makeAnEl("a", {
                className: "nav-link",
                  textContent: "VIEW PROJECT",
                  href: "#",
                id: "navbar-view-project",
              });
            
              const logOutNav = makeAnEl("a", {
                className: ["nav-link", "float-end"],
                  textContent: "LOG OUT",
                  href: "#",
                id: "navbar-log-out",
              });
            
         
            allNavItems.appendChild(editProfileForm);
            allNavItems.appendChild(editRepoForm);
            allNavItems.appendChild(addRepoForm);
            allNavItems.appendChild(viewProfile);
            allNavItems.appendChild(viewProject);
            allNavItems.appendChild(logOutNav);

            logOutNav.addEventListener("click", () => {
                logOut();
            });

            
            // doesnt search anything yet
            const searchBar = document.createElement("form")
            searchBar.setAttribute("class", "d-flex")
            searchBar.innerHTML = `            
            <input class="form-control ms-5 me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-light" type="submit">Search</button>
          `
            
            navBar.appendChild(searchBar)
            // allNavItems.appendChild(searchBar);
        // const editProfileForm = makeAnEl("h4", {
        //   className: "navbar-links",
        //   textContent: "EDIT PROFILE",
        //   id: "navbar-edit-profile",
        // });

        // navBar.appendChild(editProfileForm);
        editProfileForm.addEventListener("click", () => {
          renderProfileEdit();
        });
            
            addRepoForm.addEventListener("click", () => {
                renderSearch();
            });
        // navBar.appendChild(editProfileForm);
        // const editRepoForm = makeAnEl("h4", {
        //   className: "navbar-links",
        //   textContent: "EDIT REPO",
        //   id: "navbar-edit-repo",
        // });
        // navBar.appendChild(editRepoForm);

        // navBar.appendChild(myProfile);
        // myProfile.addEventListener('click', () => {
        //   // need to call specific username here
        //   renderProfileMain();
        // })

//         const editProfileForm = makeAnEl("h4", {
//           className: ["navbar-links", "col"],
//           textContent: "EDIT PROFILE",
//           id: "navbar-edit-profile",
//         });
//         navBar.appendChild(editProfileForm);
//         editProfileForm.addEventListener("click", () => {
//           renderProfileEdit();
//         });
//         navBar.appendChild(editProfileForm);
//         const editRepoForm = makeAnEl("h4", {
//           className:["navbar-links", "col"],
//           textContent: "EDIT REPO",
//           id: "navbar-edit-repo",
//         });
//         navBar.appendChild(editRepoForm);

        editRepoForm.addEventListener("click", () => {
          renderProjectEdit();
        });
            
            //This is currently to view 'logged-in users own' profile

        // const viewProfile = makeAnEl("h4", {
        //     className: "navbar-links",
        //     textContent: "VIEW PROFILE",
        //     id: "navbar-view-profile",
        //   });
        // navBar.appendChild(viewProfile);

//         const viewProfile = makeAnEl("h4", {
//             className: ["navbar-links", "col"],
//             textContent: "VIEW PROFILE",
//             id: "navbar-view-profile",
//           });
//         navBar.appendChild(viewProfile);
// >>>>>>> main
            viewProfile.addEventListener("click", () => {
            console.log(id)
          renderProfile(id);
        });
            

        // const viewProfileTemplate = makeAnEl("h4", {
        //     className: "navbar-links",
        //     textContent: "VIEW MOCKUP",
        //     id: "navbar-view-mockup",
        //   });
        // navBar.appendChild(viewProfileTemplate);
        // viewProfileTemplate.addEventListener("click", () => {
        //   renderProfileTemplate();
        // });
        // const viewProject = makeAnEl("h4", {
        //     className: "navbar-links",
        //     textContent: "VIEW PROJECT",
        //     id: "navbar-view-project",
        //   });
        // navBar.appendChild(viewProject);

//         const viewProfileTemplate = makeAnEl("h4", {
//             className: ["navbar-links", "col"],
//             textContent: "VIEW MOCKUP",
//             id: "navbar-view-mockup",
//           });
//         navBar.appendChild(viewProfileTemplate);
//         viewProfileTemplate.addEventListener("click", () => {
//           renderProfileTemplate();
//         });
//         const viewProject = makeAnEl("h4", {
//             className: ["navbar-links", "col"],
//             textContent: "VIEW PROJECT",
//             id: "navbar-view-project",
//           });
//         navBar.appendChild(viewProject);

        viewProject.addEventListener("click", () => {
          renderProject();
        });
        } else {


            const logInNav = makeAnEl("a", {
                className: "nav-link",
                  textContent: "LOG IN",
                  href: "#",
                id: "navbar-log-in",
              });
            
            logInNav.addEventListener("click", () => {
                renderLogin();
            });

            const registerNav = makeAnEl("a", {
                className: "nav-link",
                  textContent: "REGISTER",
                  href: "#",
                id: "navbar-register",
              });
            

            registerNav.addEventListener("click", () => {
                renderRego();
            });

            allNavItems.appendChild(logInNav);
            allNavItems.appendChild(registerNav);
            
        console.log("RESULTS", result.data.success);
      }
    });

    // setting main name
  };

  // generate navigation bar and header - to move into components
  
  // ---- no longer needed for now ----
  // const browse = document.createElement("h4");
  // browse.classList.add("navbar-links");
  // browse.textContent = "BROWSE";
  // navBar.appendChild(browse);

  // const search = document.createElement("h4");
  // search.classList.add("navbar-item");
  // search.textContent = "SEARCH";
  // search.setAttribute("id", "navbar-search");
  // navBar.appendChild(search);
  // search.addEventListener("click", (event) => {
  //   renderSearch();
  // });


  sendingrequest();
}
