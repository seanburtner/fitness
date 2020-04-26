// Sean Burtner
import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { stringify } from 'querystring';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // get data from form
  @ViewChild('email') email: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('emailError') emailError: ElementRef;
  @ViewChild('emailLengthError') emailLengthError: ElementRef;
  @ViewChild('passwordError') passwordError: ElementRef;
  @ViewChild('registerError') registerError: ElementRef;
  @ViewChild('registerSuccess') registerSuccess: ElementRef;
  @ViewChild('registerButton') registerButton: ElementRef;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check to see if the user is logged in. If so, redirect to routines.
    if (window.sessionStorage.getItem('loggedIn') == 'true') {
      this.router.navigate(['/routines']);
    }
  }

  // function to validate login form data
  registerUser(form: any) {
    // Get email and password from form
    let email = form.email;
    let password = form.password;

    // If empty email and password, instruct user to fill in empty fields
    if(email=="" && password==""){
      this.emailError.nativeElement.style.display = "block";
      this.passwordError.nativeElement.style.display = "block";
      this.registerError.nativeElement.style.display = "none";
      this.emailLengthError.nativeElement.style.display = "none";
    }
    // If empty email, instruct user to fill in empty email field
    else if(email=="" && password!=""){
      this.emailError.nativeElement.style.display = "block";
      this.passwordError.nativeElement.style.display = "none";
      this.registerError.nativeElement.style.display = "none";
      this.emailLengthError.nativeElement.style.display = "none";
    }
    // If empty password, instruct user to fill in empty password field
    else if(email!="" && password==""){
      this.emailError.nativeElement.style.display = "none";
      this.passwordError.nativeElement.style.display = "block";
      this.registerError.nativeElement.style.display = "none";
      this.emailLengthError.nativeElement.style.display = "none";
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
        this.emailError.nativeElement.style.display = "block";
        this.passwordError.nativeElement.style.display = "none";
        this.registerError.nativeElement.style.display = "none";
        this.emailLengthError.nativeElement.style.display = "none";
      }
      // SUCCESS: if email is valid, and password field is filled out, send request to backend for verification
      else{
        // Send GET request to backend for verification
        this.http.get('http://localhost/fitnessphp/register.php?' + 'email=' + email + '&password=' + password).subscribe( (data) => {
          // Check to see if the response was success or error
          console.log('Response ', data);

          // If Success, send back to login page
          if (data['content'] == 'Success') {
            this.registerSuccess.nativeElement.style.display = "block";
            this.registerError.nativeElement.style.display = "none";
            this.emailError.nativeElement.style.display = "none";
            this.emailLengthError.nativeElement.style.display = "none";
            this.passwordError.nativeElement.style.display = "none";
            this.registerButton.nativeElement.disabled = "true";
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 5000);
          } 
          // If Too long error, display error message, clear fields, and keep on register page.
          else if (data['content'] == 'Too long') {
            this.emailLengthError.nativeElement.style.display = "block";
            this.registerError.nativeElement.style.display = "none";
            this.emailError.nativeElement.style.display = "none";
            this.passwordError.nativeElement.style.display = "none";  
            this.email.nativeElement.value = "";
            this.password.nativeElement.value = "";
            this.email.nativeElement.focus();
          }
          // If Already exists error, display error message, clear fields, and keep on register page.
          else if (data['content'] == 'Already exists') {
            this.registerError.nativeElement.style.display = "block";
            this.registerSuccess.nativeElement.style.display = "none";
            this.emailError.nativeElement.style.display = "none";
            this.emailLengthError.nativeElement.style.display = "none";
            this.passwordError.nativeElement.style.display = "none";  

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

  } // End of registerUser function

}
