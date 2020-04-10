import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RoutineEditorService } from '../routine-editor.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { stringify } from 'querystring';


@Component({
  selector: 'app-routine-editor',
  templateUrl: './routine-editor.component.html',
  styleUrls: ['./routine-editor.component.css']
})
export class RoutineEditorComponent implements OnInit {
  // @ViewChild('pp') pp: ElementRef;
  @ViewChild('theExercise') theExercise: ElementRef;
  @ViewChild('nameError') nameError: ElementRef;
  @ViewChild('routineName') routineName: ElementRef;

  constructor(
    private routineEditorService: RoutineEditorService,
    private router: Router,
    private http: HttpClient
  ) { }

  /* addToRoutine using the service
  addToRoutine(exercise) {
    this.routineEditorService.addToRoutine(exercise);
    window.alert('Exercise added!')
  } */

  exercises = [];

  // If the routine name is empty, display the error message. Otherwise, hide it. ARROW FUNCTION ERROR MESSAGES
  nameValidation = () => {
    var name = this.routineName.nativeElement.value;
    var errorMessage = this.nameError.nativeElement;

    if (name.length == 0) {
      errorMessage.style.display = "inline";
    }
    else {
      errorMessage.style.display = "none";
    }
  }

  // Add exercise to exercise list DOM MANIPULATION - CLEARING THE FORM
  addToRoutine(exercise) {
    exercise = exercise.trim();
    if (exercise.length != 0) {
      this.exercises.push(exercise);
      this.theExercise.nativeElement.value = "";
    }
  }

  // Save routine and redirect to routines page ANONYMOUS FUNCTION DOM MANIPULATION
  saveRoutine = function(form: any) {
    var name = this.routineName.nativeElement.value;
    if (name.length == 0) {
      window.alert("Please enter a routine name.");
    }
    else {
      // TODO: Save the routine to the backend, attach user information as well.
      //       May need to create a Routine class, to store a title, user, and 
      //       exercise list. Or just make a table of Routines, with columns of
      //       title, user, exercise list (as a string).

      // Set the form's exercise to be the exercises array
      form.exercise = JSON.stringify(this.exercises);

      // Set the form's user to the current user. TODO: FIGURE OUT HOW TO GET CURRENT USER
      form.user = "user1";

      console.log('You submitted: ', form);
      
      // Convert form into parameters
      let parameters = JSON.stringify(form);

      // Send POST request to backend to save the routine
      this.http.post('http://localhost/fitnessphp/save-routine.php', parameters).subscribe( (data) => {
        console.log('Response ', data);
      }, (error) => {
        console.log('Error you can do it!!! ', error);
      }
      )

      window.alert("Routine saved!");
      this.router.navigate(['/routines']);
    }
  }

  ngOnInit(): void {

  }
}
