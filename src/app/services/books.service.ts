import { Injectable, OnInit } from '@angular/core';

import  firebase from 'firebase';
import { Subject } from 'rxjs';
import { BOOK } from '../models/Book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
	books: BOOK[] = [];
	booksSubject = new Subject<BOOK[]>();
	
  constructor() { }
  emitBooks(){
	  this.booksSubject.next(this.books)
  }
  saveBooks(){
	  firebase.database().ref('/books').set(this.books);
  }
  getBooks(){
	  firebase.database().ref('/books')
	  .on('value',(data)=> {
				this.books = data.val() ? data.val() : [];
				this.emitBooks(); 
	  })
  }
  getSingleBook(id:number){
	  return new Promise<BOOK>(
		  (resolve, reject)=>{
			  firebase.database().ref('/books/' +id).once('value').then(
				  (data)=>{
					  resolve(data.val());
				  },
				  (error)=>{
					  reject(error);
				  })
		  }
	  )

  }
  createNewBook(NewBook: BOOK){
	  this.books.push(NewBook);
	  this.saveBooks();
	  this.emitBooks();
  }
  remoteBook(book:BOOK){
	  if(book.photo){
		  const storageRef = firebase.storage().refFromURL(book.photo);
		  storageRef.delete().then(
			  ()=>{
				  console.log("Photo supprimé !")
			  }
		  ).catch(
			  (error)=>{
				  console.log("Fichier non trouvé :"+error);
			  }
		  )

	  }
	  const BookIndexToRemove = this.books.findIndex(
		  (BookEl) => {
			  if(BookEl=== book){
				  return true;
			  }else{
				  return false;
			  }
		  }
	  );
	  this.books.splice(BookIndexToRemove, 1);
	  this.saveBooks();
	  this.emitBooks();
  }
  uploadFile(file:File){
	  return new Promise<string>(
		  (resolve, reject)=>{
			  const almostUniqueFileName = Date.now().toString();
			  const upload = firebase.storage().ref()
			  .child('images/'+almostUniqueFileName+file.name)
			  .put(file);
			  upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
				() => {
					console.log('Chargement....');
				},
				(error) => {
					console.log('Erreur de chargement : ' +error);
					reject();
				},
				() => {
					resolve(upload.snapshot.ref.getDownloadURL());
				}
			);
		  }
	  );
  }
}
