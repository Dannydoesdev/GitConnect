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
       
      
        let location = profileData.githublocation;
        let githubName = profileData.githubname;
        let firstName = profileData.firstname;
        let lastName = profileData.lastname;
        let aboutme = profileData.aboutme;
        let mobile = profileData.mobile;
        let memberSince = profileData.githubmembersince;
        // console.log(projectimageurl)
        //TYPO IN DB
        let githubuserurl = profileData.githubuserurl;


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
        let projectOneLanguage = "";
        let projectOneRepoUrl = "";
        let projectOneLicense = "";
        let projectOneCreatedAt = "";
        let projectOneUpdatedAt = "";
        let projectOneImageUrl = "";

        // NOTE - Project 1 has special requirements in styling so we call this separately
        // Need to check there is at least one project otherwise keep it blank
        if (projectData.length >= 1) {
           projectOne = projectData[0];
            console.log(projectOne)
           projectOneUpdatedAt = projectOne.updated_at;
           projectOneCreatedAt = projectOne.created_at;
           projectOneLicense = projectOne.license;
           projectOneLanguage = projectOne.langone;
           projectOneRepoUrl = projectOne.githubuserurl;
            projectOneDescription = projectOne.description;
            projectOneRepoid = projectOne.repoid;
            projectOneGhName = projectOne.githubreponame;
            projectOneTitle = projectOne.title;
            projectOneImage = projectOne.titleimage;
            projectOneLink = projectOne.htmlurl;
            projectOneChallenges = projectOne.challenges;
            projectOneProcess = projectOne.process;
            projectOneOutcomes = projectOne.outcomes;
            projectOneRepoName = projectOne.githubreponame;
            projectOneImageUrl = projectOne.projectimageurl;
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
                // onclick: `renderEditProject(${projectOneRepoName})`
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

        //USE THIS FOR IMAGES (or similar, change makeAnImg width and height + bootstrap classes as needed)
        // <p class="text-start">License:</p><p class="text-start"></p>
        // <div class="bg-dark text-secondary px-0 mx-0 my-0 py-0 text-center" style="background-image: url('${projectOneImageUrl ? projectOneImageUrl : makeAnImg(1320, 300)}')")>
        
        // From github div:
           // <p>Languages from repo</p>
                            // <p>Some other cool stuff</p>
 // <p class="text-start">Languages:</p>
        // Create the main container, profile info and first project column


{/* <p class="text-start sidebar-text" style="color: rgb(161, 161, 161);font-weight: 400;">Main Language: ${projectOneLanguage ? projectOneLanguage : ''}</p>
                                <p class="text-start sidebar-text" style="color: rgb(161, 161, 161);font-weight: 400;">License: ${projectOneLicense ? projectOneLicense : ''}</p>
                                <p class="text-start sidebar-text" style="color: rgb(161, 161, 161);font-weight: 400;">Created at: ${projectOneCreatedAt.slice(0,10)}</p> */}

    main.innerHTML = `
<div class="container-xxl">
    <div class="row">
        <div class="rounded bg-dark text-secondary px-0 mx-0 my-0 py-0 text-center" style="background-image: url('${makeAnImg(1400, 320)}')")>
            <div class="py-5 h-100 w-100" style="background-color: rgba(0, 0, 0, 0.65);">
                        <h1 class="display-5 fw-bold text-white">${githubName}</h1>
                        <div class="col-lg-6 mx-auto">
                            <p class="fs-5 mb-4"></p>
                            <div id="repo-buttons" class="d-grid gap-4 d-sm-flex justify-content-sm-center pb-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Increase py on hero to make bigger vertically -->
        <div class="rounded container-xxl bg-dark text-white">
            <!-- Sidebar stuff -->
            <div class="row" id="project-row">
                <div class="rounded col-md-3 pt-4 d-flex flex-column text-center"  style="background-color: rgba(0, 0, 0, 0.25);">
                    <img src="${avatar ? avatar : ''}" class="user-base-text mx-auto my-4 img-thumbnail rounded-circle" alt="avatar" width="100" height="100">
                    <h3>${githubName ? githubName : ''}</h3>
                    <p class='user-base-text'>${location ? location : ''}</p>
                    <br><br>
                    <img src="./img/ghlogo-w.png" alt="Githublogo" width="32" height="32" class="click-to-github mx-auto rounded-circle border border-white">
                    <a href='https://github.com/${githubName}' style='color: white'>Visit my Git</a>
                    <p class='user-base-text'>${aboutme}</p>
                </div>

                <!-- Hero image of profile -->
                <div id="first-repo" class="rounded col-md-9 pe-0 text-start" style="padding-left: 0;">
                    <div class="rounded bg-dark text-secondary mx-0 my-0 py-0 text-center" style="background-size:cover;background-image:url('${projectOneImageUrl ? projectOneImageUrl : makeAnImg(1320, 300)}');")>
                        <div class="rounded py-5 h-100 w-100" style="background-color: rgba(0, 0, 0, 0.25);">
                            <h1 class="display-5 fw-bold text-white">${projectOneGhName ? projectOneGhName : 'First Project'}</h1>
                            <div class="col-lg-6 mx-auto">
                                <p class="fs-5 mb-4"></p>
                                <div id="edit-repo-buttons" class="d-grid gap-4 d-sm-flex justify-content-sm-center"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Title and project info -->

                    
                <div class="rounded row" style="background-color: rgba(0, 0, 0, 0.15);">
                    <div class="rounded col-md-12">
                        <div class="rounded row text-start" >
                            <div class="col p-4 m-3 rounded" style="background-color: #272A30">
                                <h4>Project Description</h4>
                                <p class="user-base-text text-start">${projectOneDescription ? projectOneDescription : ''}</p>
                            </div>

                            <div class="col p-4 m-3 rounded" style="background-color: #272A30"> 
                                <h4>Github Info</h4>
                                <p class="text-start sidebar-text">Main Language: ${projectOneLanguage ? projectOneLanguage : ''}</p>
                                <p class="text-start sidebar-text">License: ${projectOneLicense ? projectOneLicense : ''}</p>
                                <p class="text-start sidebar-text">Created at: ${projectOneCreatedAt.slice(0,10)}</p>
                            </div>                        
                        </div>
                    </div>
                </div>
                <div class="rounded row" style="background-color: rgba(0, 0, 0, 0.15);">
                    <div class="rounded col-md-12">
                        <div class="rounded row text-center">
                            <div class="col p-4 m-3 rounded" style="background-color: #272A30">
                                <h4 class="text-start">Project Process</h4>
                                <p class="user-base-text text-start">${projectOneProcess ? projectOneProcess : ''}</p>
                            </div>
                            <div class="col p-4 m-3 rounded" style="background-color: #272A30">
                                <h4 class="text-start">Project Outcomes</h4>
                                <p class="user-base-text text-start">${projectOneOutcomes ? projectOneOutcomes : ''}</p>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        `;

        // Add event listener to go to individual project page when you click div or edit project page when you click the edit btn
        document.getElementById('first-repo').addEventListener('click', function (event) {
            if (event.target.classList.contains('click-to-edit-profile')) {
                renderProjectEdit(projectOne);
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
                projectCol.classList.add('col-md-12', 'rounded', 'px-0', 'my-3');
                console.log(project.repoid)
                console.log(project)
                // console.log(project.projectimageurl)
                // Add an event listener to the block to go to the individual project when clicked - or edit project when button is clicked

                projectCol.addEventListener('click', (event) => {
                    if (event.target.classList.contains('click-to-edit-profile')) {
                        renderProjectEdit(project);
                    } else {
                        renderProject(project.repoid)
                    }
                })
              

    

            projectCol.innerHTML = `
            
            <div class="rounded bg-dark text-secondary mx-0 my-0 py-0 text-center" style="background-size:cover;background-image: url('${project.projectimageurl ? project.projectimageurl : makeAnImg(1320, 300)}')">
                <div id="${project.repoid}" class="rounded py-5 h-100 w-100" style="background-color: rgba(0, 0, 0, 0.25);">
                    <h1 class="display-5 fw-bold text-white">${project.githubreponame ? project.githubreponame : 'Project'}</h1>
                    <div class="col-lg-6 mx-auto">
                        <p class="fs-5 mb-4"></p> 
                        <div class="d-grid gap-4 d-sm-flex justify-content-sm-center"></div>
                    </div>
                </div>
            </div>

            <!-- Title and project info -->

  

            <div class="rounded row" style="background-color: rgba(0, 0, 0, 0.15);">
                    <div class="rounded col md-12">
                        <div class="rounded mt-2 row text-start">
                            <div class="col p-4 m-3 rounded" style="background-color: #272A30">
                                <h4>Project Description</h4>
                                <p class="user-base-text text-start">${project.description ? project.description : ''}</p>
                            </div>
                            <div class="col p-4 m-3 rounded" style="background-color: #272A30"> 
                                <h4>GitHub info</h4>
                                <p class="text-start sidebar-text">Main Language: ${project.langone ? project.langone : ''}</p>
                                <p class="text-start sidebar-text">License: ${project.license ? project.license : ''}</p>
                                <p class="text-start sidebar-text" style="color: rgb(161, 161, 161);font-weight: 300;">Created at: ${project.created_at.slice(0,10)}<p>                   
                            </div>                                 
                        </div>
                    </div>
                </div>
                <div class="rounded row" style="background-color: rgba(0, 0, 0, 0.15);">
                    <div class="rounded col md-12">
                        <div class="rounded mb-2 row text-center">
                            <div class="col p-4 m-3 rounded" style="background-color: #272A30">
                                <h4 class="text-start">Project Process</h4>
                                <p class="user-base-text text-start">${project.process ? project.process : ''}</p>
                            </div>
                            <div class="col p-4 m-3 rounded" style="background-color: #272A30">
                                <h4 class="text-start">Project Outcomes</h4>
                                <p class="user-base-text text-start">${project.outcomes ? project.outcomes : ''}</p>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>

        `;
                
                                                  
            let projectRow = document.getElementById('project-row')      
            projectRow.appendChild(projectCol);
                
            };
        });
        
 
        // In order for the appending of edit buttons - a new loop is required (doesn't work in same promise above) - test
        projectData.forEach((project, index) => {
            if (index >= 1 && result.data.currentUser) {
                console.log("project.repoid",project.repoid)
                if (document.getElementById(`${project.repoid}`)) {
                    const editProjectBtn = makeAnEl('btn', {
                        class: ['btn', 'click-to-edit-profile', 'btn-outline-light'],
                        innerText: `Edit ${project.githubreponame}`,
                    });

                 
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