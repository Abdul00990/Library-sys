class Book {
    constructor(title, author, ISBN) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.id = ISBN; // Assuming ISBN is unique and using it as ID
        this.borrowed = false;
    }

    isBorrowed() {
        return this.borrowed;
    }
}

class User {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.borrowedBooks = [];
    }

    borrowBook(book) {
        if (this.borrowedBooks.length >= 3) {
            console.log(`${this.name} cannot borrow more than 3 books at a time.`);
            return false;
        }
        if (book.isBorrowed()) {
            console.log(`Book with ISBN ${book.ISBN} is already borrowed.`);
            return false;
        }
        book.borrowed = true;
        this.borrowedBooks.push(book);
        return true;
    }

    returnBook(book) {
        const index = this.borrowedBooks.findIndex(b => b.ISBN === book.ISBN);
        if (index !== -1) {
            book.borrowed = false;
            this.borrowedBooks.splice(index, 1);
        }
    }

    peekBook(ISBN) {
        return this.borrowedBooks.find(book => book.ISBN === ISBN);
    }
}

class Library {
    constructor() {
        this.books = [];
        this.members = [];
    }

    addNewBook(book) {
        this.books.push(book);
    }

    registerMember(user) {
        this.members.push(user);
    }

    borrowBook(user, ISBN) {
        const book = this.books.find(book => book.ISBN === ISBN);
        if (!book) {
            console.log(`Book with ISBN ${ISBN} not found in the library.`);
            return false;
        }
        return user.borrowBook(book);
    }

    returnBook(user, ISBN) {
        const book = this.books.find(book => book.ISBN === ISBN);
        if (!book) {
            console.log(`Book with ISBN ${ISBN} not found in the library.`);
            return false;
        }
        user.returnBook(book);
    }
}

// Create library
const library = new Library();

// Create books
const book1 = new Book("Oliver Twist", "Charles Dickens", "1234567890");
const book2 = new Book("The Game of Logic", "Lewis Carroll", "1234567891");
const book3 = new Book("Words for the Wise", "Timothy Shay Arthur", "1234567892");

// Add books to library
library.addNewBook(book1);
library.addNewBook(book2);
library.addNewBook(book3);

// Create users
const user1 = new User("Abdul", "1");
const user2 = new User("Muheez", "2");

// Register users
library.registerMember(user1);
library.registerMember(user2);

// Borrow books
library.borrowBook(user1, "1234567890"); // Abdul borrows The Great Gatsby
library.borrowBook(user1, "1234567891"); // Abdul borrows 1984
library.borrowBook(user1, "1234567892"); // Abdul borrows To Kill a Mockingbird

// Try to borrow more than 3 books
library.borrowBook(user1, "1234567893"); // Should fail

// Return a book
library.returnBook(user1, "1234567890"); // Abdul returns The Great Gatsby

// Peek a book in borrowed list
console.log(user1.peekBook("1234567891")); // Should return book details of 1984

