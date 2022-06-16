renderNav();
renderHome();

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