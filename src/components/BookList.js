
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookCard = (props) => (
  <div class="card-container">
  <img
            src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
            alt="Books"
            height="200"
          />
    <div  class="desc">
      <h2>{props.book.bookTitle}</h2>
      <h3>{props.book.bookAuthor}</h3>
      <p>{props.book.description}</p>
    </div>
    
    <button className="delete-btn" onClick={() => props.deleteBook(props.book._id)}>X</button>
  </div>
);


export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('https://finalexamtazbackend.onrender.com/api/v1/book') 
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log('Error from BookList', err);
      });
  }, []);

  const deleteBook = (id) => {
    axios
      .delete(`https://finalexamtazbackend.onrender.com/api/v1/book/delete/${id}`)
      .then((response) => {
        console.log(response.data);
      });

    setBooks(books.filter((el) => el._id !== id));
  };

  const bookList =
    books.length === 0 ? (
      <p>There are no book records!</p>
    ) : (
      <div className="list">
        {books.map((book) => (
              <BookCard 
              book={book} 
              key={book._id} 
              deleteBook={deleteBook} />
        ))}
      </div>
    );

  return (
    <>
    <head>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="../styles.css" />
  
  </head>
  <div class="BookList">
      <div class="col-md-12">
        <br />
        <h2 class="display-4 text-center">Books List</h2>
      

          <div className="col-md-12">
            <br />
    
          </div>

          <div class="col-md-11">
        
            <Link
              to="/create-book"
              className="btn btn-info float-right"
            >
              + Add New Book
            </Link>
            <br />
            <br />
            <hr />
        </div>
        </div>

        <div className="list">{bookList}</div>
      
    </div>
    </>
  );
}
