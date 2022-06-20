// One stop function to display and render all pages at 1 call. 
// TODO: the 'case ' numbers below should be more descriptive. Ideally from a common CONSTANTS module.

import { renderFirstTimeRegistration } from "./render-first-time-registration.js";
import { renderRego } from "./render-rego.js";
import { renderLogin } from "./render-login.js";
import { renderProfileEdit } from "./render-profile-edit.js";
import { renderHome } from "./home-startup.js";
import { render } from "./constants.js";

export function whichPageToShow(thePageToShow, gitHubName) {
  switch (thePageToShow) {
    case render.FirstTimeRegistration:
      renderFirstTimeRegistration(gitHubName); // The landing page when the user first registers
      break;
    case render.Rego:
      renderRego();
      break;
    case render.Login:
      renderLogin();
      break;
    case render.ProfileEdit:
      renderProfileEdit();
      break;
    case render.Home:
      renderHome();
      break;
    default:
  }
}