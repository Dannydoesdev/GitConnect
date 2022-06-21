
import { makeAnEl } from '../../utils/dom-create.js';
import { renderProjectEdit } from './render-project-edit.js';

export function renderProfile(username) {
    const main = document.getElementById("main");
    main.innerHTML = "";

    // API RETURN:

    // id SERIAL PRIMARY KEY,
    // githubName TEXT,
    // email TEXT UNIQUE,
    // userType SMALLINT REFERENCES userTypes(id) NOT NULL,
    // profiletype SMALLINT REFERENCES profiletype(id),
    // firstName VARCHAR(20),
    // lastName VARCHAR(30),
    // photo TEXT,
    // aboutmetitle TEXT,
    // aboutme TEXT,
    // mobile VARCHAR(16),
    // portfoliolink TEXT,
    // githubutrl TEXT,
    // gitHubAvatar TEXT,
    // gitHubrepos_url TEXT,
    // gitHubFullName TEXT,
    // gitHubCompany TEXT,
    // gitHubBlog TEXT,
    // gitHubTwitter TEXT,
    // gitHubHirable TEXT,
    // gitHubLocation TEXT,
    // gitHubBio TEXT,
    // gitHubMemberSince TEXT
    // CONSTRAINT validate_email CHECK (email LIKE '%___@___%__%')

    axios.get(`/api/profiles/profilepage/${username}`).then((result) => {
        console.log(result)
        // if (result.data.success) {
        //     console.log(result)
        // } else {
        //     console.log("RESULTS", result.data.success);
        // }


        let profileData = result.data.user;
        // console.log(profileData)
        for (let data in profileData) {
            // console.log(`${data} ${profileData[data]}`)
        }
        let email = profileData.email;
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
        // console.log(projectData)
        projectData.forEach((project) => {
            // console.log(project)
        })

        // projectResults.map((result) => {
        //     let id = result.userid
        //     let sql = `SELECT * FROM projects WHERE userid = ${id}`
        //     db.query(sql).then((result) => {
        //         usersAndProject.projects.userid = result.githubname
        //     })
        // })


        let projectOne = projectData[0];
        console.log(projectOne)
        let projectTwo = projectData[1];
        let projectThree = projectData[2];

        let projectOneGhName = projectOne.githubreponame;
        let projectOneTitle = projectOne.title;
        let projectOneDescription = projectOne.description;
        let projectOneImage = projectOne.titleimage;
        //should add link in db
        let projectOneLink = projectOne.link;
        let projectOneChallenges = projectOne.challenges;
        let projectOneProcess = projectOne.process;
        let projectOneOutcomes = projectOne.outcomes;

        let projectTwoGhName = projectTwo.githubreponame;
        let projectTwoTitle = projectTwo.title;
        let projectTwoDescription = projectTwo.description;
        let projectTwoImage = projectTwo.titleimage;
        //should add link in db
        let projectTwoLink = projectTwo.link;
        let projectTwoChallenges = projectTwo.challenges;
        let projectTwoProcess = projectTwo.process;
        let projectTwoOutcomes = projectTwo.outcomes;

        //EDIT IF LOGGED IN:
        // suggest limiting projects to 3 for simplicity for now

        let editProjectOne = ''
        let editProjectTwo = ''
        

        if (result.data.currentUser) {
            console.log('this is the current user')
            editProjectOne = makeAnEl('btn', {
                class: ['btn', 'btn-outline-light'],
                innerText: `Edit ${projectOneGhName}`,
                id: 'edit-project-1',
                onclick: `renderEditProject(${projectOneGhName})`
            });
            editProjectTwo = makeAnEl('btn', {
                class: ['btn', 'btn-outline-light'],
                innerText: `Edit ${projectTwoGhName}`,
                id: 'edit-project-2',
                onclick: `renderEditProject(${projectTwoGhName})`
            });
            console.log(editProjectOne)
            console.log(editProjectTwo)

        } else {
            console.log('this is not the current user')
            let editProjectOne = makeAnEl('btn', {
                display: 'none',
            });
            let editProjectTwo = makeAnEl('btn', {
                display: 'none',
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
            `
        })

        //ignore this bit for now
        let projectListHTML = projectList.join("");
        // console.log(projectListHTML)
        let projectListContainer = document.createElement("div");
        projectListContainer.innerHTML = projectListHTML;
        // main.appendChild(projectListContainer);
        // END IDEA

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
                    <img src="${avatar}" class="mx-auto my-4 img-thumbnail rounded-circle" alt="avatar" width="100" height="100">
                    <h3>${githubName}</h3>
                    <p>Devs location</p>
                    <br><br>
                    <a href='${githubUrl}'>Visit my Git</a>
                    <p>${aboutme} - aboutme goes here</p>
                </div>

                <!-- Hero image of profile -->
                <div class="col-md-9 offset-md-1 border">
                    <div class="bg-dark text-secondary px-4 py-2 mb-3 text-center">
                        <div class="py-1">
                            <h1 class="display-5 fw-bold text-white">Cover Image of project 1</h1>
                            <div class="col-lg-6 mx-auto">
                                <p class="fs-5 mb-4">Image goes here</p>

                                <!-- Just testing buttons here-->
                    <div id="hero-buttons" class="d-grid gap-4 d-sm-flex justify-content-sm-center">
                    </div>
                            </div>
                        </div>
                    </div>

                    <!-- Title and project info -->

                    <div class="row border py-2">
                        <div class="col-md-12 text-center mb-2">
                            <h2>${projectOneGhName}</h2>
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
                                    <p>${projectOneDescription} OR Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
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
                            <h2>${projectTwoGhName}</h2>
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
        
        document.getElementById('hero-buttons').appendChild(editProjectOne)
        document.getElementById('hero-buttons').appendChild(editProjectTwo)
        editProjectOne.addEventListener('click', () => {
            renderProjectEdit(`${projectOneGhName}`)
        });
        editProjectTwo.addEventListener('click', () => {
            renderProjectEdit(`${projectTwoGhName}`)
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