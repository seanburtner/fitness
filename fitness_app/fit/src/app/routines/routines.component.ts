import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { RoutinesService } from './routines.service';
// Import example list of routines:
import { exampleRoutines } from '../example-routines';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { stringify } from 'querystring';
import { Router } from '@angular/router';

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
  
  constructor( 
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    // Retrieve user's list of routines from the server.
    
    // TODO: Figure out how to get the current username/id. For now just setting it to user1.
    // We probably don't want to pass the user through the URL (naive implementation); probably
    // should set the $_SESSION object or COOKIE to the current user when they login, then in the get-routines 
    // php file retrieve the user there. I guess we won't even need any parameters once we do this.
    let user = 'user1';
    
    // Construct and send the get request.
    this.http.get('http://localhost/fitnessphp/get-routines.php?user=' + user).subscribe( (data) => {
        // Display response in console, and update the routines array.
        console.log('Response ', data);

        // Process data and update this.routines. Start by getting the array of routines from the data stream:
        let retrievedRoutines = data['content'];
        console.log('Current user!', data['currentUser']); // this was for testing to try to see current user via SESSION

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
    
    // Construct and send the get request.
    this.http.get('http://localhost/fitnessphp/get-shared-routines.php?user=' + user).subscribe( (data2) => {
        // Display response in console, and update the routines array.
        console.log('Response ', data2);

        // Process data and update this.routines. Start by getting the array of routines from the data stream:
        let retrievedRoutines2 = data2['content'];
        console.log('Current user!', data2['currentUser']); // this was for testing to try to see current user via SESSION
        // Iterate through routines to isolate the title and list of exercises from each.
        let title2, exerciseList2, routine2;
        for (let i = 0; i < retrievedRoutines2.length; i++) {
          // Get title
          title2 = retrievedRoutines2[i][0];

          // Get exercises and deal with formatting issues (it's a string, not an array, which is annoying)
          exerciseList2 = retrievedRoutines2[i][1] 
          exerciseList2 = exerciseList2.slice(1, exerciseList2.length - 1); 
          exerciseList2 = exerciseList2.split(','); 
          for (let j = 0; j < exerciseList2.length; j++) {
            let exercise2 = exerciseList2[j]
            exerciseList2[j] = exercise2.slice(1, exercise2.length-1);
          } // now it's an array of strings! yay
          
          // Create a little routine object and append it to the array of routines
          routine2 = {
            title: title2,
            exercises: exerciseList2
          }
          this.shared_routines.push(routine2);
        }
        
      }, (error) => {
        // If error
        window.alert("An error occurred while loading your routines.");
        console.log('Error', error);
  })
}

  // Show the shared routines section when link is clicked
  showSharedRoutines() {
    this.shared.nativeElement.style.display = "block";
    this.link.nativeElement.style.display = "none";
  }

  shareRoutine(sharedroutine:String, form:any){
    let to_share;
    console.log(this.routines[1].title)
    for(let i=0;i<this.routines.length;i++){
      if(sharedroutine == this.routines[i].title){
        to_share = this.routines[i];
      }
    }
    console.log(to_share)
    form.title = sharedroutine
    form.exercise = JSON.stringify(to_share['exercises'])
    form.user = "user1"
    console.log(form)
    let parameters = new FormData();
    parameters.append("title", form.title);
    parameters.append("exercise", form.exercise);
    parameters.append("user", form.user);
    console.log(parameters)

    this.http.post('http://localhost/fitnessphp/share-routine.php', parameters).subscribe( (data) => {
      // If successful
      console.log('Response ', data);
      window.alert("Routine shared!");
    }, (error) => {
      // If error
      console.log('Error', error);
      window.alert('An error occurred sharing your routine. Please try again.')
      location.reload();
    }
    )
  }
  }

