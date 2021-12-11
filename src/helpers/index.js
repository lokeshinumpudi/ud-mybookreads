import { get } from "../BooksAPI";
//   For EachBook fetch it's shelf status now
export const updateSearchWithShelfStatus = async (searchData) => {
  const updatedSearchData = [];

  const dataPromise = new Promise((resolve, reject) => {
    searchData.forEach((eachBook) => {
      get(eachBook.id).then((result) => {
        updatedSearchData.push({
          ...eachBook,
          ...result,
        });

        if (searchData.length === updatedSearchData.length) {
          resolve(updatedSearchData);
        }
      });
    });
  });

  return dataPromise;
};
