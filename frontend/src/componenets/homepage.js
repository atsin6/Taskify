import "../styles/homepage.css";
import "../styles/navbar.css";
import { renderNavbar } from "./navbar";
import { renderLandingPage } from "./landingPage";

export function renderHome() {
  const body = document.querySelector("body");
  const homepage = document.querySelector("#homepage");

  const navbar = renderNavbar();
  const landingPage = renderLandingPage();

  homepage.append(landingPage);
  body.append(navbar, homepage);
}
