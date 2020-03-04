import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('email') email: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('login') login : ElementRef;
  constructor() { }

  validateForm(email:String, password:String) {
    if(email=="" && password==""){
      window.alert("Please fill in your email and password");
    }
    else if(email=="" && password!=""){
      this.password.nativeElement.value = "";
      window.alert("Please enter your email.");
    }
    else if(email!="" && password==""){
      this.email.nativeElement.value = "";
      window.alert("Please enter your password.");
    }
    else{
      let at = false;
      for(let i=0;i<email.length;i++){
        if(email.charAt(i)=='@'){
          at = true;
          break;
        }
      }
      if(at==false){
        window.alert("Please enter a valid email.");
        this.email.nativeElement.value = "";
        this.password.nativeElement.value = "";
      }
      else{
        window.alert("Valid email and password ;)");
        this.email.nativeElement.value = "";
        this.password.nativeElement.value = "";
      }
    }
  }

  ngOnInit(): void {
  }

  gitFit() {
    this.login.nativeElement.innerHTML = "Let's GIT FIT!"
  }

  restore() {
    this.login.nativeElement.innerHTML = "Login"
  }
}
