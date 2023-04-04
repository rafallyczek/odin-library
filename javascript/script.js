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
    read: true,
  },
  {
    title: "The Ravenmaster",
    author: "Christopher Skaife ",
    pages: 256,
    description: "This book has no description.",
    read: true,
  },
  {
    title: "Clean Code",
    author: "Martin Robert",
    pages: 464,
    description: "This book has no description.",
    read: false,
  },
];

function Book(title, author, pages, description, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.description = description;
  this.read = read;
}

function addBookToLibrary(title, author, pages, description) {
  if (description === "") {
    description = "This book has no description.";
  }
  const book = new Book(title, author, pages, description);
  library.push(book);
  clearBooks();
  displayBooks();
}

function deleteBookFromLibrary(index) {
  library.splice(index, 1);
  clearBooks();
  displayBooks();
}

function toggleRead(index){
  if(library[index].read){
    library[index].read = false;
  }else{
    library[index].read = true;
  }
}

function displayBooks() {
  for (let i = 0; i < library.length; i++) {
    const card = document.createElement("div");
    const buttons = document.createElement("div");
    const deleteButton = document.createElement("button");
    const checkboxLabel = document.createElement("label");
    const checkbox = document.createElement("input");
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

    buttons.classList.add("card-buttons");

    checkboxLabel.htmlFor = `toggle${i}`;
    checkboxLabel.textContent = "Read";

    checkbox.type = "checkbox";
    checkbox.id = `toggle${i}`;
    if(library[i].read){
      checkbox.checked = true;
    }
    checkbox.addEventListener("change", () => {
      toggleRead(i);
    });

    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => {
      deleteBookFromLibrary(i);
    });

    buttons.appendChild(checkboxLabel);
    buttons.appendChild(checkbox);
    buttons.appendChild(deleteButton);

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

    card.appendChild(buttons);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(description);
    card.setAttribute("data-id", i);

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
