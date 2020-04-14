import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

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
