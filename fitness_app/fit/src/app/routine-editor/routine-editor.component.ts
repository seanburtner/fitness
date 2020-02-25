import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-routine-editor',
  templateUrl: './routine-editor.component.html',
  styleUrls: ['./routine-editor.component.css']
})
export class RoutineEditorComponent implements OnInit {
  @ViewChild('pp') pp: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  hide() {
    this.pp.nativeElement.innerHTML='AAAAAAAAAAAAAAAAAA';
  }
}
