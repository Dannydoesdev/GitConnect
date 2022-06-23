import { makeAnEl } from "../../utils/dom-create.js";
import { renderProject } from "./render-project.js";

export function renderLanding() {
    // storing cards in results
    const results = document.getElementById('results')
    const main = document.getElementById('main')
    main.innerHTML = '';
    // results.classList.add('container-md','my-5')

    // need to code as javascript
    // results.innerHTML = `
    // <div class="row px-3 py-5" style="background-color: #222222;">
    // <h2 style="color: #FFFFFF;">Featured</h2>
    //     <div class="col-md-4 col-sm-6">
    //         <div class="card" style={width: 18rem}>
    //         <img src="https://picsum.photos/600/400" class="card-img-top" alt="...">
    //             <div class="card-body" style="background-color: #212224ff;">
    //                 <h5 class="card-title">Project Title</h5>
    //                 <p class="card-text">By <span class="link-out">/dannydoesdev</span>.</p>
    //                 <a href="#" class="btn btn-md btn-outline-light align-self-center">Dive</a>
    //             </div>
    //         </div>
    //     </div>
    //     <div class="col-md-4 col-sm-6">
    //         <div class="card" style={width: 18rem;}>
    //         <img src="https://picsum.photos/600/400" class="card-img-top" alt="...">
    //             <div class="card-body" style="background-color: #212224ff;">
    //                 <h5 class="card-title">Project Title</h5>
    //                 <p class="card-text">By <span class="link-out">/cjunk</span>.</p>
    //                 <a href="#" class="btn btn-md btn-outline-light align-self-center">Dive</a>
    //             </div>
    //         </div>
    //     </div>
    //     <div class="col-md-4 col-sm-6">
    //         <div class="card" style={width: 18rem;}>
    //         <img src="https://picsum.photos/600/400" class="card-img-top" alt="...">
    //             <div class="card-body" style="background-color: #212224ff;">
    //                 <h5 class="card-title">Project Title</h5>
    //                 <p class="card-text">By <span class="link-out">/misakigrim</span>.</p>
    //                 <a href="#" class="btn btn-md btn-outline-light align-self-center">Dive</a>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    // `
 
    const cardContainer = makeAnEl('div', {
        class: ['container', 'px-4', 'py-5'],
        id: 'custom-cards',
    }, [
        makeAnEl('h1', {
            class: ['pb-2', 'text-white', 'border-bottom'],
            innerText: 'GitConnect Projects;',
        }),
    ])

    // <div class="container px-4 py-5" id="custom-cards">
   //<h2 class="pb-2 border-bottom">Custom cards</h2>
// <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
    
    
    const cardRow = makeAnEl('div', {
        class: ['row', 'row-cols-1', 'row-cols-lg-3', 'align-items-stretch', 'g-4', 'py-5'],
    });

    results.appendChild(cardContainer)
    cardContainer.appendChild(cardRow)

    const makeAnImg = (num) => {
        num = Math.floor(Math.random() * 100)
        return `https://picsum.photos/900/1350?&random=${num}`
        
//         <img src="https://picsum.photos/200/300?random=1">
// <img src="https://picsum.photos/200/300?random=2"></img>
    }


    axios.get('/api/projects')
        .then(dbRes => {
            console.log(dbRes)
            const repoResults = makeAnEl('div', {
                class: ["row", "px-3", "py-5"],
            })
            // results.appendChild(repoResults)

            // need to limit loop
            dbRes.data.map((user) => {
                // console.log(result)
                // set standard variables from response that we want to utilise
                console.log(user);
                let repoid = user.repoid
                let username = user.githubname;
                let projectName = user.projectname;
                let description = user.description;
                let avatar = user.githubavatar;
                let repoName = user.githubreponame;
                let location = user.githublocation;

                console.log(repoid)
                
                const repoCol = makeAnEl('div', {
                    class: ["col-md-3", "col-sm-6"]
                })
                // repoResults.appendChild(repoCol)
    
                const userCard = makeAnEl('div')
                // const userCardOld = makeAnEl('div')
                
                // userCardOld.innerHTML = `
                // <div class="card" style={width: 18rem; --bs-card-border-width: 0;}>
                //     <img src="https://picsum.photos/600/400" class="card-img-top" alt="...">
                //     <div class="card-body" style="background-color: #212224ff;">
                //         <h5 class="card-title">${repoName}</h5>
                //         <p class="card-text">By <span class="link-out">/${username}</span>.</p>
                //         <p class="card-text">${description}</p>
                //         <a href="#" class="btn btn-outline-light align-self-center">Dive</a>
                //     </div>
                // </div>
                // `
                userCard.addEventListener('click', event => {
                    renderProject(repoid);
                })

                    userCard.innerHTML = `
                    <div class="col">
                        <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-4 shadow-lg"
                            style="background-image: url('${makeAnImg(1)}');">
                            <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                                <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">${repoName}</h2>
                                <ul class="d-flex list-unstyled mt-auto">
                                    <li class="me-auto">
                                        <img src="${avatar}" alt="Bootstrap" width="32" height="32" class="rounded-circle border border-white">
                                    </li>
                                    <li class="d-flex align-items-center me-3">
                                        <svg class="bi me-2" width="1em" height="1em">
                                            <use xlink:href="#geo-fill" /></svg>
                                        <small>${location}</small>
                                    </li>
                                    <li class="d-flex align-items-center">
                                        <svg class="bi me-2" width="1em" height="1em">
                                            <use xlink:href="#calendar3" /></svg>
                                        <small>/${username}</small>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `
                // repoCol.appendChild(userCard)
                cardRow.appendChild(userCard)

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