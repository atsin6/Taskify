import { renderSigninPage } from "./signin";
import { renderSignupPage } from "./signup";
import { goToHome } from "./landingPage";

export function renderNavbar() {
  const navbar = document.createElement("nav");
  navbar.className = "navbar";

  const title = document.createElement("div");
  title.className = "Title";
  title.innerHTML = "Taskify.DO";
  title.addEventListener("click", (event) => {
    goToHome();
  });

  const navPanel = document.createElement("div");
  navPanel.className = "navPanel";

  const signinBtn = document.createElement("div");
  signinBtn.className = "authBtnNav";
  signinBtn.id = "signinBtnNav";
  signinBtn.innerHTML = "Sign In";
  signinBtn.addEventListener("click", (event) => {
    renderSigninPage();
  });

  const signupBtn = document.createElement("div");
  signupBtn.className = "authBtnNav";
  signupBtn.innerHTML = "Start for free";
  signupBtn.id = "signupBtnNav";
  signupBtn.addEventListener("click", (event) => {
    renderSignupPage();
  });

  navPanel.append(signinBtn, signupBtn);
  navbar.append(title, navPanel);

  return navbar;
}
