const { sign } = require("crypto")
const { nextTick } = require("process")

// to render the home page
function renderHome() {
    const main = document.getElementById('main')

    // temporariiy removing search-boxes (sorry Danny)
    main.innerHTML = ""

    // setting logo
    const homeLogo = document.createElement('img')
    homeLogo.src = "../../img/gclogo.png"
    homeLogo.setAttribute('id', 'home-logo')
    main.appendChild(homeLogo)

    // setting login/signup
    const loginContainer = document.createElement('div')
    loginContainer.setAttribute('id', 'login-container')

    const login = document.createElement('h4')
    login.textContent = "Login"
    login.classList.add('home-login-signup')

    const signUp = document.createElement('h4')
    signUp.textContent = "Sign Up"
    signUp.classList.add('home-login-signup')
    
    main.appendChild(loginContainer)
    loginContainer.appendChild(login)
    loginContainer.appendChild(signUp)

    // setting main name
    const heading = document.createElement('h1')
    heading.textContent = "Gitconnected;"
    heading.setAttribute('id', 'home-heading')
    main.appendChild(heading)

    // setting tagline
    const tagline = document.createElement('h2')
    tagline.textContent = "The best fresh talent from around Australia" // - placeholder
    tagline.setAttribute('id', 'home-tagline')
    main.appendChild(tagline)

    // creating search box
    const searchContainer = document.createElement('div')
    searchContainer.setAttribute('id', 'search-container')
    main.appendChild(searchContainer)

    const searchLogo = document.createElement('img')
    searchLogo.src = "" // -- maybe not necesary
    searchLogo.setAttribute('id', 'search-logo')
    searchContainer.appendChild(searchLogo)

    const searchBar = document.createElement('input')
    searchBar.value = "Search"
    searchBar.setAttribute('id', 'search-bar')
    searchContainer.appendChild(searchBar)
}