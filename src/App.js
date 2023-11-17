import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookList.css';
import LoginPage from './LoginPage';

function BooksComponent() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false); 
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  // const [id, setId] = useState('');
  const [year, setYear] = useState('');
  const [formData, setFormData] = useState({
    // your form fields here
  });
  
  // function to call API to get all books in DB
  function displayAllBooks() {
  	axios.get('https://sunlit-apricot-404519.uc.r.appspot.com/findAllBooks')
      .then(response => {
        setBooks(response.data);  // Axios packs the response in a 'data' property
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  
  };

  // function to handle the user submit of a new book
  // async used so we can use the "await", which causes a block until post is done
  //   and makes for a little simpler code (no .then)
  async function handleSubmit(event) {
        event.preventDefault();
        
        const postData = {
            title,
            author,
            year: parseInt(year, 10) // Convert string to integer
        };

        try {
            const response = await axios.post('https://sunlit-apricot-404519.uc.r.appspot.com/saveBook', postData);
            console.log('Response:', response.data);
            displayAllBooks();
            // Clear the input fields after successful submission
            setTitle('');
            setAuthor('');
            setYear('');
        } catch (error) {
            console.error('Error posting data:', error);
        }
        
    };

  
  // useEffect makes it so list of books shown when this component mounts
  useEffect(() => {
    // Using Axios to fetch data
   
    displayAllBooks()
  }, []);

  useEffect(() => {
    // Change the document title after form submission
    document.title = 'BookList';
  }, [formData]); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

//add logged in feather.
  if (!loggedIn) {
    return <LoginPage setLoggedIn={setLoggedIn} />;
  }
  // this component displays a list of books and has a form for posting a new book
  return (
    <div className="book-list">
     
        {books.map(book => (
          <div className="book-item">
          <h3>{book.title}</h3> 
          <p>by {book.author}</p>
          </div>
        ))}
     
     <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </label>
                <br />
                <label>
                    Author:
                    <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
                </label>
                <br />
                
                <label>
                    Year:
                    <input type="number" value={year} onChange={e => setYear(e.target.value)} />
                </label>
                <br />
                <button type="submit">Submit</button>
        </form>
            
        
    </div>
  );
}

export default BooksComponent;