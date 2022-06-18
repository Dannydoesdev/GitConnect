
import { renderNav } from './components/navbar.js'
import { renderHome } from "./components/home-startup.js";
import { renderSearch } from "./components/render-repo-search.js";

renderNav();
renderHome();

const navbarLogo = document.getElementById('navbar-logo')
const navbarSearch = document.getElementById('navbar-search')

navbarLogo.addEventListener('click', (event) => {
    window.location = '/'
})
navbarSearch.addEventListener('click', (event) => {
    renderSearch();
})
