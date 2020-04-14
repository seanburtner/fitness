import { Component, OnInit } from '@angular/core';
import { exampleRoutines } from '../example-routines';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  routines = exampleRoutines;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check to see if the user is logged in. If not, redirect to login.
    if (window.sessionStorage.getItem('loggedIn') != 'true') {
      this.router.navigate(['/']);
    }
  }

}
