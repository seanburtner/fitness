import { Component, OnInit } from '@angular/core';
import { RoutinesService } from './routines.service';

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css']
})
export class RoutinesComponent implements OnInit {
  title = "List of routines";
  routines;

  getTitle() {
    return this.title;
  }

  constructor(service: RoutinesService) { // add the service as a dependency of the class to decouple it (won't break if RoutinesService changes)
    this.routines = service.getRoutines();
   }

  ngOnInit(): void {
  }

}
