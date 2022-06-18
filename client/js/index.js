
// import { renderSearch } from './components/render-repo-search.js'
import { renderNav } from './components/navbar.js'

import { renderHome } from "./components/home-startup.js";
import { renderRego } from "./components/render-rego.js";
import { renderSearch } from "./components/render-repo-search.js";
import { renderLogin } from "./components/render-login.js";
import { renderProjectEdit } from "./components/render-project-edit.js"

renderNav();
renderHome();

const navbarLogo = document.getElementById('navbar-logo')
const navbarSearch = document.getElementById('navbar-search')
const navbarEditRepo = document.getElementById('navbar-edit-repo')

navbarLogo.addEventListener('click', (event) => {
    window.location = '/'
})

navbarSearch.addEventListener('click', (event) => {
    renderSearch();
})


// login.addEventListener('click', () => {
//     renderLogin();
// })

navbarEditRepo.addEventListener('click', () => {
    renderProjectEdit();
})
 

// const hero = document.createElement('div')
// hero.style.border = "4px solid #52606D"
// hero.style.height = "400px"
// hero.style.width = "800px"
// hero.style.borderRadius = "50px 50px 0 0"
// hero.style.margin = "0 auto"
// main.insertAdjacentElement('afterBegin', hero)

// // login + sign up - in components
// const login = document.createElement('h2')
// login.textContent = "Login"
// const signUp = document.createElement('h2')
// signUp.textContent = "Sign Up"

// hero.appendChild(login)
// hero.appendChild(signUp)