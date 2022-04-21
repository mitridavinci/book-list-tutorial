import { Component } from '@angular/core';
import firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){
	var firebaseConfig = {
		apiKey: "AIzaSyAJZKoNzHKfBOb9_68ghSgeldvp7mvx0lE",
		authDomain: "bookshelves-1e8d8.firebaseapp.com",
		projectId: "bookshelves-1e8d8",
		storageBucket: "bookshelves-1e8d8.appspot.com",
		messagingSenderId: "594704559183",
		appId: "1:594704559183:web:6be5250f03b72b09d74e3a",
		measurementId: "G-PRZCLHCJ2K"
	  };
	  // Initialize Firebase
	  firebase.initializeApp(firebaseConfig);
	  firebase.analytics();
  }
}
