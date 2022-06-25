// import { makeAnEl } from '../../utils/dom-create.js';
import { renderProfile } from './render-profile.js';

// id SERIAL PRIMARY KEY,
// githubName TEXT,
// email TEXT UNIQUE,
// userType SMALLINT REFERENCES userTypes(id) NOT NULL,
// profiletype SMALLINT REFERENCES profiletype(id),
// firstName VARCHAR(20),
// lastName VARCHAR(30),
// photo TEXT,
// aboutmetitle TEXT,
// aboutme TEXT,
// mobile VARCHAR(16),
// portfoliolink TEXT,
// githubuserurl TEXT,
// gitHubAvatar TEXT,
// gitHubrepos_url TEXT,
// gitHubFullName TEXT,
// gitHubCompany TEXT,
// gitHubBlog TEXT,
// gitHubTwitter TEXT,
// gitHubHirable TEXT,
// gitHubLocation TEXT,
// gitHubBio TEXT,
// gitHubMemberSince TEXT,
// coverPhoto TEXT,

export function renderProfileEdit(id) {
  axios.get(`api/profiles/profilepage/${id}`).then(result => {
    console.log(result)
 
    let profile = result.data.user
    // .then(dbRes => {
    //   console.log(dbRes.data)
    // })
    let { firstname, lastname, aboutme, portfoliolink, location } = '';

    if (profile.firstname) {
      firstname = profile.firstname;
    }
    if (profile.lastname) {
      lastname = profile.lastname;
    }
    if (profile.aboutme) {
      aboutme = profile.aboutme;
    }
    if (profile.portfoliolink) {
      portfoliolink = profile.portfoliolink;
    }
    if (profile.gitHubLocation) {
      location = profile.gitHubLocation;
    };

   
    const main = document.getElementById('main');
    main.innerHTML = '';
    
    const results = document.getElementById('results')
    results.innerHTML = "";
    
    main.innerHTML = `
    <div class="container bg-dark text-white px-5 py-5">
    <div class="row">
        <div class="col-md-6 py-4 gx-2 offset-md-3">
            <h3>Update Profile</h3>
            <form action="/" id="edit-profile-form" method="POST">
                <div class="form-group mb-4">
                    <label for="first-name">First Name</label>
                    <input type="text" class="form-control" id="first-name" name="first-name" value="${firstname ? firstname : ''}" placeholder="Enter your first name">
                </div>
                <div class="form-group mb-4">
                    <label for="last-name">Last Name</label>
                    <input type="text" class="form-control" id="last-name" name="last-name" value="${lastname ? lastname : ''}" placeholder="Enter your last name">
                </div>
                <div class="form-group mb-4">
                    <label for="about-me">Intro</label>
                    <textarea type="text" class="form-control" id="about-me" name="about-me" placeholder="Bring in some personality - your brand statement, your strengths, what you like and types of projects you want to work on">${aboutme ? aboutme : ''}</textarea>
                </div>
                <div class="form-group mb-4">
                    <label for="location">Location</label>
                    <input type="text" class="form-control" value="${location ? location : ''}" id="location" name="location" placeholder="Where are you located?">
                </div>
                  <div class="form-group mb-4">
                  <label for="portfolio-link">Personal website link</label>
                  <input type="text" class="form-control" id="portfolio-link" name="portfolio-link" value="${portfoliolink ? portfoliolink : ''}" placeholder="If you have a personal website you can link add it here">
                </div>
                <input type="submit" class="btn btn-lg btn-outline-light align-self-center" value="Submit">
            </form>
        </div>
    </div>
</div>
    `
    let data = '';
    let form = document.getElementById("edit-profile-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const userId = getCookie("gitConnectId");
      const data = {
        firstName: formData.get("first-name"),
        lastName: formData.get("last-name"),
        aboutme: formData.get("about-me"),
        location: formData.get("location"),
        portfoliolink: formData.get("portfolio-link"),
      };
      axios
        .post(`/api/profiles/${id}`, data)
        .then((response) => {
          console.log(response)
          renderProfile(id)
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.data);
          let errorMessage = err.response.data.message;
          alert(errorMessage);
        });
      // console.log(data);
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