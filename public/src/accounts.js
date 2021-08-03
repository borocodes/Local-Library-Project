function findAccountById(accounts, id) {
  //search through accounts and match the input id to the id value
  return accounts.find((userId) => userId.id === id)
}

function sortAccountsByLastName(accounts) {
  //sort last names in alphabetical order
  return accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1 : -1)
}


//answer from stackoverflow. review w/mentor to understand logic
function getTotalNumberOfBorrows(account, books) {
  //create a variable for account id
  const accId = account.id;
  //create total variable
  let total = 0;
  //for each book passed, check if the acctId is the same as the borrows.id and add to total
  books.forEach(book => book.borrows.forEach(borrow => accId === borrow.id && total++));
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  //this might have been easier with reduce but reduce is scary

  //create empty array
  let booksPossessed = [];
  //for each book passed, find the item id, check if it is the same id as the passed account id and if returned = false
  books.forEach(book => {
    if (book.borrows.find(item => item.id === account.id && !item.returned)) {
      //push results to the empty array
      booksPossessed.push(book);
    }
  })
  //within new array, check if the book passed has an author id that matches the book author id
  booksPossessed.forEach(book => {
    let writer = authors.find(auth => auth.id === book.authorId);
    book['author'] = writer;
  })
  return booksPossessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
