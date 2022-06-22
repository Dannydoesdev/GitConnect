/*
        Cloudinary Function for uploading images to the GitConnect server

*/

//  Copy and past the below import statement to the top of your code.

//  import * as imageUploader from "./Function-cloudinary.js"
//  USAGE: place in the button controller.
//  Also.....ensure there is a input for the user to select the file  <input type="file" name="upload" multiple="multiple" /><br/>
//  SYNTAX: imageUploader.uploadProfileImage(<FORM DATA>)


const uploadType = {
    profileImage:1,
    projectImage:2
}
//  Public  functions
export function uploadProfileImage(theFormData){
    __uploadImageToGitConnect(theFormData,uploadType.profileImage)
}
export function uploadProjectImage(theFormData) {
    __uploadImageToGitConnect(theFormData, uploadType.projectImage);
}

//      Private functions
function __uploadImageToGitConnect(theForm,type) {
  // theForm must include the file and the user ID
  // If uploading a repo/project image (type = projectImage) then a repo id is required too
  //  No sync/await required for now.
    const API = "/api/userimages/uploadImage";
    if (type == profileImage){
        API = "/api/userimages/uploadProfileImage";
    }
      axios
        .post("/api/userimages/uploadimage", theForm)
        .then((response) => {
          console.log(response);
          //   window.location = '/api/projects';
          return true
        })
        .catch((err) => {
          console.log(err.response.data);
          return false
        });
}