// import { makeAnEl } from '../../utils/dom-create.js';

// user table fields:
// recommend adding profile table: brand statement, bio, work experience, education, avatar, location, email, github, linkedin, twitter, instagram, website, cv link, top 3 languages, roles I'm looking for etc.

// githubName TEXT UNIQUE,
// email TEXT UNIQUE,
// userType SMALLINT REFERENCES userTypes(id) NOT NULL,
// profiletype SMALLINT REFERENCES profiletype(id),
// firstName VARCHAR(20) NOT NULL,
// lastName VARCHAR(30),
// photo TEXT,
// aboutmetitle TEXT,
// aboutme TEXT,
// mobile VARCHAR(16),
// portfoliolink TEXT,

export function renderProfileEdit() {
    const main = document.getElementById('main');
    main.innerHTML = '';
    
    const results = document.getElementById('results')
    results.innerHTML = ""
    
    main.innerHTML = `
    <div class="container bg-dark text-white px-10 py-10">
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <h1>Update Profile</h1>
            <form action="/" id="edit-profile-form" method="POST">
                <div class="form-group mb-4">
                    <label for="first-name">First Name</label>
                    <input type="text" class="form-control" id="first-name" name="first-name" placeholder="Enter your first name">
                </div>
              <div class="form-group mb-4">
                <label for="last-name">Last Name</label>
                <input type="text" class="form-control" id="last-name" name="last-name" placeholder="Enter your last name">
              </div>
                <div class="form-group mb-4">
                    <label for="about-me">Intro</label>
                    <textarea type="text" class="form-control" id="about-me" name="about-me" placeholder="Bring in some personality - your brand statement, your strengths, what you like and types of projects you want to work on"></textarea>
                </div>
                <input type="submit" class="btn btn-lg btn-outline-light align-self-center" value="Submit">
            </form>
        </div>
    </div>
</div>
    `
  
let form = document.getElementById("edit-profile-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const userId = getCookie(gitConnectId);
    const data = {
        firstName: formData.get("first-name"),
        lastName: formData.get("last-name"),
        aboutme: formData.get("about-me"),
    };
      
      console.log(data);

    axios
      .post("/api/profiles", data)
        .then((response) => {
          console.log(response)
        //   window.location = '/api/projects';
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
        let errorMessage = err.response.data.message;
        alert(errorMessage);
      });
  });
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}