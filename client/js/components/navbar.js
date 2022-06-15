function renderNav() {
    // generate navigation bar and header - to move into components
    const main = document.getElementById('main')
    const navBar = document.getElementById('navbar')

    const logo = document.createElement('img')
    logo.src = "/images/logo.png"
    navBar.appendChild(logo)

    const browse = document.createElement('h4')
    browse.classList.add('navbar-links')
    browse.textContent = "BROWSE"
    navBar.appendChild(browse)
}