// One stop function to display and render all pages at 1 call. 
// TODO: the 'case ' numbers below should be more descriptive. Ideally from a common CONSTANTS module.

import { renderFirstTimeRegistration } from "./render-first-time-registration.js";
import { renderRego } from "./render-rego.js";
import { renderLogin } from "./render-login.js";
import { renderProfileEdit } from "./render-profile-edit.js";



export function whichPageToShow(thePageToShow, gitHubName) {
  switch (thePageToShow) {
    case 1:
      renderFirstTimeRegistration(gitHubName); // The landing page when the user first registers
      break;
    case 2:
      renderRego();
      // code block
      break;
    case 3:
      renderLogin();
      break;
    case 4:
      renderProfileEdit();
      break;
    default:
    // code block
  }
}