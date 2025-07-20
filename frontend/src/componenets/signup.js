import { renderSigninPage } from "./signin";

export function renderSignupDiv() {
  const signupDiv = document.createElement("div");
  signupDiv.className = "authDiv";

  const title = document.createElement("h1");
  title.innerHTML = "SignUp";
  title.className = "title";

  const signupForm = document.createElement("form");
  signupForm.id = "myForm";
  signupForm.className = "form";

  const nameLabel = document.createElement("label");
  nameLabel.innerHTML = "Name";
  nameLabel.className = "label";
  nameLabel.setAttribute("for", "name");

  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.className = "input";
  nameInput.id = "name";
  nameInput.name = "name";
  nameInput.placeholder = "Enter your Name";
  nameInput.maxLength = "100";

  const errorMsgName = document.createElement("h6");
  errorMsgName.className = "errMsg";
  errorMsgName.id = "errMsgName";

  const emailLabel = document.createElement("label");
  emailLabel.innerHTML = "Email";
  emailLabel.className = "label";
  emailLabel.setAttribute("for", "email");

  const emailInput = document.createElement("input");
  emailInput.setAttribute("type", "text");
  emailInput.className = "input";
  emailInput.id = "email";
  emailInput.name = "email";
  emailInput.placeholder = "Enter your email";
  emailInput.maxLength = "320";

  const errorMsgEmail = document.createElement("h6");
  errorMsgEmail.className = "errMsg";
  errorMsgEmail.id = "errMsgEmail";

  const passwordLabel = document.createElement("label");
  passwordLabel.innerHTML = "Password";
  passwordLabel.className = "label";
  passwordLabel.setAttribute("for", "password");

  const passwordInput = document.createElement("input");
  passwordInput.setAttribute("type", "password");
  passwordInput.className = "input";
  passwordInput.id = "password";
  passwordInput.name = "password";
  passwordInput.placeholder = "Enter a valid password";

  const errorMsgPassword = document.createElement("h6");
  errorMsgPassword.className = "errMsg";
  errorMsgPassword.id = "errMsgPassword";

  const signupBtn = document.createElement("button");
  signupBtn.textContent = "Signup";
  signupBtn.className = "btn";
  signupBtn.type = "submit";

  signupBtn.addEventListener("click", (event) => {});

  const signinOption = document.createElement("div");
  signinOption.id = "signinOption";
  signinOption.innerHTML = "Already have an account? ";
  const signinLink = document.createElement("a");
  signinLink.innerHTML = "Sign In";
  signinLink.id = "signinLink";
  signinOption.addEventListener("click", (event) => {
    renderSigninPage();
  });

  signinOption.append(signinLink);

  signupForm.append(
    nameLabel,
    nameInput,
    errorMsgName,
    emailLabel,
    emailInput,
    errorMsgEmail,
    passwordLabel,
    passwordInput,
    errorMsgPassword,
    signupBtn,
    signinOption
  );

  renderSigninPage;

  signupDiv.append(title, signupForm);

  return signupDiv;
}

export function renderSignupPage() {
  const signinBtn = document.querySelector("#signinBtnNav");
  signinBtn.classList.remove("hideBtn");

  const signupBtn = document.querySelector("#signupBtnNav");
  signupBtn.classList.add("hideBtn");
  const homepage = document.querySelector("#homepage");
  homepage.replaceChildren();

  const signupDiv = renderSignupDiv();
  homepage.append(signupDiv);
}
