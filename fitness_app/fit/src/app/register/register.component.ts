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

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  // function to validate login form data
  registerUser(form: any) {
    // Get email and password from form
    let email = form.email;
    let password = form.password;

    // If empty email and password, instruct user to fill in empty fields
    if(email=="" && password==""){
      window.alert("Please fill in an email and password.");
    }
    // If empty email, instruct user to fill in empty email field
    else if(email=="" && password!=""){
      window.alert("Please enter an email.");
    }
    // If empty password, instruct user to fill in empty password field
    else if(email!="" && password==""){
      window.alert("Please enter a password.");
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
        window.alert("Please enter a valid email address.");
      }
      // SUCCESS: if email is valid, and password field is filled out, send request to backend for verification
      else{
        // Set up the form parameters
        let parameters = new FormData();
        parameters.append("email", email);
        parameters.append("password", password);

        // Send POST request to backend for verification
        this.http.post('http://localhost/fitnessphp/register.php', parameters).subscribe( (data) => {
          // Check to see if the response was success or error
          console.log('Response ', data);

          // If Success, send back to login page
          if (data['content'] == 'Success') {
            window.alert('User successfully created. Please login with your new credentials.')
            this.router.navigate(['/']);
          } 
          // If Error, display error message, clear fields, and keep on register page.
          else if (data['content'] == 'Error') {
            window.alert('A user with that email already exists. Please try a different email.');
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
