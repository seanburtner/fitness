import { Component, OnInit } from '@angular/core';
import { exampleRoutines } from '../example-routines';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  routines = exampleRoutines;
  constructor() { }

  ngOnInit(): void {
  }

}
