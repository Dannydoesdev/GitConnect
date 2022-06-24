import { makeAnImg } from '../../utils/dom-create.js';
import { makeAnEl } from '../../utils/dom-create.js';
import { renderProjectEdit } from './render-project-edit.js';
import { renderProject } from './render-project.js';
import { renderRepoListBs } from './render-repo-search.js';

export function renderProfile(id) {
    console.log(id)
    // username = username.toLowerCase();
    const main = document.getElementById("main");
    main.innerHTML = "";

    const results = document.getElementById('results')
    results.removeAttribute('class');
    results.innerHTML = ""

    axios.get(`/api/profiles/profilepage/${id}`).then((result) => {
        console.log(result)
        
        
        // Result contains info on profile and projects - seperate profile data
        let profileData = result.data.user;
        console.log(profileData)



        let avatar = "";
        // Assign standard variables from profile response that we want to utilise
        if (profileData.githubavatar === null) {
            avatar = makeAnImg(200, 300);
        } else {
            avatar = profileData.githubavatar;
        };
       
      
        
        let githubName = profileData.githubname;
        let firstName = profileData.firstname;
        let lastName = profileData.lastname;
        let aboutme = profileData.aboutme;
        let mobile = profileData.mobile;
        //TYPO IN DB
        let githubUrl = profileData.githubutrl;


        // Seperate project data in response
        let projectData = result.data.projects;
  
         // Create vars outside of if statement to call in other scope - null if less than one project for new users to work
        let projectOne = ""; 
        let projectOneDescription = "";
         let projectOneRepoid = "";
         let projectOneGhName = "";
         let projectOneTitle = "";
         let projectOneImage = "";
         let projectOneLink = "";
         let projectOneChallenges = "";
         let projectOneProcess = "";
         let projectOneOutcomes = "";
         let projectOneRepoName = "";


        // NOTE - Project 1 has special requirements in styling so we call this separately
        // Need to check there is at least one project otherwise keep it blank
        if (projectData.length >= 1) {
           projectOne = projectData[0];

            projectOneDescription = projectOne.description;
            projectOneRepoid = projectOne.repoid;
            projectOneGhName = projectOne.githubreponame;
            let projectOneTitle = projectOne.title;
            let projectOneImage = projectOne.titleimage;
            // let projectOneLink = projectOne.link;
            let projectOneChallenges = projectOne.challenges;
            let projectOneProcess = projectOne.process;
            let projectOneOutcomes = projectOne.outcomes;
            projectOneRepoName = projectOne.githubreponame;
            console.log(projectOneRepoName)

        }

        // Calling edit project buttons outside if for scope to work
        let editProjectOne = '';
        let addRepoBtn = '';

        // If there is more than 1 project and the user is the owner of the project, show edit and add buttons

        if (result.data.currentUser && projectData.length >= 1) {
            editProjectOne = makeAnEl('btn', {
                class: ['btn', 'click-to-edit-profile', 'btn-outline-light'],
                innerText: `Edit ${projectOneRepoName}`,
                id: 'edit-project-1',
                onclick: `renderEditProject(${projectOneRepoName})`
            });
            addRepoBtn = makeAnEl('btn', {
                class: ['btn', 'btn-lg', 'btn-outline-success'],
                innerText: `Add a project from Github`,
                id: 'add-project-btn',
            });
        } else if (result.data.currentUser && projectData.length < 1) {
            console.log('this is not the current user')
            editProjectOne = makeAnEl('btn', {
                display: 'none',
            });
            addRepoBtn = makeAnEl('btn', {
                class: ['btn', 'btn-lg', 'btn-outline-success'],
                innerText: `Add a project from Github`,
                id: 'add-project-btn',
            });
        } else {
            console.log('this is not the current user')
            editProjectOne = makeAnEl('btn', {
                display: 'none',
            });
            addRepoBtn = makeAnEl('btn', {
                display: 'none',
            });
        }

          
        // Create the main container, profile info and first project column
    main.innerHTML = `
            <div class="container-lg">
            <div class="row">
            <div class="bg-dark text-secondary px-0 mx-0 my-0 py-0 text-center" style="background-image: url('${makeAnImg(1400, 320)})'")>
            <div class="py-5 h-100 w-100" style="background-color: rgba(0, 0, 0, 0.65);">
                        <h1 class="display-5 fw-bold text-white">Cover Image</h1>
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
                    <img src="${avatar ? avatar : ''}" class="user-base-text mx-auto my-4 img-thumbnail rounded-circle" alt="avatar" width="100" height="100">
                    <h3>${githubName ? githubName : ''}</h3>
                    <p>Devs location</p>
                    <br><br>
                    <a href='${githubUrl} style='color: white'>Visit my Git</a>
                    <p class='user-base-text'>${aboutme}</p>
                </div>

                <!-- Hero image of profile -->
                <div id="first-repo" class="col-md-9 pe-0 text-start">
                <div class="bg-dark text-secondary mx-0 my-0 py-0 text-center" style="background-image: url('${makeAnImg(1320, 320)})'")>
                <div class="py-5 h-100 w-100" style="background-color: rgba(0, 0, 0, 0.25);">
                            <h1 class="display-5 fw-bold text-white">Cover Image of ${projectOneGhName ? projectOneGhName : 'First Project'}</h1>
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
                            <h2 class="user-base-text text-start">${projectOneGhName ? projectOneGhName : ''}</h2>
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
                                    <p class="user-base-text text-start">${projectOneDescription ? projectOneDescription : ''}</p>
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

        // Add event listener to go to individual project page when you click div or edit project page when you click the edit btn
        document.getElementById('first-repo').addEventListener('click', function (event) {
            if (event.target.classList.contains('click-to-edit-profile')) {
                renderProjectEdit(projectOne)
            } else {
                renderProject(projectOneRepoid)
            }
            
        })

        // Just testing different img sizes
        console.log(makeAnImg(1320, 240))
        console.log(makeAnImg(1300, 150))
        console.log(makeAnImg(1320, 150))
        console.log(makeAnImg(1000, 200))

        // For projects 2 onward, we use a loop as these are standard styling
        projectData.forEach((project, index) => {
            if (index >= 1) {
                const projectCol = makeAnEl('div')
                projectCol.classList.add('col-md-12', 'px-0', 'my-3');
                console.log(project.repoid)
                console.log(project)
                // Add an event listener to the block to go to the individual project when clicked - or edit project when button is clicked

                projectCol.addEventListener('click', (event) => {
                    if (event.target.classList.contains('click-to-edit-profile')) {
                        renderProjectEdit(project)
                    } else {
                        renderProject(project.repoid)
                    }
                })
              
                //  <div class="bg-dark text-secondary px-4 py-2 mb-3 text-center" style="background-image: url('${makeAnImg(1320, 240)})'")>
                // <div class="py-1">
            projectCol.innerHTML = `

            <div class="bg-dark text-secondary mx-0 my-0 py-0 text-center" style="background-image: url('${makeAnImg(1320, 300)})'")>
                <div id="${project.repoid}" class="py-5 h-100 w-100" style="background-color: rgba(0, 0, 0, 0.25);">
                    <h1 class="display-5 fw-bold text-white">Cover Image of ${project.githubreponame ? project.githubreponame : 'Project'}</h1>
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
                <h2 class="user-base-text text-start">${project.githubreponame ? project.githubreponame : ''}</h2>
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
                            <p class="user-base-text text-start">${project.description ? project.description : ''}</p>
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
        `
                                                  
            let projectRow = document.getElementById('project-row')      
            projectRow.appendChild(projectCol);
                
            };
        });
        
 
        // In order for the appending of edit buttons - a new loop is required (doesn't work in same promise above) - test
        projectData.forEach((project, index) => {
            if (index >= 1 && result.data.currentUser) {
                console.log(project.repoid)
                if (document.getElementById(`${project.repoid}`)) {
                    const editProjectBtn = makeAnEl('btn', {
                        class: ['btn', 'click-to-edit-profile', 'btn-outline-light'],
                        innerText: `Edit ${project.githubreponame}`,
                    });
                    // editProjectBtn.addEventListener('click', () => {
                    //     renderProjectEdit(project)
                    // });
                    document.getElementById(`${project.repoid}`).appendChild(editProjectBtn);
                }
            }
        });
        console.log(result.data.currentUser)
        
        // Add filler text if the user has not filled out information for relevant sections
        const userBaseText = document.querySelectorAll('.user-base-text')
        for (const each of userBaseText) {
            if (each.textContent == "" || each.textContent == "null") {
                each.textContent = "Not yet added"
                each.style.color = "#a1a1a1ff"
                each.style.fontWeight = "300"
            } else {
                each.style.fontWeight = "400"
            }
        }

        // set up the 'add repo' button at the top of the page - if the user is logged in
        document.getElementById('repo-buttons').appendChild(addRepoBtn);
        addRepoBtn.addEventListener('click', () => {
            console.log(`render repo search clicked name + id = ${githubName} & ${id}`)
            renderRepoListBs(githubName, id)
        });

        // Set up the edit project button for the first project
        document.getElementById('edit-repo-buttons').appendChild(editProjectOne)
//         editProjectOne.addEventListener('click', () => {
//             renderProjectEdit(`${projectOne}`)
//         });

});
}