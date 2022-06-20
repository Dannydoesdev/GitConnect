export function renderProject() {
    // clear main HTML
    const main = document.getElementById("main");
    main.innerHTML = "";

    main.innerHTML = `
    <!-- Increase py on hero to make bigger vertically -->
    <div class="container bg-dark text-white border">
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
                        <h2>Project Title</h2>
                    </div>
                </div>
                <div class="row">
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
                    </div>

                    <!-- Github info pulled from API -->

                    <div class="col-md-2 d-flex flex-column border py-2 text-center">
                        <h5>Stuff from github</h5>
                        <p>Languages from repo</p>
                        <p>Some other cool stuff</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
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
    
}