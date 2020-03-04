import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // get data from form
  @ViewChild('email') email: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('login') login : ElementRef;
  constructor() { }

  // function to validate login form data
  validateForm(email:String, password:String) {
    // Instruct user to fill in empty fields
    if(email=="" && password==""){
      window.alert("Please fill in your email and password.");
    }
    // Instruct user to fill in empty email field
    else if(email=="" && password!=""){
      this.password.nativeElement.value = "";
      window.alert("Please enter your email.");
    }
    // Instruct user to fill in empty password field
    else if(email!="" && password==""){
      this.email.nativeElement.value = "";
      window.alert("Please enter your password.");
    }
    else{
      let at = false;
      // check if user entered a valid email address
      for(let i=0;i<email.length;i++){
        if(email.charAt(i)=='@'){
          at = true;
          break;
        }
      }
      // if email is not valid, show error
      if(at==false){
        window.alert("Please enter a valid email.");
        this.email.nativeElement.value = "";
        this.password.nativeElement.value = "";
      }
      // if email is valid, and password field is filled out, show that the user entered valid data into fields
      else{
        window.alert("Valid email and password!");
        this.email.nativeElement.value = "";
        this.password.nativeElement.value = "";
      }
    }
  }

  ngOnInit(): void {
  }
  // Interactive button hover
  gitFit() {
    this.login.nativeElement.innerHTML = "Let's GIT FIT!"
  }
 // If mouse leaves button, undo hover
  restore() {
    this.login.nativeElement.innerHTML = "Login"
  }
}
