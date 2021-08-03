
function findAuthorById(authors, id) {
  //search through input authors array to check if the author.id is the same as the input id
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}


function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter((book) => !book.borrows[0].returned)
  const available = books.filter((book) => book.borrows[0].returned)
  return [borrowed, available]
}

      //HELPER FUNCTION FOR GETBORROWERS FOR BOOK
  function _findAccountById(accounts, id) {
    //search through accounts and match the input id to the id value
    return accounts.find((userId) => userId.id === id)
  }


  function getBorrowersForBook(book, accounts) {
    // create array of transactons from the given book
    const transactions = book.borrows;
  
    //map the transactions variable into a new object containing the account info and transaction id
    const result = transactions.map((transaction) => {
      //assign helper function and pass the results to the new object
      const accountInfo = _findAccountById(accounts, transaction.id);
      const newTransaction = {
        ...transaction,
        ...accountInfo,
      };

      //return the new object
      return newTransaction;
    });
  
    // limit the amount of transactions to 10
    result.splice(10);
  
    // return the updated transaciton array
    return result;
  }
module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
