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

  addToRoutine(exercise) {
    this.exercises.push(exercise);
    this.theExercise.nativeElement.value = "";
  }

  saveRoutine() {
    window.alert("Routine saved!");
    this.router.navigate(['/routines']);
  }

  ngOnInit(): void {
    
  }



  /* hide() {
    this.pp.nativeElement.innerHTML='AAAAAAAAAAAAAAAAAA';
  } */
}
