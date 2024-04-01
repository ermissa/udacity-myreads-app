import React, { useState } from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";

const SearchBooks = ({ onMoveBook, currentBooks }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const updateQuery = (query) => {
    setQuery(query);
    searchBooks(query);
  };

  const searchBooks = (query) => {
    if (query.length > 0) {
      BooksAPI.search(query).then((results) => {
        if (results.error) {
          setSearchResults([]);
        } else {
          const updatedResults = results.map((result) => {
            const match = currentBooks.find((book) => book.id === result.id);
            result.shelf = match ? match.shelf : "none";
            return result;
          });
          setSearchResults(updatedResults);
        }
      });
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults.map((book) => (
            <Book key={book.id} book={book} onMoveBook={onMoveBook} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchBooks;
