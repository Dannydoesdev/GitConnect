import { renderFirstTimeRegistration } from "./render-first-time-registration.js";
import { renderRego } from "./render-rego.js";
import { renderLogin } from "./render-login.js";

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
    default:
    // code block
  }
}