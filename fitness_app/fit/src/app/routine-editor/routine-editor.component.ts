import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RoutineEditorService } from '../routine-editor.service';
import { Router } from '@angular/router';

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
    private router: Router
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
  saveRoutine = function() {
    var name = this.routineName.nativeElement.value;
    if (name.length == 0) {
      window.alert("Please enter a routine name.");
    }
    else {
      window.alert("Routine saved!");
      this.router.navigate(['/routines']);
    }
  }

  ngOnInit(): void {

  }
}
