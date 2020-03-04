import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { RoutinesService } from './routines.service';
//import example list of routines:
import { exampleRoutines } from '../example-routines';

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css']
})
export class RoutinesComponent implements OnInit {
  @ViewChild('shared') shared: ElementRef;
  routines = exampleRoutines;

  // Use the below when we eventually retrieve routines from the server
  /*constructor(service: RoutinesService) { // add the service as a dependency of the class to decouple it (won't break if RoutinesService changes)
    this.routines = service.getRoutines();
   }*/

  ngOnInit(): void {
  }

  // Show the shared routines section when link is clicked
  showSharedRoutines() {
    this.shared.nativeElement.style.display = "block";
  }

}
