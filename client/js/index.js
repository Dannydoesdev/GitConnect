
// import { renderSearch } from './components/render-repo-search.js'
import { renderNav } from './components/navbar.js'

import { renderHome } from "./components/home-startup.js";
// import { renderRego } from "./components/render-rego.js";
import { renderSearch } from "./components/render-repo-search.js";
// import { renderLogin } from "./components/render-login.js";
import { renderProjectEdit } from "./components/render-project-edit.js"
import { renderProfileEdit } from "./components/render-profile-edit.js"

renderNav();
renderHome();

const navbarLogo = document.getElementById('navbar-logo')
const navbarSearch = document.getElementById('navbar-search')
const navbarEditRepo = document.getElementById('navbar-edit-repo')
const navbarEditProfile = document.getElementById('navbar-edit-profile')

navbarLogo.addEventListener('click', (event) => {
    window.location = '/'
})
navbarSearch.addEventListener('click', (event) => {
    renderSearch();
})
navbarEditRepo.addEventListener('click', () => {
    renderProjectEdit();
})
navbarEditProfile.addEventListener('click', () => {
    renderProfileEdit();
})