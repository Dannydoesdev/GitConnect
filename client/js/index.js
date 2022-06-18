// import { renderSearch } from './components/render-repo-search.js'
import { renderNav } from './components/navbar.js'
import { renderHome } from "./components/home-startup.js";
import { renderRego } from "./components/render-rego.js";
import { renderSearch } from "./components/render-repo-search.js";
import { renderLogin } from "./components/render-login.js";
import { renderProjectEdit } from "./components/render-project-edit.js"

renderNav();
renderHome();
renderProjectEdit();

const login = document.getElementById('login')
const signUp = document.getElementById('sign-up')
const navbarLogo = document.getElementById('navbar-logo')
const navbarSearch = document.getElementById('navbar-search')

navbarLogo.addEventListener('click', (event) => {
    window.location = '/'
})

signUp.addEventListener('click', (event) => {
    renderRego();
})

navbarSearch.addEventListener('click', (event) => {
    renderSearch();
})

login.addEventListener('click', () => {
    renderLogin();
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