const addForm = document.getElementById('addForm');
const newBookBtn = document.querySelector('#newBtn');
newBookBtn.addEventListener('click', () => addForm.style.display = 'block');

const closeBtn = document.querySelector('#closeBtn');
closeBtn.addEventListener('click', () => addForm.style.display = 'none')

class Book {
    constructor(id, title, author, pages, read) {
        this.id = id;
        this.title = title; 
        this.author = author; 
        this.pages = pages;  
        this.read = read; 
    }
}

//let myLibrary = [];
const books = getBookStore();
books.forEach(book => addBookToLibrary(book));

function addBookToLibrary(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.read}</td>
        <td><button class="deleteBtn">Delete</button></td>
    `
    list.appendChild(row)
}

document.querySelector("#form").addEventListener('submit', (e) => {
    e.preventDefault()
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const checked = document.querySelector("#read").checked;

    if (title === '' || author === '' || pages === '') {
        alert("Please enter infomation")
    } else {
        let i = Math.floor(Math.random() * 100);
        let read;
        if (checked === true) {
            read = 'Read'
        } else {
            read = 'Not Read'
        }
        for (let j=0; j<getBookStore().length; j++) {
            if (getBookStore()[j].id === i) {
                i = Math.floor(Math.random() * 100);
            }
        }
        const newBook = new Book(i, title, author, pages, read);
        addBookToLibrary(newBook);
        addBookStore(newBook);
        clearInput();
        addForm.style.display = 'none'
    }
})

function clearInput() {
    document.querySelector("#title").value = ''
    document.querySelector("#author").value = '';
    document.querySelector("#pages").value = '';
}

function deleteBook(row) {
    if (row.classList.contains('deleteBtn')) {
        row.parentElement.parentElement.remove();
    }
}

document.querySelector("#book-list").addEventListener('click', (e) => {
    deleteBook(e.target);
    let id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    deleteBookStore(parseFloat(id));
})

function getBookStore() {
    let myLibrary;
    if (localStorage.getItem('book') === null) {
        myLibrary = []
    } else {
        myLibrary = JSON.parse(localStorage.getItem('book'));
    }
    return myLibrary;
}

function addBookStore(book) {
    const books = getBookStore();
    books.push(book);
    localStorage.setItem("book", JSON.stringify(books))
}

function deleteBookStore(id) {
    const books = getBookStore();
    books.forEach((book, index) => {
        if (book.id === id) {
            books.splice(index, 1);
        }
    })
    localStorage.setItem("book", JSON.stringify(books))
}



