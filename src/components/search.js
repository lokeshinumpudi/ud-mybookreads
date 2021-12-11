import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./loader";
import Book from "./book";
import { search, update } from "../BooksAPI";
import { updateSearchWithShelfStatus } from "../helpers";

const SearchBooks = (props) => {
  const [loader, setLoader] = useState(false);
  const [booksData, setBooksData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const setSeachText = async (e) => {
    let query = e.target.value;
    if (query.length >= 1) {
      getSearchResults(query);
    } else {
      setBooksData([]);
    }
  };

  const getSearchResults = async (searchText) => {
    setLoader(true);
    const results = await search(searchText);

    if (results && !results.error) {
      setSearchTerm(searchText);
      const resultsWithStatus = await updateSearchWithShelfStatus(results);
      setBooksData(resultsWithStatus);
    } else {
      setBooksData([]);
    }
    setLoader(false);
  };
  const changeShelf = async (book, shelf) => {
    await update(book, shelf);
    getSearchResults(searchTerm);
  };

  return (
    <div>
      {loader && <Loader />}
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              onChange={setSeachText}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {!loader &&
              booksData &&
              booksData.map((eachBook) => {
                return (
                  <Book
                    key={eachBook.id}
                    data={eachBook}
                    changeShelf={changeShelf}
                  />
                );
              })}

            {!loader && booksData.length === 0 && (
              <div className="text-4xl m-10 text-pink-500 text-center underline decoration-wavy">
                Search To See Results
              </div>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SearchBooks;
