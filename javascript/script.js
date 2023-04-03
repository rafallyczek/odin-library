//
// Constants and variables
//
const form = document.querySelector(".form");

let library = [];

function Book(title, author, pages, description) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.description = description;
}

function addBookToLibrary() {}

//
// Listeners
//
form.addEventListener("submit", (e) => {
  const errors = document.querySelectorAll(".invalid");
  if (errors.length > 0) {
    e.preventDefault();
  }
});

//Lazy validation
form.addEventListener("focusout", (e) => {
  let mode = e.target.getAttribute("data-mode");

  if (mode === "lazy") {
    if (e.target.id === "pages") {
      validatePages(e.target);
    } else {
      validateText(e.target);
    }
  }
});

//Aggressive validation
form.addEventListener("input", (e) => {
  let mode = e.target.getAttribute("data-mode");

  if (mode === "aggressive") {
    if (e.target.id === "pages") {
      validatePages(e.target);
    } else {
      validateText(e.target);
    }
  }
});

//
//Validators
//
function validatePages(input) {
  if (!isRequired(input)) {
    setInvalid(input, "This field is required");
    return;
  } else if (!isLongEnough(input)) {
    setInvalid(input, "Too few pages");
    return;
  }

  setValid(input);
}

function validateText(input) {
  if (!isRequired(input)) {
    setInvalid(input, "This field is required");
    return;
  }

  setValid(input);
}

//
// Utility functions
//
function isRequired(input) {
  if (input.validity.valueMissing) {
    return false;
  } else {
    return true;
  }
}

function isLongEnough(input) {
  if (input.validity.rangeUnderflow) {
    return false;
  } else {
    return true;
  }
}

function setInvalid(input, message) {
  if (input.classList.contains("valid")) {
    input.classList.remove("valid");
  }

  input.classList.add("invalid");
  input.setAttribute("data-mode", "aggressive");
  input.nextElementSibling.textContent = message;
  input.nextElementSibling.style.visibility = "visible";
}

function setValid(input) {
  if (input.classList.contains("invalid")) {
    input.classList.remove("invalid");
  }

  input.classList.add("valid");
  input.setAttribute("data-mode", "lazy");
  input.nextElementSibling.textContent = "";
  input.nextElementSibling.style.visibility = "hidden";
}
