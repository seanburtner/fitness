import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutineEditorService {
  exercises = [];

  addToRoutine(exercise) {
    this.exercises.push(exercise);
  }

  getExercises() {
    return this.exercises;
  }

  constructor() { }
}
