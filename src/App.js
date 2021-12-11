import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookShelf from "./components/bookshelf";

import Loader from "./components/loader";
import { getAll, update } from "./BooksAPI";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [booksData, setBooksData] = useState([]);
  let [shelves, setShelves] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = async () => {
    const data = await getAll();
    let shelvesMap = new Map();
    data.map((eachBook) => {
      shelvesMap.set(eachBook.shelf);
    });
    shelves = Array.from(shelvesMap.keys());
    setShelves(shelves);
    setBooksData(data);
    // Stop the loader
    setLoader(false);
  };

  const changeShelf = async (book, shelf) => {
    setLoader(true);
    await update(book, shelf);
    getAllBooks();
  };

  return (
    <div className="app">
      {
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          {loader && <Loader />}

          {shelves.map((shelf) => {
            return (
              <div key={shelf} className="list-books-content">
                <div>
                  <BookShelf
                    category={shelf}
                    data={booksData}
                    changeShelf={changeShelf}
                  />
                </div>
              </div>
            );
          })}

          <div className="open-search">
            <Link to="search">Add abook</Link>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
