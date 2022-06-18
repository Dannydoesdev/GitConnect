import { makeAnEl } from "../../utils/dom-create.js"

export function renderNav() {
    // generate navigation bar and header - to move into components
    const main = document.getElementById('main')
    const navBar = document.getElementById('navbar')
    const logo = document.createElement('img')
    logo.src = "./img/gclogo.png"
    logo.setAttribute('id', 'navbar-logo')
    navBar.appendChild(logo)
    const browse = document.createElement('h4')
    browse.classList.add('navbar-links')
    browse.textContent = "BROWSE"
    navBar.appendChild(browse)

    const search = document.createElement('h4')
    search.classList.add('navbar-links')
    search.textContent = "SEARCH"
    search.setAttribute('id', 'navbar-search')
    navBar.appendChild(search)

    const editRepoForm = makeAnEl('h4', {
        className: 'navbar-links',
        textContent: 'EDIT REPO',
        id: 'navbar-edit-repo'
    })
    navBar.appendChild(editRepoForm)

    const editProfileForm = makeAnEl('h4', {
        className: 'navbar-links',
        textContent: 'EDIT PROFILE',
        id: 'navbar-edit-profile'
    })
    navBar.appendChild(editProfileForm)

    const lorem = document.createElement('h4')
    lorem.classList.add('navbar-links')
    lorem.textContent = "LOREM"
    navBar.appendChild(lorem)

    axios.get('/api/session').then(results => {
        if (results) {
            console.log(results)
        }
    })
}