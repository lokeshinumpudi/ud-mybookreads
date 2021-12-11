import React from "react";
import Book from "./book";
import { SHELF_CATEGORY } from "../enums";
const BookShelf = (props) => {
  const { data, category, changeShelf } = props;
  const currentShelfBooks = data.filter((eachBook) => {
    return eachBook.shelf === category;
  });

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title text-2xl m-10 text-green-600 underline decoration-wavy">
        {SHELF_CATEGORY[category]}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {currentShelfBooks.map((eachBook) => {
            return (
              <Book
                key={eachBook.id}
                data={eachBook}
                changeShelf={changeShelf}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
