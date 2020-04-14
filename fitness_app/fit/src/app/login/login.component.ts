import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { stringify } from 'querystring';
import { Router } from '@angular/router';

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
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // function to validate login form data
  validateForm(email:String, password:String) {
    // If empty email and password, instruct user to fill in empty fields
    if(email=="" && password==""){
      window.alert("Please fill in your email and password.");
    }
    // If empty email, instruct user to fill in empty email field
    else if(email=="" && password!=""){
      this.password.nativeElement.value = "";
      window.alert("Please enter your email.");
    }
    // If empty password, instruct user to fill in empty password field
    else if(email!="" && password==""){
      window.alert("Please enter your password.");
    }
    // All fields filled in: check for valid email address
    else {
      let at = false;
      // check for @ symbol
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
      // SUCCESS: if email is valid, and password field is filled out, send request to backend for verification
      else{
        // window.alert("Valid email and password!");
        // this.email.nativeElement.value = "";
        // this.password.nativeElement.value = "";

        // Set up the form parameters
        let parameters = new FormData();
        parameters.append("email", this.email.nativeElement.value);
        parameters.append("password", this.password.nativeElement.value);

        // Send POST request to backend for verification
        this.http.post('http://localhost/fitnessphp/login.php', parameters).subscribe( (data) => {
          // Check to see if the response was success or error
          console.log('Response ', data);

          // If Success, send to the routines page
          if (data['content'] == 'Success') {
            window.sessionStorage.setItem("user", this.email.nativeElement.value);
            window.sessionStorage.setItem("loggedIn", 'true');
            this.router.navigate(['/routines']);
          } 
          // If Error, display error message, clear fields, and keep on login page.
          else if (data['content'] == 'Error') {
            window.alert('Incorrect email/password.');
            this.email.nativeElement.value = "";
            this.password.nativeElement.value = "";
            this.email.nativeElement.focus();
          }
          // If neither, display unknown error
          else {
            window.alert('Unknown error encountered. Please try again.');
            this.email.nativeElement.value = "";
            this.password.nativeElement.value = "";
          }
        }, (error) => {
          console.log('Error', error);
        }
        )

      }
    }

  } // End of validateForm function

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
