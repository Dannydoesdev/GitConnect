export function renderRego() {
  // clear main HTML
  const main = document.getElementById("main");
  main.innerHTML = "";

  const formContainer = document.createElement("div");
  formContainer.innerHTML = `
        <form id="sign-up-form" class="forms">
                <fieldset>
                    <label for="">Git Username: </label><br>
                    <input type="text" name="username">
                </fieldset>
                <fieldset>
                    <label for="">Email: </label><br>
                    <input type="text" name="email">
                </fieldset>
                <fieldset>
                    <label for="">Password: </label><br>
                    <input type="password" name="password">
                </fieldset>
                <fieldset>
                    <label for="">Confirm Password: </label><br>
                    <input type="password" name="confirm-password">
                </fieldset>
                <button>Sign Up</button>
    `;
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
