import { renderProfile } from "./render-profile.js";
export function renderProjectEdit(project) {
  console.log("Project variable = ", project);
  const main = document.getElementById("main");
  main.innerHTML = "";
  const results = document.getElementById("results");
  results.innerHTML = "";
  let appLink = "";
        // Assign standard variables from profile response that we want to utilise
        if (project.app_link === null) {
            appLink = "";
        } else {
            appLink = project.app_link;
        };
  main.innerHTML = `
    <div class="container bg-dark text-white">
    <div class="row">
        <div class="col-md-6 py-4 gx-2 offset-md-3">
            <h3>Edit Gitconnect info for ${project.githubreponame}</h3>
            <form action="/api/projects/editform/" enctype="multipart/form-data" id="edit-project-form" method="POST">
                <div class="form-group mb-4">
                    <label for="project-name">Project Name</label>
                    <input type="text" class="form-control" id="project-name" name="project-name" placeholder="Enter your projects name" value="${project.projectname ? project.projectname : ''}">
                </div>
                <div class="form-group mb-4">
                    <label for="project-description">Project description</label>
                    <textarea type="text" class="form-control" id="project-description" name="project-description" placeholder="What was this project for? What problem were you solving? How did it go?">${project.description ? project.description : ''}</textarea>
                </div>
                <div class="form-group mb-4">
                    <label for="project-process">Process</label>
                    <textarea type="text" class="form-control" id="project-process" name="project-process" placeholder="What steps did you take during the project - how did you prepare? Did you use any design or project planning tools?">${project.process ? project.process : ''}</textarea>
                </div>
                <div class="form-group mb-4">
                    <label for="project-challenges">Challenges</label>
                    <textarea type="text" class="form-control" id="project-challenges" name="project-challenges" placeholder="What unexpected/expected challenges did you face? How did you navigate them?">${project.challenges ? project.challenges : ''}</textarea>
                </div>
                <div class="form-group mb-4">
                    <label for="project-outcomes">Outcomes</label>
                    <textarea type="text" class="form-control" id="project-outcomes" name="project-outcomes" placeholder="What was the project outcome? Was it successful? What did you learn and any reflections?">${project.outcomes ? project.outcomes : ''}</textarea>
                </div>
                <div class="form-group mb-4">
                    <label for="project-link">App Link</label>
                    <textarea type="text" class="form-control" id="project-link" name="project-link" placeholder="Link to your app">${appLink ? appLink : ''}</textarea>
                </div>
                <input type="submit" class="btn btn-lg btn-outline-light align-self-center" value="Submit">
                <input id="file" name="upload" type="file" class="btn btn-lg btn-outline-light align-self-center" 
                value="Submit" multiple="multiple">
              <input id="repoId" type="hidden" name="repoId" value='${project.repoid}'/>
              <input id="status" type="hidden" name="status" value="${project.status}"/>
                </form>
        </div>
    </div>
</div>
    `;
  let theForm = document.getElementById("edit-project-form");
  theForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(document.getElementById('file').files.length);
      const formData = new FormData(theForm);
      let sendingrequest

      if (document.getElementById('file').files.length == 0) {
        sendingrequest = async () => {
              await axios
                  .post("/api/projects/editform_no_image/", formData)
                  .then((response) => {
                      console.log(response);
                      //   window.location = '/api/projects';
                  })
                  .catch((err) => {
                      console.log(err);
                    //   console.log(err.data);
                    //   let errorMessage = err.response.data.message;
                    //   alert(errorMessage);
                  });
              renderProfile(project.userid);
          };
      } else {
          sendingrequest = async () => {
              await axios
                  .post("/api/projects/editform/", formData)
                  .then((response) => {
                      console.log(response);
                      //   window.location = '/api/projects';
                  })
                  .catch((err) => {
                      console.log(err);
                      console.log(err.message)
                      let errorMessage = err.message;
                      alert(errorMessage);
                  });
                  renderProfile(project.userid);
          };
      };
  sendingrequest();      
  });

}
