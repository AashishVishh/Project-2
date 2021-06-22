console.log('This is ES6 version of Project 2');

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    //Implement the Add function
    add(book) {
        console.log('Adding to UI');
        this.saveToLocalStorage(book);
        Display.displayBooksTable();
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        } else {
            return true;
        }
    }

    static show(type, showMessage) {
        let message = document.getElementById('message');
        let boldText = showMessage === 'success' ? 'Success' : 'Error!';
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${showMessage}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = "";
        }, 5000);
    }

    //save to local storage
    saveToLocalStorage(givenBooks) {
        let books = localStorage.getItem('library');
        let bookObj = Display.getBookfromLocalStorage(books);

        let myObj = {
            name : givenBooks.name,
            author : givenBooks.author,
            type : givenBooks.type
        }

        bookObj.push(myObj);

        localStorage.setItem('library', JSON.stringify(bookObj));
    }

    //fill data
    static displayBooksTable() {
        let books = localStorage.getItem('library');
        let bookObj = Display.getBookfromLocalStorage(books);

        let tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';
        bookObj.forEach(function(element, index) {
            let uiString = `<tr>
                            <td>${element.name}</td>
                            <td>${element.author}</td>
                            <td>${element.type}</td>
                            <td><button id='${index}' onclick="Display.funDeleteBooks(this.id)" class="btn btn-danger">Delete</button></td>
                        </tr>`;
            tableBody.innerHTML += uiString;
        });

    }

    //delete books
    static funDeleteBooks(deleteId){
        let books = localStorage.getItem('library');
        let bookObj = Display.getBookfromLocalStorage(books);
        bookObj.splice(deleteId, 1);
        localStorage.setItem('library', JSON.stringify(bookObj));
        Display.displayBooksTable();
        Display.show('success','Book Deleted Successfully!');
    }

    static getBookfromLocalStorage(books) {
        let bookObj = [];
        if (books == null) {
            bookObj = [];
        }
        else {
            bookObj = JSON.parse(books);
        }
        return bookObj;
    }
}


//Display all the books which is added
Display.displayBooksTable();
//Add submit event Listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('You have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type = document.querySelector('input[name="type"]:checked').value;

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        Display.show('success', 'Your Book has been successfully added!');
    } else {
        //display error
        display.show('danger', 'Please do not leave any fields blank!');
    }

    e.preventDefault();
}