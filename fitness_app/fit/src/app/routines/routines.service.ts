import { Injectable } from '@angular/core';

@Injectable({ // registers the service as a dependency (dependency injection)
  providedIn: 'root'
})
export class RoutinesService {
  getRoutines() { // would include logic to access the server to get the routines (http endpoint)
    return ["routine1", "routine2", "routine3"];
  }
  constructor() { }
}
