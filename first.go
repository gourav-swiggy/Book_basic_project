package main

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type Book struct {
	ID     string  `json:"id"`
	Isbn   string  `json:"isbn"`
	Title  string  `json:"title"`
	Author *Author `json:"author"`
}

type Author struct {
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
}

var books []Book

func getbooks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(books)
}

func getbook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r) // Get Params
	for _, item := range books {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&Book{})
}

func createbook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var book Book
	_ = json.NewDecoder(r.Body).Decode(&book)
	book.ID = strconv.Itoa(rand.Intn(100))
	books = append(books, book)
	json.NewEncoder(w).Encode(book)
}

func updatebook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for idx, item := range books {
		if item.ID == params["id"] {
			var book Book
			_ = json.NewDecoder(r.Body).Decode(&book)

			books[idx].Isbn = book.Isbn
			books[idx].Title = book.Title
			books[idx].Author = book.Author
			break
		}
	}
	json.NewEncoder(w).Encode(books)
}

func deletebook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for idx, item := range books {
		if item.ID == params["id"] {
			books = append(books[:idx], books[idx+1:]...)
			break
		}
	}
	json.NewEncoder(w).Encode(books)
}

func main() {
	router := mux.NewRouter()

	books = append(books, Book{ID: "1", Isbn: "124", Title: "Bookone", Author: &Author{Firstname: "Gourav", Lastname: "Sharma"}})
	books = append(books, Book{ID: "2", Isbn: "125", Title: "Booktwo", Author: &Author{Firstname: "ABC", Lastname: "DEF"}})
	books = append(books, Book{ID: "3", Isbn: "126", Title: "Bookthree", Author: &Author{Firstname: "XYZ", Lastname: "XYZ"}})

	router.HandleFunc("/api/books", getbooks).Methods("GET")
	router.HandleFunc("/api/books/{id}", getbook).Methods("GET")
	router.HandleFunc("/api/books", createbook).Methods("POST")
	router.HandleFunc("/api/books/{id}", updatebook).Methods("PUT")
	router.HandleFunc("/api/books/{id}", deletebook).Methods("DELETE")

	http.ListenAndServe(":3000", router)
}
