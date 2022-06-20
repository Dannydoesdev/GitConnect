import { makeAnEl } from "../../utils/dom-create.js";

export function renderLanding() {
    // storing cards in results
    const results = document.getElementById('results')
    results.classList.add('container-md','my-5')

    // need to code as javascript
    results.innerHTML = `
    <div class="row px-3 py-5" style="background-color: #222222;">
    <h2 style="color: #FFFFFF;">Featured</h2>
        <div class="col-4">
            <div class="card" style={width: 18rem}>
            <img src="https://picsum.photos/600/400" class="card-img-top" alt="...">
                <div class="card-body" style="background-color: #212224ff;">
                    <h5 class="card-title">Project Title</h5>
                    <p class="card-text">By <span class="link-out">/dannydoesdev</span>.</p>
                    <a href="#" class="btn btn-secondary">Dive</a>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="card" style={width: 18rem;}>
            <img src="https://picsum.photos/600/400" class="card-img-top" alt="...">
                <div class="card-body" style="background-color: #212224ff;">
                    <h5 class="card-title">Project Title</h5>
                    <p class="card-text">By <span class="link-out">/cjunk</span>.</p>
                    <a href="#" class="btn btn-dark">Dive</a>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="card" style={width: 18rem;}>
            <img src="https://picsum.photos/600/400" class="card-img-top" alt="...">
                <div class="card-body" style="background-color: #212224ff;">
                    <h5 class="card-title">Project Title</h5>
                    <p class="card-text">By <span class="link-out">/misakigrim</span>.</p>
                    <a href="#" class="btn btn-dark">Dive</a>
                </div>
            </div>
        </div>
    </div>
    `
    axios.get('/api/projects')
        .then(results => {
            console.log(results)

            // need to limit loop
            results.data.map((result) => {
                // console.log(result)
                // set standard variables from response that we want to utilise
                let repoName = result.githubreponame;
                let projectName = result.projectname;
                let description = result.description;
                let table = [repoName, projectName, description]
                console.log(table)
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