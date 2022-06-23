export function renderProjectEdit(project) {
    console.log("THE REPO/PROJECT ID PASSED = ",project)
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
                    <input type="text" class="form-control" id="project-name" name="project-name" value="${project.projectname}">
                </div>
                <div class="form-group mb-4">
                    <label for="project-description">Project description</label>
                    <textarea type="text" class="form-control" id="project-description" name="project-description"  >${project.description}</textarea>
                </div>
                <div class="form-group mb-4">
                    <label for="project-process">Process</label>
                    <textarea type="text" class="form-control" id="project-process" name="project-process"  value="${project.process}">${project.process}</textarea>
                </div>
                <div class="form-group mb-4">
                    <label for="project-challenges">Challenges</label>
                    <textarea type="text" class="form-control" id="project-challenges" name="project-challenges"  value="${project.challenges}"></textarea>
                </div>
                <div class="form-group mb-4">
                    <label for="project-outcomes">Outcomes</label>
                    <textarea type="text" class="form-control" id="project-outcomes" name="project-outcomes"  value="${project.outcomes}"></textarea>
                </div>
                <input type="submit" class="btn btn-lg btn-outline-light align-self-center" value="Submit">
                <input id="file" name="upload" type="file" class="btn btn-lg btn-outline-light align-self-center" 
                value="Submit" multiple="multiple">
              <input id="repoId" type="hidden" name="repoId" value="${project.repoid}"/>
              <input id="status" type="hidden" name="status" value="${project.status}"/>
                </form>
        </div>
    </div>
</div>
    `;
}
