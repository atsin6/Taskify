import "../styles/landingPage.css";
import { renderSigninPage } from "./signin";
import { renderSignupPage } from "./signup";

export function renderLandingPage() {
  const landingPage = document.createElement("div");
  landingPage.id = "landingPage";

  const overview = document.createElement("div");
  overview.id = "overview";

  const tagline = document.createElement("h1");
  tagline.textContent = "Organize. Prioritize. Win.";
  tagline.id = "tagLine";

  const valueProp = document.createElement("div");
  valueProp.innerHTML =
    "Taskify helps you organize, track, and complete tasks effortlessly. <br> With drag-and-drop boards and smart categories, stay focused and boost your productivity — all in one clean, simple workspace.";

  valueProp.id = "valueProp";

  const authDiv = document.createElement("div");
  authDiv.id = "authDiv";

  const loginBtn = document.createElement("div");
  loginBtn.className = "authBtn";
  loginBtn.innerHTML = "Log In";
  loginBtn.id = "loginBtn";
  loginBtn.addEventListener("click", (event) => {
    renderSigninPage();
  });

  const signupBtn = document.createElement("div");
  signupBtn.className = "authBtn";
  signupBtn.innerHTML = "Start for free";
  signupBtn.id = "signupBtn";
  signupBtn.addEventListener("click", (event) => {
    renderSignupPage();
  });

  authDiv.append(loginBtn, signupBtn);

  overview.append(tagline, valueProp, authDiv);

  landingPage.append(overview);

  return landingPage;
}

export async function goToHome() {
  const signinBtn = document.querySelector("#signinBtnNav");
  signinBtn.classList.remove("hideBtn");

  const signupBtn = document.querySelector("#signupBtnNav");
  signupBtn.innerHTML = "Start for free";
  signupBtn.classList.remove("hideBtn");

  const homepage = document.querySelector("#homepage");
  homepage.replaceChildren();

  const landingPage = renderLandingPage();
  homepage.append(landingPage);
}
