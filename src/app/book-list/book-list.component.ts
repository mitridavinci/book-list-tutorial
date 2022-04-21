import { BooksService } from './../services/books.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BOOK } from '../models/Book.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {
	books: BOOK[] = [];
	bookSubscription !: Subscription;

  constructor(private bookService: BooksService, private router: Router) { }

  ngOnInit(): void {
	  this.bookSubscription = this.bookService.booksSubject.subscribe(
		  (books:BOOK[])=>{
			  this.books = books;
		  }
	  );
	  this.bookService.emitBooks();
  }
  onNewBook(){
	  this.router.navigate(['/books','new']);
  }
  onDeleteBook(book:BOOK){
	  this.bookService.remoteBook(book);
  }
  onViewBook(id:number){
	  this.router.navigate(['/books', 'view', id]);
  }
 
  ngOnDestroy() {
	  this.bookSubscription.unsubscribe();
  }

}
