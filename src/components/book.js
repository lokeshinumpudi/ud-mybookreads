import React from "react";
import { SHELF_CATEGORY } from "../enums";
const Book = (props) => {
  const { title, authors, shelf, imageLinks } = props.data || {};
  const shelfCategories = Object.keys(SHELF_CATEGORY);

  const changeShelf = (e) => {
    const newShelf = e.target.value;
    const currentBook = props.data;
    // update the book to the selected shelf id
    props.changeShelf(currentBook, newShelf);
  };
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${imageLinks?.smallThumbnail}")`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select value={shelf} onChange={changeShelf}>
            <option value="none" disabled>
              Move to...
            </option>

            {shelfCategories &&
              shelfCategories.map((currentShelf) => {
                return (
                  <option key={currentShelf} value={currentShelf}>
                    {SHELF_CATEGORY[currentShelf]}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
      <div className="book-title underline ">{title}</div>

      {authors &&
        authors.map((eachAuthor) => {
          return (
            <div key={eachAuthor} className="book-authors">
              {eachAuthor}
            </div>
          );
        })}
    </div>
  );
};

export default Book;
