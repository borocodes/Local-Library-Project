function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    //if the given book is not returned, add it to the accumulator
    if (book.borrows[0].returned === false) {
      acc++
    }
    return acc
  }, 0)
}

//HELPER FUNCTION FOR GETMOSTCOMMON GENRES --> STOLEN FROM PARKER WHO STOLE IT FROM TERRA
function _groupHelper(arr, key){
  return arr.reduce((acc, obj) => {
    let genre = obj[key];
       if(acc[genre]) {
       acc[genre].push(obj);
       } else {
       acc[genre] = [obj]
       }
   return acc;
  }, []);
};

//go over with mentor --> why is historical fiction not before thriller like it is in the example?
function getMostCommonGenres(books) {
  let booksByGenre = _groupHelper(books, `genre`)
  let genresCounted = []
  for (let genre in booksByGenre){
      let genreObj = {name : genre, count : booksByGenre[genre].length}
      genresCounted.push(genreObj)
  };
 return genresCounted.sort((genreA, genreB) => genreB.count > genreA.count ? 1 : -1).slice(0, 5)
}

console.log(getMostCommonGenres)

function getMostPopularBooks(books) {
  //use object.entries to create properties containing the [key, value] pairs from the books array
  return Object.entries(
    //accumulate the number of times checked out by adding the length of book.borrows to the accumulator
    books.reduce((acc, book) => {
      acc[book.title] = book.borrows.length
      return acc
    }, {})
  )
  //map a new object and push the results from the reduce method 
  .map(([name, count]) =>({
    name,
    count
  }))
  //sort from highest to lowest
  .sort((a, b) => b.count - a.count)
  //limit to 5 entries
  .slice(0, 5)
}

//helper function for getMostPopularAuthors
const _getBooksByAuthorIdHelper = (books, authorId) => {
  return books.filter((book) => book.authorId === authorId);
};

function getMostPopularAuthors(books, authors) {
  //create a result variable that maps out authors
  const result = authors.map((author) => {
    //create a fullName variable that will be used as a value for the name key
    const fullName = `${author.name.first} ${author.name.last}`;
    //call helper function and pass in books and the author id
    const booksByAuthor = _getBooksByAuthorIdHelper(books, author.id);
    //reduce to a single object 
    const totalBorrows = booksByAuthor.reduce((accum, book) => accum + book.borrows.length, 0);
    //assign reduced obj values to name and count keys
    const newAuthorInfo = {
      name: fullName,
      count: totalBorrows,
    };
      //return the new object 
    return newAuthorInfo;
  });

  // sort the new array by count: greatest to least
  result.sort((authorA, authorB) => authorB.count - authorA.count);

  // limit array to 5
  result.splice(5);

  return result;
}
console.log(getMostPopularAuthors)

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
