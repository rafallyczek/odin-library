const libraryModule = (() => {
  const library = [
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

  //DOM
  const form = document.querySelector(".form");
  const cards = document.querySelector(".cards");
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const description = document.getElementById("description");

  //Listeners
  form.addEventListener("submit", addBookToLibrary);
  form.addEventListener("focusout", _validateForm);
  form.addEventListener("input", _validateForm);

  _displayBooks();

  function _validateForm(event){
    const eventType = event.type;
    const mode = event.target.getAttribute("data-mode");

    if ( (eventType === "focusout" && mode === "lazy") || (eventType === "input" && mode === "aggressive") ) {
      if (event.target.id === "pages") {
        _validatePages(event.target);
      } else {
        _validateText(event.target);
      }
    }
  }

  //Validators
  function _validatePages(target){
    if (!_isRequired(target)) {
      _setInvalid(target, "This field is required");
      return;
    } else if (!_isLongEnough(target)) {
      _setInvalid(target, "Too few pages");
      return;
    }
  
    _setValid(target);
  }

  function _validateText(target) {
    if (!_isRequired(target)) {
      _setInvalid(target, "This field is required");
      return;
    }
  
    _setValid(target);
  }

  //Utility
  function _isRequired(target) {
    if (target.validity.valueMissing) {
      return false;
    } else {
      return true;
    }
  }

  function _isLongEnough(target) {
    if (target.validity.rangeUnderflow) {
      return false;
    } else {
      return true;
    }
  }

  function _setInvalid(target, message) {
    if (target.classList.contains("valid")) {
      target.classList.remove("valid");
    }
  
    target.classList.add("invalid");
    target.setAttribute("data-mode", "aggressive");
    target.nextElementSibling.textContent = message;
    target.nextElementSibling.style.visibility = "visible";
  }
  
  function _setValid(target) {
    if (target.classList.contains("invalid")) {
      target.classList.remove("invalid");
    }
  
    target.classList.add("valid");
    target.setAttribute("data-mode", "lazy");
    target.nextElementSibling.textContent = "";
    target.nextElementSibling.style.visibility = "hidden";
  }

  function _displayBooks() {
    _clearBooks();
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
  
  function _clearBooks() {
    let child = cards.firstElementChild;
    while (child) {
      cards.removeChild(child);
      child = cards.firstElementChild;
    }
  }

  function _resetInputs(){
    title.value = "";
    author.value = "";
    pages.value = "";
    description.value = "";
    title.classList.remove("valid");
    author.classList.remove("valid");
    pages.classList.remove("valid");
  }

  //Library functions
  function addBookToLibrary(event){
    event.preventDefault();
    if(!description.value){
      description.value = "This book has no description.";
    }
    const book = bookFactory(title.value, author.value, pages.value, description.value);
    library.push(book);
    _resetInputs();
    _displayBooks();
  }

  function deleteBookFromLibrary(index) {
    library.splice(index, 1);
    _displayBooks();
  }

  function toggleRead(index){
    if(library[index].read){
      library[index].read = false;
    }else{
      library[index].read = true;
    }
  }

  //Book object factory
  function bookFactory(title, author, pages, description, read = false){
    return { title, author, pages, description, read };
  }

})();