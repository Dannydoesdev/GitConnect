// trying something - will remove later

// import axios from 'http://cdn.skypack.dev/axios';
// import { axios } from 'http://cdn.skypack.dev/axios';

import { makeAnEl } from '../../utils/dom-create.js';
import { renderProfile } from './render-profile.js'


export function renderSearch() {

    //clear main/results section
    const mainPage = document.getElementById('main');
    mainPage.innerHTML = '';

    const results = document.getElementById('results')
    results.innerHTML = "";
    results.removeAttribute('class');
        
    // create an input box for searching a users repos
    const allUserReposSearchBox = document.createElement('input');
    allUserReposSearchBox.setAttribute('type', 'text');
    allUserReposSearchBox.setAttribute('id', 'all-user-repos-search');
    allUserReposSearchBox.setAttribute('placeholder', 'Search for a users repo - enter github username');

    // submit button for the user repo search input
    const allUserReposSubmit = document.createElement('button');
    allUserReposSubmit.setAttribute('id', 'search-user-repos-submit');
    allUserReposSubmit.innerText = 'Search for users repos';

    // add event listener that takes in the value of the search input and runs the listUserRepos function then clears input
    // allUserReposSubmit.addEventListener('click', () => {
    //     let userName = document.getElementById('all-user-repos-search').value;
    //     listUserRepos(userName);
    //     document.getElementById('all-user-repos-search').value = '';
    // })
        
    allUserReposSubmit.addEventListener('click', () => {
        let userName = document.getElementById('all-user-repos-search').value;
        renderRepoListBs(userName);
        // document.getElementById('all-user-repos-search').value = '';
    })

    // temporary pre-filled value for dev testing
    allUserReposSearchBox.setAttribute('value', 'dannydoesdev');
    // repoSearchBox.setAttribute('value', 'project3');

    // create a div to store search boxes and inputs
    const searchBoxes = document.createElement('div');
    searchBoxes.setAttribute('id', 'search-boxes');

    // append all to div
    searchBoxes.appendChild(allUserReposSearchBox);
    searchBoxes.appendChild(allUserReposSubmit);


    // append the searchboxes to the main section
    mainPage.appendChild(searchBoxes);

}

export function renderRepoListBs(userName) {
    const allReposURL = `https://api.github.com/users/${userName}/repos`;
    
    // get main section
    const mainPage = document.getElementById('main');
    mainPage.innerHTML = '';

    // create a bootstrap style container to hold the page info
    const container = makeAnEl('div', {
        id: 'repo-list',
        class: ['container-fluid', 'bg-dark', 'text-white']
    })

    // crreate a bootstrap style row as required
    const row = makeAnEl('div', {
        class: 'row',
    });


    mainPage.appendChild(container)
    container.appendChild(row)
   

    // send get request to gihub api with the above URL
    axios.get(allReposURL).then((response) => {
    
        console.log(response)

        let userName = response.data[0].owner.login;
        console.log(`user name is ${userName} on repo search load`)

        // create profileimg var - img type with GH profile img as src
        const profileImg = makeAnEl('img', {
            src: response.data[0].owner.avatar_url,
            id: 'profile-img',
            class: ['rounded', 'mx-auto', 'd-block']
        })

        // create repo heading var - rapo owner name
        const repoHeading = makeAnEl('h3', {
            innerText: `Repo list of: ${response.data[0].owner.login}`,
            class: 'text-center',
        })

        const addSelectedReposBtn = makeAnEl('button', {
            id: 'add-selected-repos-btn',
            class: ['btn', 'btn-primary', 'btn-outline-light', 'btn-lg', 'mx-auto', 'd-block'],
            innerText: 'Add selected repos to project'
        })

        addSelectedReposBtn.addEventListener('click', () => {
            let selectedReposArr = [];
            let selectedRepos = document.querySelectorAll("input[type='checkbox']");
            selectedRepos.forEach((repo) => {
                if (repo.checked) {
                    // console.log(repo.data)
                    selectedReposArr.push(repo.value);
                }
            })
            console.log(selectedReposArr);
            // send selected repos to the server
            selectedReposArr.forEach(repo => addSelectedRepos(repo, userName));

            // NEED TO DO AN AWAIT RESPOSNSE HERE BUT NOT SURE HOW
            // renderProfile(userName);
        })

        row.appendChild(profileImg)
        row.appendChild(repoHeading)
        row.appendChild(addSelectedReposBtn)

        // map the response data so each result can be appended to the DOM
        response.data.map((result) => {
            // console.log(result)
            // set standard variables from response that we want to utilise
            let repoName = result.name;
            let userName = result.owner.login;
            let repoLink = result.html_url;
            let repoDesc = result.description;
            let repoLang = result.language;

            // create a div for each repo that is returned
            // nest the card layout as required via the makeAnEl fn
            // add desired styling to card element
            let repoDiv = makeAnEl('div', {
                class: ['col-md-4', 'py-2'],
            }, [
                makeAnEl('div', {
                    id: repoName,
                    class: ['card', 'border-light', 'text-center', 'text-white', 'bg-dark'],
                    data: {
                        repoName: repoName,
                        userName: userName,
                    },
                }, [
                    makeAnEl('div', {
                        class: 'card-body',
                    }, [
                        makeAnEl('h3', {
                            innerText: `Repo name: ${repoName}`,
                            class: 'card-title',
                        }),
                        makeAnEl('p', {
                            class: ['card-subtitle'],
                            innerText: `Repo main language: ${repoLang}`,
                        }),
                        makeAnEl('p', {
                            innerText: `Repo description: ${repoDesc}`,
                            class: 'card-text',
                        }),
                        makeAnEl('a', {
                            class: 'card-link',
                            innerText: `Link to repo on Github`,
                            href: repoLink,
                            style: {
                                color: 'white',
                                fontSize: '18px',
                            },
                        }),
                    ]),
                ]),
            ]);



//             <div class="form-check form-switch">
//   <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
//   <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
// </div>
            
            // languagePct(userName, repoName)
            row.appendChild(repoDiv);

            let switchRepoButton = makeAnEl('div', {
                class: ['form-check', 'form-switch'],
                id: `${repoName}`,
            }, [
                makeAnEl('input', {
                    class: 'form-check-input',
                    type: 'checkbox',
                    id: `${repoName}`,
                    value: `${repoName}`,
                    data: {
                        userName: userName,
                        repoName: repoName,
                    },
                }),
                makeAnEl('label', {
                    class: 'form-check-label',
                    for: `${userName}-${repoName}`,
                    innerText: `Add ${repoName} to project list`,
                }),
            ]);

            repoDiv.appendChild(switchRepoButton);

        })  
    
    })
}

function addSelectedRepos(reponame, userName) {
    console.log(`username in add selected repos is ${userName}`)
    const addRepoURL = `/api/projects/addRepo`;
    const repoData = {
        reponame: reponame,
    }
    axios.post(addRepoURL, repoData).then((response) => {
        console.log(response);
    })
    .then(() => {
        renderProfile(userName);
    })
}


// fn to search for a users repos - requires a username parameter
function listUserRepos(userName) {
    const allReposURL = `https://api.github.com/users/${userName}/repos`;

    // send get request to gihub api with the above URL
    axios.get(allReposURL).then((response) => {

        // clear results ul
        let resultsList = document.getElementById('results')
        resultsList.innerHTML = '';

        // create img element
        let profileImg = document.createElement('img');

        // get the users github profile image from the response data and set as src
        profileImg.src = response.data[0].owner.avatar_url;

        profileImg.id = 'profile-img';

        // create h2 and set innertext to username returned from github API
        let h2 = document.createElement('h3');
        h2.innerText = `Repo list of: ${response.data[0].owner.login}`
        resultsList.appendChild(h2);
        resultsList.appendChild(profileImg);

        
        // map the response data so each result can be appended to the DOM
        response.data.map((result) => {

            // set standard variables from response that we want to utilise
            let repoName = result.name;
            let userName = result.owner.login;
            let repoLink = result.html_url;
            let repoDesc = result.description;
            let repoLang = result.language;
        
            // create div for storing the elements
            let repoDiv = document.createElement('div');

            // set the div id to be the name of the repo (used for langpct fn)
            repoDiv.id = repoName;
            
            //add repo and user name dataset to div to be used in other fns
            repoDiv.dataset.repoName = repoName;
            repoDiv.dataset.userName = userName;


            //create heading for repo name
            let h3 = document.createElement('h3');
            h3.innerText = `Repo name: ${repoName}`;

            //create a tag for the link to repo on GH
            let a = document.createElement('a');
            a.href = repoLink;
            a.innerText = `Link to repo on Github`

            //create p for the repo description
            let p = document.createElement('p');
            p.innerText = `Repo description: ${repoDesc}`;
            
            //create p for repos main language
            let p2 = document.createElement('p');
            p2.innerText = `Repo main language: ${repoLang}`;

            // append the above to the repo dive
            repoDiv.append(h3);
            repoDiv.append(a);
            repoDiv.append(p);
            repoDiv.append(p2);

            //append the repo div to the results list
            document.getElementById('results').append(repoDiv);


            // add percentages from other function (WORKING)
            languagePct(userName, repoName);

        })  

        //create new loop just for buttons (can probably be added to above .map - created this loop due to earlier problems)
        // loop through each of the elements in response data array
        for (let repoResult of response.data) {


            // get the repo this button will be attaching to (by repo name returned in response)
            thisRepoDiv = document.getElementById(repoResult.name);
            
            // create standard variables for wanted info - note this was used to pass to findrepo fn but didn't work so can likely remove later
            repoName = repoResult.name;
            userName = repoResult.owner.login;

            // Create button to select the repo and append to the div
            const selectRepoButton = document.createElement('button');
            selectRepoButton.textContent = 'Select repo';
            thisRepoDiv.appendChild(selectRepoButton);
            console.log(selectRepoButton)

            // attach an event listener to the button that sends information on event itself
            selectRepoButton.addEventListener("click", (event) => {
                console.log('hey')
                console.log(event.target)
                findRepo(event);
              
            })
        }
        })
}

// fn to search for a users repos - note this fn has been created based on an event target being sent through from an event listener
// main use case is clicking through a result or users repos & seeing individual repo info
// saves making user enter their username and reponame

function findRepo(clickedRepo) {
    console.log(clickedRepo)
    
    // use target of clicked button to find parent (div) dataset info
    let clickedRepoName = clickedRepo.target.parentNode.dataset.repoName
    let userName = clickedRepo.target.parentNode.dataset.userName

    // send the username and repo name from dataset info to github url
    const repoURL = `https://api.github.com/repos/${userName}/${clickedRepoName}`;
    let resultsList =   document.getElementById('results')
    
    //get individual repo info and return
    axios.get(repoURL).then((response) => {
        console.log(response);

        //clear the results list (refactor this to attach to main & create results list)
        resultsList.innerHTML = '';

        // set variables for the wanted info in response
        let repoName = response.data.name;
        let repoDesc = response.data.description
        let repoLink = response.data.html_url;

        let repoDiv = document.createElement('div');
        repoDiv.id = repoName;
        
        //add repo and user name dataset to div
        repoDiv.dataset.repoName = repoName;
        repoDiv.dataset.userName = userName;


        //create repo name h5 tag
        let h2 = document.createElement('h2');
        h2.innerText = repoName;

        //create link to repo a tag
        let a = document.createElement('a');
        a.href = repoLink;
        a.innerText = repoLink;

        //create repo description p tag
        let p = document.createElement('p');
        p.innerText = repoDesc;


        // append the info to the created div
        repoDiv.append(h2);
        repoDiv.append(a);
        repoDiv.append(p);

        // Use the languagepct function to calculate and append the repo language breakdown

        languagePct(userName, repoName);

        // create a back button to return to list of user results

         const backButton = document.createElement('button');
         backButton.textContent = 'Back to results';
         repoDiv.appendChild(backButton);


         // attach an event listener to the button that re creates original list
         backButton.addEventListener("click", () => {

             listUserRepos(userName);
           
         })

        // append the repo div to the results list
        document.getElementById('results').append(repoDiv);

    });
}


// This function takes in the username and reponame parameter - 
// it calls the language URL to return the lines of code per lanuage, then calulates to % s of 100 and appends to the div
// Currently requires div id to be the same as the repo name to work
function languagePct(userName, repoName) {

    // get url with vars
    const langURL = `https://api.github.com/repos/${userName}/${repoName}/languages`

    // send to github api
    axios.get(langURL).then((response) => {

        // create an array for the amount of lines in each lang
        let langPctArr = [];

        // create an array for the names of langauges
        let langNameArr = [];

        // using the returned object in response.data - loop and push langname and langpct to the arrays above
        for (let [lang, pct] of Object.entries(response.data)) {
            langPctArr.push(pct);
            langNameArr.push(lang);
        }

        // create the 'rounded pct' array using the percentRound function
        let roundedLangPctArr = percentRound(langPctArr);

        //  get repodiv (currently MUST have id of the reponame) - this could be removed and handled when calling instead, thus only returning the arrays, but works for now
        // let repoDiv = document.getElementById(`${repoName}`)

        // Now using the card body class to append (post bootstrap)
        let repoDiv = document.querySelector(`#${repoName} > .card-body`)

        // create h5 to let users know what this is
        let h5 = document.createElement('h5')
        h5.textContent = 'Language breakdown:'
        repoDiv.appendChild(h5)

        // loop through the langnameArr and for each element create an li with the content of the name and corresponding element [i] in the rounded pct arr

        for (let i = 0; i < langNameArr.length; i++) {
            if (roundedLangPctArr[i] > 3) {
                
                let li = document.createElement('li');
                li.innerText = `${langNameArr[i]}: ${roundedLangPctArr[i]}%`;
      
                // append the li to the repoDiv
                repoDiv.appendChild(li);
            }
       
        }
    });
}

// this function takes in an array of numbers and turns each i element into the % of 100 it is as a total of the arrays elements added together
// used to take in # lines of code for languages generated by github language API and give back % of total per repo

// created with the help of github co-pilot extension

function percentRound(number, precision) {
    if (!precision) {
        precision = 0;
    }
    if (!Array.isArray(number)) {
        throw new Error('percentRound input should be an Array');
    }
    const numberPercents = number.slice();
    const length = number.length;
    const out = new Array(length);
    for (let i = 0; i < length; i++) {
        if (typeof numberPercents[i] === "string") {
            numberPercents[i] = Number.parseFloat(numberPercents[i]);
        }
    }
    const total = numberPercents.reduce((a, b) => a + b, 0);
    for (let i = 0; i < length; i++) {
        numberPercents[i] = 100 * numberPercents[i] / total;
        out[i] = Math.round(numberPercents[i] * Math.pow(10, precision));
    }
    return out;

}