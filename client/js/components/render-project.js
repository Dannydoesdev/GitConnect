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
            // console.log(user);
            let repoid = user.repoid;
            let username = user.githubname;
            let repoName = user.githubreponame;
            let avatar = user.githubavatar;
            let location = user.githublocation;
            
            let projectName = user.projectname;
            let challenges = user.challenges;
            let outcomes = user.outcomes;
            let process = user.process; 
            let description = user.description;
           
            main.innerHTML = `
            <!-- Increase py on hero to make bigger vertically -->
            <div class="container-lg bg-dark text-white border">
                <!-- Sidebar stuff -->
                <div class="row">
                    <div class="col-md-2 d-flex flex-column text-center border">
                        <img id="profile-picture" src="${avatar ? avatar : 'unknown'}" class="mx-auto my-4 img-thumbnail rounded-circle" alt="avatar" width="100" height="100">
                        <h3>${username}</h3>
                        <p id="user-location">${location}</p>
                        <br><br>
                        <p>Dev socials</p>
                    </div>

                    <!-- Hero image or carousel of project photos -->
                    <div class="col-md-10 border">
                        <div class="bg-dark text-secondary px-4 py-2 mb-3 text-center">
                            <div class="py-3">
                                <h1 class="display-5 fw-bold text-white">Big Image of project</h1>
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
                            <div class="col-md-12 text-center mb-3">
                                <h2 class="user-base-title">${projectName ? projectName : 'Project Title'}</h2>
                                <a href="https://github.com/${username}/${repoName}" style="color: #a1a1a1ff">${username}/${repoName}</a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col md-10">
                                <div class="row text-center py-2 border">
                                    <div class="col">
                                        <h4 class="text-start">Project Description</h4>
                                        <p class="user-base-text text-start">${description}</p>
                                    </div>

                                    <div class="col">
                                        <h4 class="text-start">Project Process</h4>
                                        <p class="user-base-text text-start">${process}</p>
                                    </div>
                                </div>

                                <div class="row text-center py-4 border">
                                    <div class="col">
                                        <h4 class="text-start">Project Challenges</h4>
                                        <p class="user-base-text text-start">${challenges}</p>
                                    </div>

                                    <div class="col">
                                        <h4 class="text-start">Project Outcomes</h4>
                                        <p class="user-base-text text-start">${outcomes}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Github info pulled from API -->

                            <div class="col-md-2 d-flex flex-column border py-2 text-center">
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
                                <h1 class="display-5 fw-bold text-white">Heroku iframe</h1>
                                <div class="col-lg-6 mx-auto">
                                    <p class="fs-5 mb-4">Play with the project here</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            const profilePicture = document.getElementById('profile-picture')
            profilePicture.addEventListener('click', () => {
                renderProfile(username)
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
            console.log(userLocation)
            console.log(location)
            if (userLocation.textContent == "" || userLocation.textContent == "null" || userLocation.textContent == null) {
                userLocation.textContent = "Location unknown"
                userLocation.style.color = "#a1a1a1ff"
                userLocation.style.fontWeight = "300"
            }
            
        })
    })
        
}