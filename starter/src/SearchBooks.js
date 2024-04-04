import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

const SearchBooks = ({ onMoveBook, currentBooks }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const debouncedSearchBooks = debounce((nextQuery) => {
    if (!nextQuery.trim()) {
      setSearchResults([]);
      return;
    }
    BooksAPI.search(nextQuery).then((results) => {
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
  }, 500);

  useEffect(() => {
    debouncedSearchBooks(query);
    return () => {
      debouncedSearchBooks.cancel();
    };
  }, [query, debouncedSearchBooks]);

  const updateQuery = (query) => {
    setQuery(query);
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
