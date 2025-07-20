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

  const loginBtn = document.createElement("div");
  loginBtn.className = "authBtnNav";
  loginBtn.innerHTML = "Log In";
  loginBtn.addEventListener("click", (event) => {
    renderSigninPage();
  });

  const signupBtn = document.createElement("div");
  signupBtn.className = "authBtnNav";
  signupBtn.innerHTML = "Start for free";
  signupBtn.id = "signupBtn";
  signupBtn.addEventListener("click", (event) => {
    renderSignupPage();
  });

  navPanel.append(loginBtn, signupBtn);
  navbar.append(title, navPanel);

  return navbar;
}
