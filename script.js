"use strict";

// Store all the book data here
let myLibrary = [];

// Object Book
function Book(id, title, author, pages, read, info) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return info;
    }
}
// Display input area
let menu = document.getElementById("menu");
menu.addEventListener("click", () => {
    let inputs = document.getElementById("inputs");
    inputs.classList.toggle("active");
    cards.classList.toggle("activeCard");
})

// Close input area
let close = document.getElementById("close");
close.addEventListener("click", () => {
    inputs.classList.toggle("active");
    cards.classList.toggle("activeCard");
})

// Enable enter key
var inputNo = document.getElementById("pages");
inputNo.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === "Enter") {
        addBtn.click();
    }
});

let readBtn;
let vRead;
let addBtn = document.querySelector("#add");
addBtn.addEventListener("click", () => {
    getInput();
    let myLibLength = myLibrary.length;
    let cards = document.querySelector("#cards");
    createNewCard(myLibLength, vRead);
    displayBooks();
    clearInput();

    readBtn = document.querySelectorAll("button.read");
    readBtn.forEach((button) => {
        button.onclick = (e) => {
            let targetId = e.target.id;
            let targetNo = targetId.match(/\d+/)[0];
            let targetDiv = document.getElementById(`card${targetNo}`);

            if (e.target.innerHTML == "Read") {
                e.target.innerHTML = "Not read";
            }
            else {
                e.target.innerHTML = "Read";
            }
            e.target.parentElement.classList.toggle("isRead");
        }
    })
    let closeBtn = document.querySelectorAll("img#cross");
    closeBtn.forEach((closeBtn) => {
        closeBtn.onclick = (e) => {
            let parent = e.target.parentElement.id.match(/\d+/)[0]
            let test = document.getElementById(`title${parent}`).innerHTML;
            var findBook = myLibrary.findIndex(function(book, index) {
                if(book.id == test)
                    return true;
            });
            removeFromLibrary(findBook);
            e.target.parentElement.remove();
        }
    })
})

// Create a new card
function createNewCard(length, isRead) {
    let card = document.createElement("div");
    card.className = "card";
    if (isRead == "Read") {
        card.classList.add("isRead")
    }
    card.id = `card${length}`;
    let img = document.createElement("img");
    img.src = "582631-200.png";
    img.id = "cross";
    let title = document.createElement("p");
    title.id = `title${length}`;
    let author = document.createElement("p");
    author.id = `author${length}`;
    let pages = document.createElement("p");
    pages.id = `pages${length}`;
    let read = document.createElement("button");
    read.id = `read${length}`;
    read.className = "read";
    cards.appendChild(card);
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
}

// Add a new Book object to library
function addBookToLibrary(obj) {
    myLibrary.push(obj);
}

// Remove a book if it's deleted
function removeFromLibrary(param) {
    myLibrary.splice(param, 1)
}

// Clear input area upon submit
function clearInput() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").checked = false;
}

// Display all the books in the myLibrary array
function displayBooks() {

    for (let i = 0; i < myLibrary.length; i++) {
        let newTitle = document.getElementById(`title${i+1}`)
        newTitle.innerHTML = myLibrary[i].title;
        newTitle.style.fontSize = "22px";
        let newAuthor = document.getElementById(`author${i+1}`)
        newAuthor.innerHTML = myLibrary[i].author;
        let newPages = document.getElementById(`pages${i+1}`)
        newPages.innerHTML = `${myLibrary[i].pages} pages`;
        let newRead = document.getElementById(`read${i+1}`)
        newRead.innerHTML = myLibrary[i].read;
    }
    return myLibrary;
}

function getInput() {
    let vId = myLibrary.length + 1;
    let vTitle = document.getElementById("title").value;
    let vAuthor = document.getElementById("author").value;
    let vPages = document.getElementById("pages").value;
    vRead = document.getElementById("read").checked;
    if (vRead == false) {
        vRead = "Not read";
    }
    else {
        vRead = "Read";
    }
    let newBook = new Book(vId, vTitle, vAuthor, vPages, vRead);
    addBookToLibrary(newBook);
    return vRead;
}

