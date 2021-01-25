import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class showdata extends Component {
        state = {
            books: [],
            getbook: {
                id: null,
                isbn: null,
                title: null,
                author: {
                    firstname: null,
                    lastname: null
                }
            },
            newbook : {
                id: null,
                isbn: null,
                title: null,
                author: {
                    firstname: null,
                    lastname: null
                }
            },
            id: 0
        }
        showbooks = (e) =>{
            console.log("inside show books")
            axios.get("http://localhost:8000/api/books").then(response => {
                this.setState({
                    books: response.data
                })
            })
        }
        handleChange = (e) => {
            this.setState({
                [e.target.id]: e.target.value
            })
        }
        isbnCreate = (e) => {
           this.state.newbook.isbn = e.target.value
        }
        titleCreate = (e) => {
            this.state.newbook.title = e.target.value
         }
         idCreate = (e) => {
            this.state.newbook.id = e.target.value
         }
        firstchange = (e) => {
           this.state.newbook.author.firstname = e.target.value
        }
        lastchange = (e) => {
            this.state.newbook.author.lastname = e.target.value
         }
        getBook = (e) => {
            e.preventDefault();
            axios.get(`api/books/${this.state.id}`).then(res => {
                console.log(res.data);
                this.setState({
                    getbook: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
        }
        createBook = (e) => {
            e.preventDefault();
            axios.post(`api/books`,{isbn : this.state.newbook.isbn, title: this.state.newbook.title, author: this.state.newbook.author}).then(res => {
               this.state.newbook = res.data
               console.log(res.data)
            })
        }
        deleteBook = (e) => {
            e.preventDefault();
            axios.delete(`api/books/${this.state.id}`).then(res => {
                console.log(res.data);
                this.state.books = res.data
            })
        }
        updateBook = (e) => {
            e.preventDefault();
            axios.put(`api/books/${this.state.id}`,{isbn : this.state.newbook.isbn, title: this.state.newbook.title, author: this.state.newbook.author}).then(res => {
               this.state.books = res.data
            })
        }
        render() {
        return(
           <div className="bookList">
               <button onClick={this.showbooks}>Show All Available Books</button>
               List of Books
               {this.state.books.map(book => {
                   return (
                       <div className="book" key = {book.id}>
                       <div>Title : {book.title}</div>
                       <div>ID : {book.id}</div>
                       <div>ISBN : {book.isbn}</div>
                       <div>Author Name : {book.author.firstname + " " + book.author.lastname}</div>
                       </div>
                   )
               })}
               <form onSubmit={this.getBook}>
                <br></br>
                <label htmlFor="name">ID </label>
                <input type = "text" id = "id" onChange={this.handleChange}/>
                <button>Get Book</button>
                {
                    <div className="singleBookData">
                        <div className='txt'>ID: {this.state.getbook.id}</div>
                        <div>Title: {this.state.getbook.title}</div>
                        <div>ISBN: {this.state.getbook.isbn}</div>
                        <div>Author Name: {this.state.getbook.author.firstname + " " + this.state.getbook.author.lastname}</div>
                    </div>
                }
                <br></br>
               </form>
               <form onSubmit={this.createBook}>
                <br></br>
                <label htmlFor="name">Title</label>
                <input type = "text" id = "tile" onChange={this.titleCreate}/>
                <label htmlFor="name">ISBN</label>
                <input type = "text" id = "isbn" onChange={this.isbnCreate}/>
                <label htmlFor="name">First Name</label>
                <input type = "text" id = "firstname" onChange={this.firstchange}/>
                <label htmlFor="name">Last Name</label>
                <input type = "text" id = "lastname" onChange={this.lastchange}/>
                <button>Create Book</button>
                {
                    <div className="createBookData">
                        <div>ID: {this.state.newbook.id}</div>
                        <div>Title: {this.state.newbook.title}</div>
                        <div>ISBN: {this.state.newbook.isbn}</div>
                        <div>Author Name: {this.state.newbook.author.firstname + " " + this.state.newbook.author.lastname}</div>
                    </div>
                }
                <br></br>
               </form>
               <form onSubmit={this.deleteBook}>
                <br></br>
                <label htmlFor="name">ID </label>
                <input type = "text" id = "id" onChange={this.handleChange}/>
                <button>Delete Book</button>
                <br></br>
                List of Books
               {this.state.books.map(book => {
                   return (
                       <div className="book" key = {book.id}>
                       <div>Title : {book.title}</div>
                       <div>ID : {book.id}</div>
                       <div>ISBN : {book.isbn}</div>
                       <div>Author Name : {book.author.firstname}</div>
                       </div>
                   )
               })}
               </form>
               <form onSubmit={this.updateBook}>
                <br></br>
                <label htmlFor="name">ID</label>
                <input type = "text" id = "id" onChange={this.handleChange}/>
                <label htmlFor="name">Title</label>
                <input type = "text" id = "tile" onChange={this.titleCreate}/>
                <label htmlFor="name">ISBN</label>
                <input type = "text" id = "isbn" onChange={this.isbnCreate}/>
                <label htmlFor="name">First Name</label>
                <input type = "text" id = "firstname" onChange={this.firstchange}/>
                <label htmlFor="name">Last Name</label>
                <input type = "text" id = "lastname" onChange={this.lastchange}/>
                <button>Update Book</button>
                List of Books
               {this.state.books.map(book => {
                   return (
                       <div className="book" key = {book.id}>
                       <div>Title : {book.title}</div>
                       <div>ID : {book.id}</div>
                       <div>ISBN : {book.isbn}</div>
                       <div>Author Name : {book.author.firstname}</div>
                       </div>
                   )
               })}
                <br></br>
               </form>
           </div>
        );
        }
}
export default showdata