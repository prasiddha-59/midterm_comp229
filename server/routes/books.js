/* book.js Nishan Gaudel 301211464 comp229-f2022-midterm-3012114648 */

// modules required for routing
const { response } = require('express');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  /* GET form page */
  res.render('books/details', { title: 'Add Boooks', books: {} })

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  //creates a new book with the data recieved in the body of the post req

  let newBook = book({
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  book.create(newBook, (err, Book) => {
    // checks for internal errors
    if (err) {
      res.status(500).end(err);
    } else {
      res.redirect('/books');
    }
  })

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;

  // search the book to edit with the id of the book and render the form page with the book details 
  book.findById(id, (err, book) => {
    if (!err) {
      res.render('books/details', { title: 'Edit', books: book });
    } else {
      res.end(err);
    }
  })
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  //updates the book with data recieved

  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;

  let updatedBook = book({
    "_id": id,
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  book.updateOne({ _id: id }, updatedBook, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/books');
    }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  // deletes the matching book  from the database

  /*****************
   * ADD CODE HERE *
   *****************/

  let id = req.params.id;

  book.remove({ _id: id }, (err) => {
    if (!err) {
      res.redirect('/books')
    } else {
      res.end(err);
    }
  })
});


module.exports = router;
