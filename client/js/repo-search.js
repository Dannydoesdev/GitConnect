// import axios from 'https://cdn.skypack.dev/axios';

// import { axios } from 'https://cdn.skypack.dev/axios';

// let userName = 'dannydoesdev'
let userName = 'cjunk'

const allReposURL = `http://api.github.com/users/${userName}/repos`;

// const repoURL = `https://api.github.com/repos/${userName}/${repoName}`;


axios.get(allReposURL).then((response) => {
    console.log(response);
    let profileImg = document.createElement('img');
    profileImg.src = response.data[0].owner.avatar_url;
    profileImg.id = 'profile-img';
    let h3 = document.createElement('h3');
    h3.innerText = `Repo list of: ${response.data[0].owner.login}`
    document.getElementById('main').append(h3);
    document.getElementById('main').append(profileImg);

    response.data.map((result) => {

        console.log(result)
        document.getElementById('results').innerHTML += `<div id="${result.name}" class="repo-list">`
        document.getElementById(`${result.name}`).innerHTML += `<li><h5>Repo name: ${result.name}</h5></li><li>Repo description: ${result.description}</li><li>Repo link: <a href=${result.html_url}>${result.html_url}</a</li><br>`
    })
});
