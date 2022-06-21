import { makeAnEl } from '../../utils/dom-create.js';
import { renderProjectEdit } from './render-project-edit.js';

export function renderProfile(username) {
    const main = document.getElementById("main");
    main.innerHTML = "";

    // API RETURN:

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
    // githubutrl TEXT,
    // gitHubAvatar TEXT,
    // gitHubrepos_url TEXT,
    // gitHubFullName TEXT,
    // gitHubCompany TEXT,
    // gitHubBlog TEXT,
    // gitHubTwitter TEXT,
    // gitHubHirable TEXT,
    // gitHubLocation TEXT,
    // gitHubBio TEXT,
    // gitHubMemberSince TEXT
    // CONSTRAINT validate_email CHECK (email LIKE '%___@___%__%')

    axios.get(`/api/profiles/profilepage/${username}`).then((result) => {
        console.log(result)
        // if (result.data.success) {
        //     console.log(result)
        // } else {
        //     console.log("RESULTS", result.data.success);
        // }


        let profileData = result.data.user;
        // console.log(profileData)
        for (let data in profileData) {
            // console.log(`${data} ${profileData[data]}`)
        }
        let email = profileData.email;
        // console.log(profileData)
        let avatar = profileData.githubavatar;
        // console.log(userType)
        let githubName = profileData.githubname;
        let firstName = profileData.firstname;
        let lastName = profileData.lastname;
        let aboutme = profileData.aboutme;
        let mobile = profileData.mobile;
        //TYPO IN DB
        let githubUrl = profileData.githubutrl;


        let projectData = result.data.projects;
        // console.log(projectData)
        projectData.forEach((project) => {
            // console.log(project)
        })

        // projectResults.map((result) => {
        //     let id = result.userid
        //     let sql = `SELECT * FROM projects WHERE userid = ${id}`
        //     db.query(sql).then((result) => {
        //         usersAndProject.projects.userid = result.githubname
        //     })
        // })


        let projectOne = projectData[0];
        console.log(projectOne)
        let projectTwo = projectData[1];
        let projectThree = projectData[2];

        let projectOneGhName = projectOne.githubreponame;
        let projectOneTitle = projectOne.title;
        let projectOneDescription = projectOne.description;
        let projectOneImage = projectOne.titleimage;
        //should add link in db
        let projectOneLink = projectOne.link;
        let projectOneChallenges = projectOne.challenges;
        let projectOneProcess = projectOne.process;
        let projectOneOutcomes = projectOne.outcomes;

        let projectTwoGhName = projectTwo.githubreponame;
        let projectTwoTitle = projectTwo.title;
        let projectTwoDescription = projectTwo.description;
        let projectTwoImage = projectTwo.titleimage;
        //should add link in db
        let projectTwoLink = projectTwo.link;
        let projectTwoChallenges = projectTwo.challenges;
        let projectTwoProcess = projectTwo.process;
        let projectTwoOutcomes = projectTwo.outcomes;

        //EDIT IF LOGGED IN:
        // suggest limiting projects to 3 for simplicity for now

        let editProjectOne = ''
        let editProjectTwo = ''
        

        if (result.data.currentUser) {
            console.log('this is the current user')
            editProjectOne = makeAnEl('btn', {
                class: ['btn', 'btn-outline-light'],
                innerText: `Edit ${projectOneGhName}`,
                id: 'edit-project-1',
                onclick: `renderEditProject(${projectOneGhName})`
            });
            editProjectTwo = makeAnEl('btn', {
                class: ['btn', 'btn-outline-light'],
                innerText: `Edit ${projectTwoGhName}`,
                id: 'edit-project-2',
                onclick: `renderEditProject(${projectTwoGhName})`
            });
            console.log(editProjectOne)
            console.log(editProjectTwo)

        } else {
            console.log('this is not the current user')
            let editProjectOne = makeAnEl('btn', {
                display: 'none',
            });
            let editProjectTwo = makeAnEl('btn', {
                display: 'none',
            });
        }
          
//       </div>
//       <div></div>

//   </div>
//     `;
//   const logout = document.getElementById("logoutButton");
//   logout.addEventListener("click", () => {
//     axios.delete("/api/session").then(() => {
//       window.location = "/";
//     });
//   });
// }
