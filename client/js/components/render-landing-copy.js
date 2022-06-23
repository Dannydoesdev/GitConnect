import { makeAnEl } from "../../utils/dom-create.js";

export function renderLanding() {
    // storing cards in results
    const results = document.getElementById('results')
    results.classList.add('container-md','my-5')

    // need to code as javascript
    results.innerHTML = `
    <div class="row px-3 py-5" style="background-color: #222222;">
    <h2 style="color: #FFFFFF;">Featured</h2>
        <div class="col-md-4 col-sm-6">
            <div class="card" style={width: 18rem}>
            <img src="https://picsum.photos/600/400" class="card-img-top" alt="...">
                <div class="card-body" style="background-color: #212224ff;">
                    <h5 class="card-title">Project Title</h5>
                    <p class="card-text">By <span class="link-out">/dannydoesdev</span>.</p>
                    <a href="#" class="btn btn-md btn-outline-light align-self-center">Dive</a>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-sm-6">
            <div class="card" style={width: 18rem;}>
            <img src="https://picsum.photos/600/400" class="card-img-top" alt="...">
                <div class="card-body" style="background-color: #212224ff;">
                    <h5 class="card-title">Project Title</h5>
                    <p class="card-text">By <span class="link-out">/cjunk</span>.</p>
                    <a href="#" class="btn btn-md btn-outline-light align-self-center">Dive</a>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-sm-6">
            <div class="card" style={width: 18rem;}>
            <img src="https://picsum.photos/600/400" class="card-img-top" alt="...">
                <div class="card-body" style="background-color: #212224ff;">
                    <h5 class="card-title">Project Title</h5>
                    <p class="card-text">By <span class="link-out">/misakigrim</span>.</p>
                    <a href="#" class="btn btn-md btn-outline-light align-self-center">Dive</a>
                </div>
            </div>
        </div>
    </div>
    `
    axios.get('/api/projects')
        .then(dbRes => {
            console.log(dbRes)
            const repoResults = makeAnEl('div', {
                class: ["row", "px-3", "py-5"],
            })
            results.appendChild(repoResults)

            // need to limit loop
            dbRes.data.map((user) => {
                // console.log(result)
                // set standard variables from response that we want to utilise
                let username = user.githubname;
                let projectName = user.projectname;
                let description = user.description;
                
                const repoCol = makeAnEl('div', {
                    class: ["col-md-3", "col-sm-6"]
                })
                repoResults.appendChild(repoCol)
    
                const userCard = makeAnEl('div')
                userCard.innerHTML = `
                <div class="card" style={width: 18rem; --bs-card-border-width: 0;}>
                    <img src="https://picsum.photos/600/400" class="card-img-top" alt="...">
                    <div class="card-body" style="background-color: #212224ff;">
                        <h5 class="card-title">${projectName}</h5>
                        <p class="card-text">By <span class="link-out">/${username}</span>.</p>
                        <p class="card-text">${description}</p>
                        <a href="#" class="btn btn-outline-light align-self-center">Dive</a>
                    </div>
                </div>
                `
                repoCol.appendChild(userCard)
                
            })
            
    //         repoID TEXT PRIMARY KEY UNIQUE NOT NULL,
    // gitHubRepoName TEXT,
    // userID SMALLINT REFERENCES users(id),
    // status BIT NOT NULL, -- Available for viewing Y or N
    // projectName TEXT,
    // description TEXT,
    // process TEXT,
    // challenges TEXT,
    // outcomes TEXT,
    // tags TEXT,
    // titleimage TEXT
            
            
        })
        .catch(err => {
            console.log(err);
        })
// the a href should renderProject()

}

{/* <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */}