export function renderRego() {
  // clear main HTML
  const main = document.getElementById("main");
  main.innerHTML = "";

  const results = document.getElementById('results')
  results.innerHTML = ""
  
  const formContainer = document.createElement("div");
  formContainer.innerHTML = `

  <div class="container-fluid bg-dark text-white px-5 py-5">
    <div class="row">
        <div class="col-md-6 py-5 gx-5 px-5 offset-md-3">
            <h1>Welcome to GitConnect;</h1>
            <form action="/" id="sign-up-form" method="POST">    
            <div class="form-group mb-4">
              <label for="username">Your GitHub username:</label>
              <input type="text" class="form-control" id="username" name="username" placeholder="Enter your GitHub username to use GitConnect; - we can read public info only">
            </div> 
            <div class="form-group mb-4">
                <label for="email">Email:</label>
                <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email">
            </div> 
            <div class="form-group mb-4">
                <label for="password">Password:</label>
                <input type="password" class="form-control" id="password" name="password" placeholder="Enter a Password">
            </div> 
            <div class="form-group mb-4">
                <label for="confirm-password">Password:</label>
                <input type="password" class="form-control" id="confirm-password" name="confirm-password" placeholder="Confirm your Password">
            </div>            
                <input type="submit" class="btn btn-lg btn-outline-light align-self-center" value="Submit">
            </form>
        </div>
    </div>
</div>
       
    `;
  
    // REMOVED THIS BUTTON
    // <button>Sign Up</button>
  
  main.appendChild(formContainer);

  let form = document.getElementById("sign-up-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    // needs to be coded later but will do just for now
    const data = {
      githubID: Math.floor(Math.random() * 100000), // Random number for developing.
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirm-password"),
      gitHubName: formData.get("username"),
      userType: 1,
      profiletype: 1,
    };
    axios
      .post("/api/users/register", data)
      .then((addSession) => {
        // Delete all cookies
        axios.post("/api/session/login", data);
      })
      .then((response) => {
        // instead of returning to home, we need to call renderProfileMain() using a specific usernme
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
        let errorMessage = err.response.data.message;
        alert(errorMessage);
        console.log(errorMessage);
        console.log("error");
      });
  });
}
