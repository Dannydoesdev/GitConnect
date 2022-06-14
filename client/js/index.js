// generate navigation bar and header - to move into components
const main = document.getElementById('main')

// logo top left
const navBar = document.createElement('div')
navBar.style.backgroundColor = "#282A35"
navBar.style.height = "45px"

const browse = document.createElement('h4')
browse.textContent = "BROWSE"
browse.style.color = "#ffffff"
browse.style.margin = "0"
browse.style.textAlign = "center"
navBar.appendChild(browse)

main.insertAdjacentElement('afterbegin', navBar)


// login + sign up - in components

// 