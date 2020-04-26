// Sean Burtner
import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { RoutinesService } from './routines.service';
// Import example list of routines:
import { exampleRoutines } from '../example-routines';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { stringify } from 'querystring';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css']
})
export class RoutinesComponent implements OnInit {
  @ViewChild('shared') shared: ElementRef;
  @ViewChild('link') link: ElementRef;
  routines = [];
  shared_routines = [];
  current_user = '';
  
  constructor( 
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check to see if the user is logged in. If not, redirect to login.
    if (window.sessionStorage.getItem('loggedIn') != 'true') {
      this.router.navigate(['/']);
    }

    // Set current user
    this.current_user = window.sessionStorage.getItem('user');

    // Retrieve user's list of routines from the server.
    
    // Get the current user from session storage
    let parameters = new FormData();
    parameters.append('user', window.sessionStorage.getItem('user'));

    // Construct and send the post request.
    this.http.post('http://localhost/fitnessphp/get-routines.php', parameters).subscribe( (data) => {
        // Display response in console, and update the routines array.
        console.log('Response ', data);

        // Process data and update this.routines. Start by getting the array of routines from the data stream:
        let retrievedRoutines = data['content'];

        // Iterate through routines to isolate the title and list of exercises from each.
        var i;
        let title, exerciseList, routine;
        for (i = 0; i < retrievedRoutines.length; i++) {
          // Get title
          title = retrievedRoutines[i][0];

          // Get exercises and deal with formatting issues (it's a string, not an array, which is annoying)
          exerciseList = retrievedRoutines[i][1] // this looks like: '["push-up", "squat"]'
          exerciseList = exerciseList.slice(1, exerciseList.length - 1); // now looks like: "push-up", "squat"
          exerciseList = exerciseList.split(','); // haha now looks like: [""push-ups"", ""squat""]
          var j;
          for (j = 0; j < exerciseList.length; j++) {
            let exercise = exerciseList[j]
            exerciseList[j] = exercise.slice(1, exercise.length-1);
          } // now it's an array of strings! yay
          
          // Create a little routine object and append it to the array of routines
          routine = {
            title: title,
            exercises: exerciseList
          }
          this.routines.push(routine);
        }
        
      }, (error) => {
        // If error
        window.alert("An error occurred while loading your routines.");
        console.log('Error', error);
      }
      )
    
    // --------  Retrieve the list of user's shared routines.  -----------

    // Construct and send the get request.
    this.http.post('http://localhost/fitnessphp/get-shared-routines.php', parameters).subscribe( (data2) => {
        // Display response in console, and update the routines array.
        console.log('Response ', data2);

        // Process data and update this.routines. Start by getting the array of routines from the data stream:
        let retrievedRoutines2 = data2['content'];

        // Iterate through routines to isolate the title and list of exercises from each, and append to array.
        let title2, exerciseList2, routine2, sender;
        for (let i = 0; i < retrievedRoutines2.length; i++) {
          // Get title
          title2 = retrievedRoutines2[i][0];

          // Get exercises and deal with formatting issues
          exerciseList2 = retrievedRoutines2[i][1] 
          exerciseList2 = exerciseList2.slice(1, exerciseList2.length - 1); 
          exerciseList2 = exerciseList2.split(','); 
          for (let j = 0; j < exerciseList2.length; j++) {
            let exercise2 = exerciseList2[j]
            exerciseList2[j] = exercise2.slice(1, exercise2.length-1);
          } // now it's an array of strings!

          // Get sender
          sender = retrievedRoutines2[i][3];
          
          // Create a routine object and append it to the array of routines
          routine2 = {
            title: title2,
            exercises: exerciseList2,
            sender: sender
          }
          this.shared_routines.push(routine2);
        }
        
      }, (error) => {
        // If error
        window.alert("An error occurred while loading your shared routines.");
        console.log('Error', error);
  })
}

  // Sign out method
  signOut() {
  // Clear session storage
  window.sessionStorage.clear();
  }

  // Show the shared routines section when link is clicked
  showSharedRoutines() {
    this.shared.nativeElement.style.display = "block";
    this.link.nativeElement.style.display = "none";
  }

  shareRoutine(form:any){
    // If trying to share with themselves, display alert. If parameters unfilled, show alert.
    if (form.recipient == window.sessionStorage.getItem('user')) {
      window.alert("You cannot share a routine with yourself.");
      return;
    } else if (form.recipient == "" || form.routineToShare == "") {
      window.alert("Please select a routine and enter a username.");
      return;
    }
    // Set the parameters to send to share-routine.php
    let parameters = new FormData();
    parameters.append("routineToShare", form.routineToShare);
    parameters.append("recipient", form.recipient);
    parameters.append("user", window.sessionStorage.getItem('user'));

    // Construct and send the POST request
    this.http.post('http://localhost/fitnessphp/share-routine.php', parameters).subscribe( (data) => {
      console.log('Response ', data);
      
      // If successful
      if (data['content'] == 'Success') {
        window.alert("Routine shared!");
        location.reload();
      } 

      // If recipient not found
      else if (data['content'] == 'User not found') {
        window.alert("User not found. Please try again.");
      }

      // If this routine has already been shared
      else if (data['content'] == 'Duplicate') {
        window.alert("You have already shared this routine with this user.");
      }

      // Unknown error
      else if (data['content'] == 'Error') {
        window.alert("Unknown error occured. Please try again.");
        location.reload();
      }
    }, (error) => {
      // If error
      console.log('Error', error);
      window.alert('An error occurred sharing your routine. Please try again.')
      location.reload();
    }
    )
  }

  deleteRoutine(form:any) {
    console.log(form.routineToDelete);
    if (form.routineToDelete == "Select Routine") {
      window.alert("Please select a routine to delete.");
      return;
    }
    // Set the parameters to send to share-routine.php
    let parameters = new FormData();
    parameters.append("routineToDelete", form.routineToDelete);
    parameters.append("user", window.sessionStorage.getItem('user'));

    // Construct and send the POST request
    this.http.post('http://localhost/fitnessphp/delete-routine.php', parameters).subscribe( (data) => {
      console.log('Response ', data);
      
      // If successful
      if (data['content'] == 'Success') {
        console.log("Routine deleted!");
        location.reload();
      }

      // Unknown error
      else if (data['content'] == 'Error') {
        window.alert("Unknown error occured. Please try again.");
        location.reload();
      }
    }, (error) => {
      // If error
      console.log('Error', error);
      window.alert('An error occurred deleting your routine. Please try again.')
      location.reload();
    }
    )
  }
  }

