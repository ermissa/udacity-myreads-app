import React from "react";
import PropTypes from "prop-types";

const shelves = [
  {
    id: "1",
    shelfName: "currentlyReading",
    shelfDisplayName: "Currently Reading",
  },
  { id: "2", shelfName: "wantToRead", shelfDisplayName: "Want to Read" },
  { id: "3", shelfName: "read", shelfDisplayName: "Read" },
  { id: "4", shelfName: "none", shelfDisplayName: "None" },
];

const Book = ({ book, onMoveBook }) => {
  const handleChange = (e) => {
    onMoveBook(book, e.target.value);
  };

  const coverImage =
    book.imageLinks && book.imageLinks.thumbnail
      ? book.imageLinks.thumbnail
      : "";

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${coverImage})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={handleChange}>
              <option disabled>
                Move to...
              </option>
              {shelves.map((shelf) => (
                <option key={shelf.id} value={shelf.shelfName}>
                  {shelf.shelfDisplayName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">
          {book.title ? book.title : "Unknown Title"}
        </div>
        <div className="book-authors">
          {book.authors ? book.authors.join(", ") : "Unknown Author"}
        </div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    shelf: PropTypes.string,
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
  }).isRequired,
  onMoveBook: PropTypes.func.isRequired,
};

export default Book;
