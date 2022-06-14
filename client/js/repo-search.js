// import axios from 'https://cdn.skypack.dev/axios';

// import { axios } from 'https://cdn.skypack.dev/axios';

// let userName = 'dannydoesdev'
// let userName = 'cjunk'

// const allReposURL = `http://api.github.com/users/${userName}/repos`;

// const repoURL = `https://api.github.com/repos/${userName}/${repoName}`;



const allUserReposSearchBox = document.createElement('input');
allUserReposSearchBox.setAttribute('type', 'text');
allUserReposSearchBox.setAttribute('id', 'all-user-repos-search');
allUserReposSearchBox.setAttribute('placeholder', 'Search for a users repo - enter github username');

const allUserReposSubmit = document.createElement('button');
allUserReposSubmit.setAttribute('id', 'search-user-repos-submit');
allUserReposSubmit.innerText = 'Search for users repos';

allUserReposSubmit.addEventListener('click', () => {
    let userName = document.getElementById('all-user-repos-search').value;
    console.log(userName);
    listUserRepos(userName);
    document.getElementById('all-user-repos-search').value = '';
})

const repoSearchBox = document.createElement('input');
repoSearchBox.setAttribute('type', 'text');
repoSearchBox.setAttribute('id', 'repo-search');
repoSearchBox.setAttribute('placeholder', 'Search for a specific repo - enter repo name');

const repoSearchSubmit = document.createElement('button');
repoSearchSubmit.setAttribute('id', 'repo-search-submit');
repoSearchSubmit.innerText = 'Search for this repo';

repoSearchSubmit.addEventListener('click', () => {
    let repoName = document.getElementById('repo-search').value; 
    let userName = document.getElementById('all-user-repos-search').value;
    findRepo(userName, repoName);
    console.log(repoName);
})


allUserReposSearchBox.setAttribute('value', 'dannydoesdev');
repoSearchBox.setAttribute('value', 'project3');

const searchBoxes = document.createElement('div');
searchBoxes.setAttribute('id', 'search-boxes');

searchBoxes.append(allUserReposSearchBox);
searchBoxes.append(allUserReposSubmit);

searchBoxes.appendChild(repoSearchBox);
searchBoxes.append(repoSearchSubmit);



const mainPage = document.getElementById('main');
mainPage.appendChild(searchBoxes);


function listUserRepos(userName) {
    const allReposURL = `http://api.github.com/users/${userName}/repos`;

    axios.get(allReposURL).then((response) => {
        document.getElementById('results').innerHTML = '';
       
        console.log(response);
        let profileImg = document.createElement('img');
        profileImg.src = response.data[0].owner.avatar_url;
        profileImg.id = 'profile-img';
        let h3 = document.createElement('h3');
        h3.innerText = `Repo list of: ${response.data[0].owner.login}`
        document.getElementById('results').append(h3);
        document.getElementById('results').append(profileImg);

        response.data.map((result) => {

            console.log(result)
            document.getElementById('results').innerHTML += `<div id="${result.name}" class="repo-list">`
            document.getElementById(`${result.name}`).innerHTML += `<li><h5>Repo name: ${result.name}</h5></li><li>Repo description: ${result.description}</li><li>Repo link: <a href=${result.html_url}>${result.html_url}</a</li><br>`
        })
    });
}


function findRepo(userName, repoName) {
    const repoURL = `https://api.github.com/repos/${userName}/${repoName}`;

    axios.get(repoURL).then((response) => {
        console.log(response);
        document.getElementById('results').innerHTML = '';
        
        document.getElementById('results').innerHTML +=
        `<li><h5>Repo name: ${response.data.name}</h5></li><li>Repo description: ${response.data.description}</li><li>Repo link: <a href=${response.data.html_url}>${response.data.html_url}</a</li><br>`
          
    });
}