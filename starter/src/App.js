import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";
import SearchBooks from "./SearchBooks";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
  }, []);

  const moveBookToShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      setBooks(books.filter((b) => b.id !== book.id).concat(book));
    });
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  title="Currently Reading"
                  books={books.filter(
                    (book) => book.shelf === "currentlyReading"
                  )}
                  onMoveBook={moveBookToShelf}
                />
                <BookShelf
                  title="Want to Read"
                  books={books.filter((book) => book.shelf === "wantToRead")}
                  onMoveBook={moveBookToShelf}
                />
                <BookShelf
                  title="Read"
                  books={books.filter((book) => book.shelf === "read")}
                  onMoveBook={moveBookToShelf}
                />
                <div className="open-search">
                  <Link to="/search"></Link>
                </div>
              </div>
            </div>
          </div>
        }
      />
      <Route
        exact
        path="/search"
        element={
          <SearchBooks onMoveBook={moveBookToShelf} currentBooks={books} />
        }
      />
    </Routes>
  );
}

export default App;
