//
// Constants and variables
//
const form = document.querySelector(".form");
const cards = document.querySelector(".cards");

let library = [
  {
    title: "Hobbit",
    author: "J.R.R.Tolkien",
    pages: 310,
    description: "This book has no description.",
  },
  {
    title: "The Ravenmaster",
    author: "Christopher Skaife ",
    pages: 256,
    description: "This book has no description.",
  },
  {
    title: "Clean Code",
    author: "Martin Robert",
    pages: 464,
    description: "This book has no description.",
  },
];

function Book(title, author, pages, description) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.description = description;
}

function addBookToLibrary(title, author, pages, description) {
  const book = new Book(title, author, pages, description);
  library.push(book);
  clearBooks();
  displayBooks();
}

function displayBooks() {
  for (let i = 0; i < library.length; i++) {
    const card = document.createElement("div");
    const title = document.createElement("h3");
    const author = document.createElement("p");
    const authorSpan = document.createElement("span");
    const authorText = document.createTextNode("Author: ");
    const pages = document.createElement("p");
    const pagesSpan = document.createElement("span");
    const pagesText = document.createTextNode("Pages: ");
    const description = document.createElement("p");

    card.classList.add("card");
    card.classList.add("bgc-light");
    card.classList.add("box-shadow");

    title.textContent = library[i].title;

    authorSpan.classList.add("fw-bold");
    authorSpan.textContent = library[i].author;
    author.appendChild(authorText);
    author.appendChild(authorSpan);

    pagesSpan.classList.add("fw-bold");
    pagesSpan.textContent = library[i].pages;
    pages.appendChild(pagesText);
    pages.appendChild(pagesSpan);

    description.textContent = library[i].description;

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(description);

    cards.appendChild(card);
  }
}

function clearBooks() {
  let child = cards.firstElementChild;
  while (child) {
    cards.removeChild(child);
    child = cards.firstElementChild;
  }
}

displayBooks();

//
// Listeners
//
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const errors = document.querySelectorAll(".invalid");
  if (errors.length > 0) {
    return;
  } else {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const description = document.getElementById("description").value;
    addBookToLibrary(title, author, +pages, description);
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
