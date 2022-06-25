import { makeAnImg } from "../../utils/dom-create.js";
import { renderProfile } from "./render-profile.js";

export function renderProject(repoid) {
    // clear main HTML
    const main = document.getElementById("main");
    main.innerHTML = "";

    const results = document.getElementById('results')
    results.innerHTML = "";
    results.removeAttribute('class');
    
    axios.get(`/api/projects/${repoid}`)
    .then(dbRes => {
        // console.log(dbRes)

        dbRes.data.map((user) => {
            console.log(user);
            // ---- need to pull app link from project-edit ----
            let repoid = user.repoid;
            let username = user.githubname;
            let repoName = user.githubreponame;
            let avatar = user.githubavatar;
            let location = user.githublocation;
            let userid = user.id;
            let projectName = user.projectname;
            let challenges = user.challenges;
            let outcomes = user.outcomes;
            let process = user.process; 
            let description = user.description;
            let appLink = user.app_link;
           
            main.innerHTML = `
            <!-- Increase py on hero to make bigger vertically -->
            <div class="container-lg bg-dark text-white">
                <!-- Sidebar stuff -->
                <div class="row">
                    <div class="col-md-2 pt-4 d-flex flex-column text-center" style="background-color: rgba(0, 0, 0, 0.25);">
                        <img id="profile-picture" src="${avatar ? avatar : 'unknown'}" class="mx-auto my-4 img-thumbnail rounded-circle" alt="avatar" width="100" height="100">
                        <h3>${username}</h3>
                        <p id="user-location">${location}</p>
                        <div>
                            <a target="_blank" href="https://twitter.com"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16" style="margin:2px;">
                                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                            </svg></a>
                            <a target="_blank" href="https://facebook.com/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16" style="margin:2px;">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                            </svg></a>
                            <a target="_blank" href="mailto: abc@example.com"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16" style="margin:2px;">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                            </svg></a>
                        </div>
                    </div>

                    <!-- Hero image or carousel of project photos -->
                    <div class="col-md-10">
                        <div class="row">
                            <div class="bg-dark text-secondary px-0 mx-0 my-0 py-0 text-center" style="background-image: url('${makeAnImg(1400, 320)}')">
                                <div class="py-1">
                                    <h1 class="display-5 fw-bold text-white" style="height:300px"></h1>
                                    <div class="col-lg-6 mx-auto">
                                    
                                        <!-- Optional buttons -->
                                        <!-- <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            <button type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">Custom button</button>
                            <button type="button" class="btn btn-outline-light btn-lg px-4">Secondary</button>
                                    </div> -->
                                </div>
                            </div>
                        </div>    
                    </div>

                        <!-- Title and project info -->

                        <div class="row py-2">
                            <div class="col-md-12 text-center py-4">
                                <h2 class="display-5 fw-bold">${projectName ? projectName : 'Project Title'}</h2>
                                <p style="color: #a1a1a1ff; margin-bottom: 0;">/${repoName} on 
                                <a target="_blank" href="https://github.com/${username}/${repoName}" style="color: #a1a1a1ff; margin-bottom: 0;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                    </svg>
                                </a></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col md-10" style="background-color: rgba(0, 0, 0, 0.15);">
                                <div class="row mt-2 stext-center">
                                    <div class="col p-4 m-3 rounded" style="background-color: #272A30">
                                        <h4 class="text-start">Project Description</h4>
                                        <p class="user-base-text text-start">${description}</p>
                                    </div>

                                    <div class="col p-4 m-3 rounded" style="background-color: #272A30">
                                        <h4 class="text-start">Project Process</h4>
                                        <p class="user-base-text text-start">${process}</p>
                                    </div>
                                </div>

                                <div class="row mb-2 text-center">
                                    <div class="col p-4 m-3 rounded" style="background-color: #272A30">
                                        <h4 class="text-start">Project Challenges</h4>
                                        <p class="user-base-text text-start">${challenges}</p>
                                    </div>

                                    <div class="col p-4 m-3 rounded" style="background-color: #272A30">
                                        <h4 class="text-start">Project Outcomes</h4>
                                        <p class="user-base-text text-start">${outcomes}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Github info pulled from API -->

                            <div class="col-md-2 pt-4 d-flex flex-column py-2 text-center" style="background-color: rgba(0, 0, 0, 0.10);">
                                <h5 class="text-start">Stuff from github</h5>
                                <p class="text-start">Languages from repo</p>
                                <p class="text-start">Some other cool stuff</p>
                                <p class="text-start">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container">
                    <div class="row">
                        <div class="bg-dark text-secondary px-4 py-2 mb-3 text-center">
                            <div class="py-5">
                                <h1 class="display-5 fw-semibold fst-italic text-white border-bottom">Sample</h1>
                                    <iframe src="${appLink}" class="container-md" height="768px"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            const profilePicture = document.getElementById('profile-picture')
            profilePicture.addEventListener('click', () => {
                renderProfile(userid)
            });

            const userBaseText = document.querySelectorAll('.user-base-text')
            for (const each of userBaseText) {
                if (each.textContent == "" || each.textContent == "null") {
                    each.textContent = "Not yet added"
                    each.style.color = "#a1a1a1ff"
                    each.style.fontWeight = "300"
                } else {
                    each.style.fontWeight = "400    "
                }
            }

            const userLocation = document.getElementById('user-location')
            // console.log(userLocation)
            // console.log(location)
            if (userLocation.textContent == "" || userLocation.textContent == "null" || userLocation.textContent == null) {
                userLocation.textContent = "Location unknown"
                userLocation.style.color = "#a1a1a1ff"
                userLocation.style.fontWeight = "300"
            }
            
        })
    })
        
}