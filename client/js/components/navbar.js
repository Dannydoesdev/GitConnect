function renderNav() {
    // generate navigation bar and header - to move into components
    const main = document.getElementById('main')
    const navBar = document.getElementById('navbar')
    const logo = document.createElement('img')
    logo.src = "./images/gclogo.png"
    navBar.appendChild(logo)
    const browse = document.createElement('h4')
    browse.classList.add('navbar-links')
    browse.textContent = "BROWSE"
    navBar.appendChild(browse)

    const search = document.createElement('h4')
    search.classList.add('navbar-links')
    search.textContent = "SEARCH"
    navBar.appendChild(search)

    const lorem = document.createElement('h4')
    lorem.classList.add('navbar-links')
    lorem.textContent = "LOREM"
    navBar.appendChild(lorem)
}