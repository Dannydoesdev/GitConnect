export function renderProfileMain(usersName) {
  const main = document.getElementById("main");
  main.innerHTML = "";

  main.innerHTML = `
    <div class="container bg-dark text-white">


    </div>
    `;
  const loginContainer = document.createElement("div");
    const logout = document.createElement("h4");
    
  logout.textContent = "Logout " + usersName;
  logout.setAttribute("id", "logout");
  logout.classList.add("home-login-signup");
  loginContainer.appendChild(logout);
  logout.addEventListener("click", () => {
    axios.delete("/api/session").then(() => {
      window.location = "/";
    });
      
  });
    main.appendChild(loginContainer);
}
