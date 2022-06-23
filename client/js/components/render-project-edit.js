export function renderProjectEdit(projectName) {
    const main = document.getElementById('main');
    main.innerHTML = '';
    const results = document.getElementById('results')
    results.innerHTML = ""
    main.innerHTML = `
    <div class="container bg-dark text-white">
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <h1>Project Title</h1>
            <form action="/api/projects/editform/" enctype="multipart/form-data" id="edit-project-form" method="POST">
                <div class="form-group mb-4">
                    <label for="project-name">Project Name</label>
                    <input type="text" class="form-control" id="project-name" name="project-name" placeholder="Enter your projects name">
                </div>
                <div class="form-group mb-4">
                    <label for="project-description">Project description</label>
                    <textarea type="text" class="form-control" id="project-description" name="project-description" placeholder="What was this project for? What problem were you solving? How did it go?"></textarea>
                </div>
                <div class="form-group mb-4">
                    <label for="project-process">Process</label>
                    <textarea type="text" class="form-control" id="project-process" name="project-process" placeholder="What steps did you take during the project - how did you prepare? Did you use any design or project planning tools?"></textarea>
                </div>
                <div class="form-group mb-4">
                    <label for="project-challenges">Challenges</label>
                    <textarea type="text" class="form-control" id="project-challenges" name="project-challenges" placeholder="What unexpected/expected challenges did you face? How did you navigate them?"></textarea>
                </div>
                <div class="form-group mb-4">
                    <label for="project-outcomes">Outcomes</label>
                    <textarea type="text" class="form-control" id="project-outcomes" name="project-outcomes" placeholder="What was the project outcome? Was it successful? What did you learn and any reflections?"></textarea>
                </div>
                <input type="submit" class="btn btn-lg btn-outline-light align-self-center" value="Submit">
                <input id="file" name="upload" type="file" class="btn btn-lg btn-outline-light align-self-center" 
                value="Submit" multiple="multiple">
              <input id="repoId" type="hidden" name="repoId" value="9791112"/>
              <input id="status" type="hidden" name="status" value="1"/>
                </form>
        </div>
    </div>
</div>
    `
}
