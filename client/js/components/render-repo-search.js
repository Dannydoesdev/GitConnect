// trying something - will remove later

// import axios from 'https://cdn.skypack.dev/axios';
// import { axios } from 'https://cdn.skypack.dev/axios';

import { makeAnEl } from '../../utils/dom-create.js';



export function renderSearch() {

    //get main section
    const mainPage = document.getElementById('main');

    //clear main section
    mainPage.innerHTML = '';
        
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
        document.getElementById('all-user-repos-search').value = '';
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

function renderRepoListBs(userName) {
    // get main section
    const mainPage = document.getElementById('main');
    const resultsList = document.getElementById('results')

    // clear main section
    resultsList.innerHTML = '';

    // create a div to store the list of repos
    const repoList = makeAnEl('section', {
        id: 'repo-list',
    });

    const allReposURL = `http://api.github.com/users/${userName}/repos`;

    // send get request to gihub api with the above URL
    axios.get(allReposURL).then((response) => {
    
        const profileImg = makeAnEl('img', {
            src: response.data[0].owner.avatar_url,
            id: 'profile-img'
    })
    
        const repoHeading = makeAnEl('h3', {
            innerText: `Repo list of: ${response.data[0].owner.login}`
        })

        mainPage.appendChild(profileImg)
        mainPage.appendChild(repoHeading)

        // create h2 and set innertext to username returned from github API
    //  let h2 = document.createElement('h3');
    //  h2.innerText = `Repo list of: ${response.data[0].owner.login}`
    //  resultsList.appendChild(h2);
    //  resultsList.appendChild(profileImg);
        
        
// {/* <div class="card" style="width: 18rem;">
//   <div class="card-body">
//     <h5 class="card-title">Card title</h5>
//     <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="card-link">Card link</a>
//     <a href="#" class="card-link">Another link</a>
//   </div>
// </div> */}

    
    })

    const section = makeAnEl('section', {
        name: 'test-section',
        id: 'test-section',
        innerText: 'hello there',
        className: 'test-section',
        style: {
          backgroundColor: 'red',
          color: 'white',
          fontSize: '20px',
          fontWeight: 'bold',
          padding: '20px',
        },
        data: {
          test: 'test',
        },
    },
      // third paramter is an array of children to auto append, call the same function each time to use
      [
        makeAnEl('h1', {
          innerText: 'test this h1',
          className: 'test-section-h1',
        }),
        makeAnEl('p', {
          innerText: 'test this p',
          className: 'test-section-p',
          style: {
            color: 'blue',
            fontSize: '20px',
          },
          data: {
            test: 'test-p',
          }
        }),
      ]
    );

}


// fn to search for a users repos - requires a username parameter
function listUserRepos(userName) {
    const allReposURL = `http://api.github.com/users/${userName}/repos`;

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
        let repoDiv = document.getElementById(`${repoName}`)

        // create h5 to let users know what this is
        let h5 = document.createElement('h5')
        h5.textContent = 'Language breakdown:'
        repoDiv.appendChild(h5)

        // loop through the langnameArr and for each element create an li with the content of the name and corresponding element [i] in the rounded pct arr

        for (let i = 0; i < langNameArr.length; i++) {
            if (roundedLangPctArr[i] > 5) {
                
                let li = document.createElement('li');
                li.innerText = `${langNameArr[i]}: ${roundedLangPctArr[i]}`;

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