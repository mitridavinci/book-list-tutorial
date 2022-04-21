import { BOOK } from './../../models/Book.model';
import { BooksService } from './../../services/books.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {
	book!: BOOK;

  constructor(private route: ActivatedRoute,
			  private booksService:BooksService,
			  private router: Router) { }

  ngOnInit(){
	  this.book = new BOOK('','');
	  const id = this.route.snapshot.params['id'];
	  this.booksService.getSingleBook(+id).then(
		  (book: BOOK) => {
			  this.book = book;
		  }
	  )
  }
  onBack(){
	 this.router.navigate(['/books'])
  }

}
