import { Component, OnInit } from '@angular/core';
import { LoginService } from "src/app/my-login/login.service";
import { Location } from "@angular/common"
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: FormGroup;
  isLogged = false;
  //user:any={};
  constructor(private loginService: LoginService, private location: Location, private router: Router) { }

  ngOnInit() {
    this.user = new FormGroup({
      loginName: new FormControl("", [Validators.required, Validators.minLength(6)]),
      password: new FormControl("", [Validators.required])
    })
    if (this.loginService.isUserLoggedIn()) {
      this.loginService.logout()
    }
  }
  f() {
    return this.user.controls;
  }
  login() {
    console.log()
    //console.log(this.user.username+" "+this.user.password)
    if (!this.user.valid) {
      this.isLogged = true;
      return;
    }
    this.loginService.authenticate(this.user.value).subscribe((data: any) => {
      console.log(data)
      if (data) {
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('role', data.role)
        sessionStorage.setItem('userId', data.userId)
        if (sessionStorage.getItem('role') == 'admin') {
          this.loginService.role = true;
        }

        //this.location.back();
        this.router.navigate(['home'])

      }
    }, (err: any) => {
      console.log("error"+err.error)
      this.loginService.msg=err.error
     
      return;
    }
    )

  }
  cancle() {
    this.user = new FormGroup({
      loginName: new FormControl("", [Validators.required, Validators.minLength(6)]),
      password: new FormControl("", [Validators.required])
    });
  }
  regesterHere() {
    this.user = new FormGroup({
      loginName: new FormControl("", [Validators.required, Validators.minLength(6)]),
      password: new FormControl("", [Validators.required])
    });
    this.router.navigate(['register'])
  }
}
