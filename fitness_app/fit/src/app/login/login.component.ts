import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('login') login : ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  gitFit() {
    this.login.nativeElement.innerHTML = "Let's GIT FIT!"
  }

  restore() {
    this.login.nativeElement.innerHTML = "Login"
  }
}
