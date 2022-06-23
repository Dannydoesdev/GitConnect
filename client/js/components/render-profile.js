import { makeAnImg } from "../../utils/dom-create.js";
import { makeAnEl } from "../../utils/dom-create.js";
import { renderProjectEdit } from "./render-project-edit.js";
import { renderProject } from "./render-project.js";
import { renderRepoListBs } from "./render-repo-search.js";

export function renderProfile(id) {
  const main = document.getElementById("main");
  main.innerHTML = "";

  const results = document.getElementById("results");
  results.removeAttribute("class");
  results.innerHTML = "";

  axios.get(`/api/profiles/profilepage/${id}`).then((result) => {
    console.log("THE API RESULT", result);
    // if (result.data.success) {
    //     console.log(result)
    // } else {
    //     console.log("RESULTS", result.data.success);
    // }
    let projectOneGhName;
    let projectOneDescription;
    let projectTwoGhName;
    let projectOneRepoid;

    let profileData = result.data.user;
    // console.log(profileData)
    for (let data in profileData) {
      // console.log(`${data} ${profileData[data]}`)
    }
    console.log(profileData);
    // let email = profileData.email;
    // console.log(profileData)
    let avatar = profileData.githubavatar;
    // console.log(userType)
    let githubName = profileData.githubname;
    let firstName = profileData.firstname;
    let lastName = profileData.lastname;
    let aboutme = profileData.aboutme;
    let mobile = profileData.mobile;
    //TYPO IN DB
    let githubUrl = profileData.githubutrl;

    let projectData = result.data.projects;

    let projectOne = projectData[0];
    console.log(projectOne);
    let projectTwo = projectData[1];
    let projectThree = projectData[2];

    console.log(projectData); // TODO: This is the line projectData has all details  for the user
    if (projectData.length > 0) {
      console.log("more than 2 projects");

      projectOneDescription = projectOne.description;
      projectOneRepoid = projectOne.repoid;
      projectTwoGhName = projectTwo.githubreponame;
      projectOneGhName = projectOne.githubreponame;
      console.log(projectOneGhName);
      // let projectOneGhName = projectOne.githubreponame;
      let projectOneTitle = projectOne.title;

      // let projectOneDescription = projectOne.description;
      let projectOneImage = projectOne.titleimage;
      //should add link in db
      let projectOneLink = projectOne.link;
      let projectOneChallenges = projectOne.challenges;
      let projectOneProcess = projectOne.process;
      let projectOneOutcomes = projectOne.outcomes;

      // // let projectTwoGhName = projectTwo.githubreponame;
      //     let projectTwoTitle = projectTwo.title;
      //     let projectTwoDescription = projectTwo.description;
      //     let projectTwoImage = projectTwo.titleimage;
      //     //should add link in db
      //     let projectTwoLink = projectTwo.link;
      //     let projectTwoChallenges = projectTwo.challenges;
      //     let projectTwoProcess = projectTwo.process;
      //     let projectTwoOutcomes = projectTwo.outcomes;
    }

    //EDIT IF LOGGED IN:
    // suggest limiting projects to 3 for simplicity for now

    let editProjectOne = "";
    let editProjectTwo = "";
    let addRepoBtn = "";

    if (result.data.currentUser) {
      console.log("this is the current user");
      editProjectOne = makeAnEl("btn", {
        class: ["btn", "click-to-edit-profile", "btn-outline-light"],
        innerText: `Edit ${projectOneGhName}`,
        id: "edit-project-1",
        onclick: `renderEditProject(${projectOneGhName})`,
      });
      editProjectTwo = makeAnEl("btn", {
        class: ["btn", "btn-outline-light"],
        innerText: `Edit ${projectTwoGhName}`,
        id: "edit-project-2",
        onclick: `renderEditProject(${projectTwoGhName})`,
      });
      addRepoBtn = makeAnEl("btn", {
        class: ["btn", "btn-lg", "btn-outline-success"],
        innerText: `Add a project from Github`,
        id: "add-project-btn",
      });
      console.log(editProjectOne);
      console.log(editProjectTwo);
      console.log(projectOneGhName);
    } else {
      console.log("this is not the current user");
      editProjectOne = makeAnEl("btn", {
        display: "none",
      });
      editProjectTwo = makeAnEl("btn", {
        display: "none",
      });
      addRepoBtn = makeAnEl("btn", {
        display: "none",
      });
    }

    //JUST AN IDEA
    let projectList = projectData.map((project) => {
      return `
            <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">${project.title}</h5>
                <p class="card-text">${project.description}</p>
                <a href="${project.link}" class="btn btn-primary">Go to Project</a>
            </div>
        </div>
            `;
    });

    //ignore this bit for now
    let projectListHTML = projectList.join("");
    // console.log(projectListHTML)
    let projectListContainer = document.createElement("div");
    projectListContainer.innerHTML = projectListHTML;
    // main.appendChild(projectListContainer);
    // END IDEA
    if (projectData.length < 2) {
      console.log("less than 2 projects");

      console.log("making repo button");

      // ADD REPO IF NOT WORKING - TO FIX
      let addRepoBtn = "";
      if (result.data.currentUser) {
        console.log("not making repo button take 2");
        addRepoBtn = makeAnEl("btn", {
          class: ["btn", "btn-lg", "btn-outline-success"],
          innerText: `Add a project from Github`,
          id: "add-project-btn",
        });
        // console.log(addRepoBtn)
      } else {
        console.log("not making repo button");
        let editProjectOne = "";
        let editProjectTwo = "";
        let addRepoBtn = "";

        editProjectOne = makeAnEl("btn", {
          display: "none",
        });
        editProjectTwo = makeAnEl("btn", {
          display: "none",
        });
        addRepoBtn = makeAnEl("btn", {
          display: "none",
        });
      }
      // console.log(addRepoBtn)
    }

    //

    // <div class="bg-dark text-secondary px-4 py-2 mb-1 text-center">
    // <div class="py-3">

    // <div class="bg-dark text-secondary px-4 py-2 mb-3 text-center">
    // <div class="py-1">
    // console.log('repobtn' + addRepoBtn)
    main.innerHTML = `
            <div class="container-lg">
            <div class="row">
            <div class="bg-dark text-secondary px-0 mx-0 my-0 py-0 text-center" style="background-image: url('${makeAnImg(
              1400,
              320
            )})'")>
            <div class="py-5 h-100 w-100" style="background-color: rgba(0, 0, 0, 0.65);">
                        <!-- <h1 class="display-5 fw-bold text-white">Cover Image</h1> -->
                        <img id="projectImage" class="bg-dark text-secondary px-0 mx-0 my-0 py-0 text-center" style="width:100%;" src='${
                          projectData[0].projectimageurl
                        }'/>
                        <div class="col-lg-6 mx-auto">
                            <p class="fs-5 mb-4">Cover image of profile</p>
                            <div id="repo-buttons" class="d-grid gap-4 d-sm-flex justify-content-sm-center pb-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Increase py on hero to make bigger vertically -->
        <div class="container-lg bg-dark text-white">
            <!-- Sidebar stuff -->
            <div class="row" id="project-row">
                <div class="col-md-3 d-flex flex-column text-center">
                    <img src="${
                      avatar ? avatar : ""
                    }" class="user-base-text mx-auto my-4 img-thumbnail rounded-circle" alt="avatar" width="100" height="100">
                    <h3>${githubName ? githubName : ""}</h3>
                    <p>Devs location</p>
                    <br><br>
                    <a href='${githubUrl} style='color: white'>Visit my Git</a>
                    <p class='user-base-text'>${aboutme}</p>
                </div>

        
               

                <!-- Hero image of profile -->
                <div id="first-repo" class="col-md-9 pe-0 text-start">
                <div class="bg-dark text-secondary mx-0 my-0 py-0 text-center" style="background-image: url('${makeAnImg(
                  1320,
                  320
                )})'")>
                <div class="py-5 h-100 w-100" style="background-color: rgba(0, 0, 0, 0.25);">
                            <h1 class="display-5 fw-bold text-white">Cover Image of project 1</h1>
                            <div class="col-lg-6 mx-auto">
                                <p class="fs-5 mb-4">Image goes here</p>

                                <!-- Just testing buttons here-->
                                <div id="edit-repo-buttons" class="d-grid gap-4 d-sm-flex justify-content-sm-center">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Title and project info -->

                    <div class="row py-2">
                        <div class="col-md-12 text-center mb-2">
                            <h2 class="user-base-text text-start">${projectOneGhName ? projectOneGhName : ""}</h2>
                        </div>
                    </div>
                

                    <div class="row">
                        <div class="col md-12">
                            <div class="row text-center py-2">
                                <div class="col-md-6">
                                    <h4 class="text-start">Project image</h4>
                                    <p></p>
                                </div>

                                <div class="col-md-6">
                                <h4 class="text-start">Another project image</h4>
                                    <p></p>
                                </div>
                            </div>
                            <div class="row text-start py-4">
                                <div class="col">
                                    <h4>Project Description</h4>
                                    <p class="user-base-text text-start">${
                                      projectOneDescription ? projectOneDescription : ""
                                    }</p>
                                </div>

                                <!-- <div class="col">
                                    <h4>Project Process</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro non vel excepturi
                                        enim sunt maiores placeat dolor at cum ab!</p>
                                </div> -->
                            </div>
                        </div>


                        <!-- <div class="row">
                        <div class="col md-10">
                            <div class="row text-center py-2 border">
                                <div class="col">
                                    <h4>Project Description</h4>
                                    <p class="user-base-text text-start"></p>
                                </div>

                                <div class="col">
                                    <h4>Project Process</h4>
                                    <p class="user-base-text text-start"></p>
                                </div>
                            </div>

                            <div class="row text-center py-4 border">
                                <div class="col">
                                    <h4>Project Challenges</h4>
                                    <p class="user-base-text text-start"></p>
                                </div>

                                <div class="col">
                                    <h4>Project Outcomes</h4>
                                    <p class="user-base-text text-start"></p>
                                </div>
                            </div>
                        </div> -->

                        <!-- Github info pulled from API -->

                        <!-- <div class="col-md-2 d-flex flex-column border py-2 text-center">
                            <h5>Stuff from github</h5>
                            <p>Languages from repo</p>
                            <p>Some other cool stuff</p>
                            <p class="user-base-text text-start"></p>
                        </div> -->
                    </div>
                </div>

            </div>
        </div>
        `;

    document.getElementById("first-repo").addEventListener("click", function (event) {
      if (event.target.classList.contains("click-to-edit-profile")) {
        renderProjectEdit(projectOne);
      } else {
        renderProject(projectOneRepoid);
      }
    });

    // <!-- MAY NEED TO PUSH THIS FURTHER DOWN OR PUT IN SAME CONTAINER AS ABOVE SO DEV PROFILE INFO WORKS -->

    // <!-- Project cover image -->
    // <div class="container-lg bg-dark text-white border">
    //     <div class="row mt-5">

    //         <div class="col-md-9 offset-md-3">
    //             <div class="col-md-12 gx-0">
    //                 <div class="bg-dark text-secondary px-2 py-2 mb-1 text-center border">
    //                     <div class="py-1">
    //                         <h1 class="display-5 fw-bold text-white">Cover Image of project 2</h1>
    //                         <div class="col-lg-6 mx-auto">
    //                             <p class="fs-5 mb-4">Image goes here</p>

    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>

    //             <!-- Title and project info -->

    //             <div class="row">
    //                 <div class="col-md-12 border text-center mb-2">
    //                     <h2>${projectTwoGhName ? projectTwoGhName : 'no project here'}</h2>
    //                 </div>
    //             </div>

    //             <div class="row">
    //                 <div class="col-md-12">
    //                     <div class="row text-center py-2 border">
    //                         <div class="col-md-6">
    //                             <h4>Project image</h4>
    //                             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro non vel excepturi
    //                                 enim sunt maiores placeat dolor at cum ab!</p>
    //                         </div>

    //                         <div class="col-md-6">
    //                             <h4>Another project image</h4>
    //                             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro non vel excepturi
    //                                 enim sunt maiores placeat dolor at cum ab!</p>
    //                         </div>
    //                     </div>
    //                     <div class="row text-center py-4 border">
    //                         <div class="col">
    //                             <h4>Project Description</h4>
    //                             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro non vel excepturi
    //                                 enim sunt maiores placeat dolor at cum ab!</p>
    //                         </div>
    //                     </div>
    //                 </div>

    //             </div>
    //         </div>
    //     </div>
    // </div>

    //MOVE INTO AN IF LOGGED ON LATER ( BROKEN RIGHT NOW)
    //    const addRepoBtn = makeAnEl('btn', {
    //         class: ['btn', 'btn-lg', 'btn-outline-success'],
    //         innerText: `Add a project from Github`,
    //         id: 'add-project-btn',
    //     });
    //<div class="col-md-9 offset-md-1 border">

    // projectOneDescription = projectOne.description;
    // projectTwoGhName = projectTwo.githubreponame;
    // projectOneGhName = projectOne.githubreponame;
    // console.log(projectOneGhName)
    // // let projectOneGhName = projectOne.githubreponame;
    // let projectOneTitle = projectOne.title;

    // // let projectOneDescription = projectOne.description;
    //     let projectOneImage = projectOne.titleimage;
    //     //should add link in db
    //     let projectOneLink = projectOne.link;
    //     let projectOneChallenges = projectOne.challenges;
    //     let projectOneProcess = projectOne.process;
    //     let projectOneOutcomes = projectOne.outcomes;

    console.log(makeAnImg(1320, 240));
    // console.log(makeAnImg(1300, 150))
    // console.log(makeAnImg(1320, 150))
    // console.log(makeAnImg(1000, 200))

    projectData.forEach((project, index) => {
      if (index > 1) {
        const projectCol = makeAnEl("div");

        projectCol.classList.add("col-md-12", "px-0", "my-3");

        // projectCol.classList.add('col-md-9', 'offset-md-1', 'border');

        // <div class="col-md-9 offset-md-1 border">
        // mx-0 my-0 py-4

        // console.log(project.repoid)

        projectCol.addEventListener("click", (event) => {
          if (event.target.classList.contains("click-to-edit-profile")) {
            renderProjectEdit(project);
          } else {
            renderProject(project.repoid);
          }
        });

        //  <div class="bg-dark text-secondary px-4 py-2 mb-3 text-center" style="background-image: url('${makeAnImg(1320, 240)})'")>
        // <div class="py-1">
        projectCol.innerHTML = `


            <div class="bg-dark text-secondary mx-0 my-0 py-0 text-center" style="background-image: url('${makeAnImg(
              1320,
              300
            )})'")>
                <div id="${project.repoid}" class="py-5 h-100 w-100" style="background-color: rgba(0, 0, 0, 0.25);">
                    <h1 class="display-5 fw-bold text-white">Cover Image of project 1</h1>
                    <div class="col-lg-6 mx-auto">
                        <p class="fs-5 mb-4">Image goes here</p>

                        
                        <div class="d-grid gap-4 d-sm-flex justify-content-sm-center">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Title and project info -->

            <div class="row py-2">
                <div class="col-md-12 text-center mb-2">
                <h2 class="user-base-text text-start">${project.githubreponame ? project.githubreponame : ""}</h2>
                </div>
            </div>


            <div class="row">
                <div class="col md-12">
                    <div class="row text-center py-2">
                        <div class="col-md-6">
                            <h4 class="user-base-text text-start">Project image</h4>
                            <p class="user-base-text text-start"></p>
                        </div>

                        <div class="col-md-6">
                            <h4 class="user-base-text text-start">Another project image</h4>
                            <p class="user-base-text text-start"></p>
                        </div>
                    </div>
                    <div class="row text-center py-4">
                        <div class="col">
                            <h4 class="user-base-text text-start">Project Description</h4>
                            <p class="user-base-text text-start">${project.description ? project.description : ""}</p>
                        </div>

                        <!-- <div class="col">
                            <h4>Project Process</h4>
                            <p class="user-base-text text-start"></p>
                        </div> -->
                    </div>
                </div>


                <!-- <div class="row">
                <div class="col md-10">
                    <div class="row text-center py-2">
                        <div class="col">
                            <h4>Project Description</h4>
                            <p class="user-base-text text-start"></p>
                        </div>

                        <div class="col">
                            <h4>Project Process</h4>
                            <p class="user-base-text text-start"></p>
                        </div>
                    </div>

                    <div class="row text-center py-4 border">
                        <div class="col">
                            <h4>Project Challenges</h4>
                            <p class="user-base-text text-start"></p>
                        </div>

                        <div class="col">
                            <h4>Project Outcomes</h4>
                            <p class="user-base-text text-start"></p>
                        </div>
                    </div>
                </div> -->

                <!-- Github info pulled from API -->

                <!-- <div class="col-md-2 d-flex flex-column border py-2 text-center">
                    <h5>Stuff from github</h5>
                    <p>Languages from repo</p>
                    <p>Some other cool stuff</p>
                    <p class="user-base-text text-start"></p>
                </div> -->
            </div>
        </div>
        `;

        // console.log(editProjectBtn);
        // console.log(project.repoid);

        let projectDiv = document.getElementById(`${project.repoid}`);
        // .appendChild(editProjectBtn);

        // console.log(projectDiv)

        let projectRow = document.getElementById("project-row");

        projectRow.appendChild(projectCol);
      }
    });

    projectData.forEach((project, index) => {
      if (index > 1 && result.data.currentUser) {
        // console.log(project.repoid)
        if (document.getElementById(`${project.repoid}`)) {
          const editProjectBtn = makeAnEl("btn", {
            class: ["btn", "click-to-edit-profile", "btn-outline-light"],
            innerText: `Edit ${project.githubreponame}`,
          });
          editProjectBtn.addEventListener("click", () => {
            renderProjectEdit(project.githubreponame);
          });
          document.getElementById(`${project.repoid}`).appendChild(editProjectBtn);
          // document.getElementById(`${project.repoid}`).addEventListener('click', () => {
          //     renderProject(project.repoid)
          // })
        }
      }
    });
    // console.log(result.data.currentUser)

    const userBaseText = document.querySelectorAll(".user-base-text");
    for (const each of userBaseText) {
      if (each.textContent == "" || each.textContent == "null") {
        each.textContent = "Not yet added";
        each.style.color = "#a1a1a1ff";
        each.style.fontWeight = "300";
      } else {
        each.style.fontWeight = "400";
      }
    }

    // console.log(userBaseText)

    document.getElementById("repo-buttons").appendChild(addRepoBtn);
    addRepoBtn.addEventListener("click", () => {
      renderRepoListBs(`${githubName}`);
    });

    document.getElementById("edit-repo-buttons").appendChild(editProjectOne);
    // document.getElementById('edit-repo-buttons').appendChild(editProjectTwo)
    editProjectOne.addEventListener("click", () => {
      //renderProjectEdit(`${projectOneGhName}`)
    });
    editProjectTwo.addEventListener("click", () => {
      renderProjectEdit(`${projectTwoGhName}`);
    });
  });
}

export function renderProfileTemplate(usersName) {
  const main = document.getElementById("main");
  main.innerHTML = "";

  main.innerHTML = `
            <div class="container-lg">
            <div class="row">
                <div class="bg-dark text-secondary px-4 py-2 mb-1 text-center">
                    <div class="py-3">
                        <h1 class="display-5 fw-bold text-white">Cover Image</h1>
                        <div class="col-lg-6 mx-auto">
                            <p class="fs-5 mb-4">Cover image of profile</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Increase py on hero to make bigger vertically -->
        <div class="container-lg bg-dark text-white border">
            <!-- Sidebar stuff -->
            <div class="row">
                <div class="col-md-2  d-flex flex-column text-center border">
                    <h3>Devs name</h3>
                    <p>Devs location</p>
                    <br><br>
                    <p>Dev socials</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor minima cupiditate qui sed modi
                        assumenda rem, exercitationem voluptatibus voluptate repudiandae!</p>
                </div>


                <!-- Hero image of profile -->
                <div class="col-md-9 offset-md-1 border">
                    <div class="bg-dark text-secondary px-4 py-2 mb-3 text-center">
                        <div class="py-1">
                            <h1 class="display-5 fw-bold text-white">Cover Image of project 1</h1>
                            <div class="col-lg-6 mx-auto">
                                <p class="fs-5 mb-4">Image goes here</p>

                                <!-- Optional buttons -->
                                <!-- <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <button type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">Custom button</button>
                    <button type="button" class="btn btn-outline-light btn-lg px-4">Secondary</button>
                    </div> -->
                            </div>
                        </div>
                    </div>

                    <!-- Title and project info -->

                    <div class="row border py-2">
                        <div class="col-md-12 text-center mb-2">
                            <h2>Project 1</h2>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col md-12">
                            <div class="row text-center py-2 border">
                                <div class="col-md-6">
                                    <h4>Project image</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro non vel excepturi
                                        enim sunt maiores placeat dolor at cum ab!</p>
                                </div>

                                <div class="col-md-6">
                                    <h4>Another project image</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro non vel excepturi
                                        enim sunt maiores placeat dolor at cum ab!</p>
                                </div>
                            </div>
                            <div class="row text-center py-4 border">
                                <div class="col">
                                    <h4>Project Description</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro non vel excepturi
                                        enim sunt maiores placeat dolor at cum ab!</p>
                                </div>

                                <!-- <div class="col">
                                    <h4>Project Process</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro non vel excepturi
                                        enim sunt maiores placeat dolor at cum ab!</p>
                                </div> -->
                            </div>
                        </div>


                        <!-- <div class="row">
                        <div class="col md-10">
                            <div class="row text-center py-2 border">
                                <div class="col">
                                    <h4>Project Description</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro non vel excepturi
                                        enim sunt maiores placeat dolor at cum ab!</p>
                                </div>

                                <div class="col">
                                    <h4>Project Process</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro non vel excepturi
                                        enim sunt maiores placeat dolor at cum ab!</p>
                                </div>
                            </div>

                            <div class="row text-center py-4 border">
                                <div class="col">
                                    <h4>Project Challenges</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro non vel excepturi
                                        enim sunt maiores placeat dolor at cum ab!</p>
                                </div>

                                <div class="col">
                                    <h4>Project Outcomes</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro non vel excepturi
                                        enim sunt maiores placeat dolor at cum ab!</p>
                                </div>
                            </div>
                        </div> -->

                        <!-- Github info pulled from API -->

                        <!-- <div class="col-md-2 d-flex flex-column border py-2 text-center">
                            <h5>Stuff from github</h5>
                            <p>Languages from repo</p>
                            <p>Some other cool stuff</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                        </div> -->
                    </div>
                </div>

            </div>
        </div>


        <!-- MAY NEED TO PUSH THIS FURTHER DOWN OR PUT IN SAME CONTAINER AS ABOVE SO DEV PROFILE INFO WORKS -->


        <!-- Project cover image -->
        <div class="container-lg bg-dark text-white border">
            <div class="row mt-5">

                <div class="col-md-9 offset-md-3">
                    <div class="col-md-12 gx-0">
                        <div class="bg-dark text-secondary px-2 py-2 mb-1 text-center border">
                            <div class="py-1">
                                <h1 class="display-5 fw-bold text-white">Cover Image of project 2</h1>
                                <div class="col-lg-6 mx-auto">
                                    <p class="fs-5 mb-4">Image goes here</p>


                                </div>
                            </div>
                        </div>
                    </div>



                    <!-- Title and project info -->



                    <div class="row">
                        <div class="col-md-12 border text-center mb-2">
                            <h2>Project 2</h2>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-md-12">
                            <div class="row text-center py-2 border">
                                <div class="col-md-6">
                                    <h4>Project image</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro non vel excepturi
                                        enim sunt maiores placeat dolor at cum ab!</p>
                                </div>

                                <div class="col-md-6">
                                    <h4>Another project image</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro non vel excepturi
                                        enim sunt maiores placeat dolor at cum ab!</p>
                                </div>
                            </div>
                            <div class="row text-center py-4 border">
                                <div class="col">
                                    <h4>Project Description</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro non vel excepturi
                                        enim sunt maiores placeat dolor at cum ab!</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    `;

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
}
