import { Component, OnInit } from '@angular/core';
import { LoginService } from "src/app/my-login/login.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isRegistered = false;
  isUniqName: boolean = false;
  newUser: FormGroup;
  constructor(private loginService: LoginService, private router: Router) { }
  uniqName(loginName) {


    if (loginName) {
      this.loginService.getFlagForUniqueName(loginName).subscribe(data => {

        console.log("uniq :"+data)

        this.isUniqName = data

      }, (err:any) => {
        this.loginService.msg=err.error
      })
    }

  }
  ngOnInit() {
    this.newUser = new FormGroup({
      userId: new FormControl("", [Validators.required]),
      userName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required,Validators.pattern("^[0-9]{10}")]),
      loginName: new FormControl("", [Validators.required, Validators.minLength(6)]),
      password: new FormControl("", [Validators.required]),
      role: new FormControl( 'user' , [Validators.required]),
      status: new FormControl("", [Validators.required])
    })
  }

  f() {
    return this.newUser.controls;
  }
  registerUser() {
    if (!this.newUser.valid ) {
      this.isRegistered = true
      return;
    }
    if (!this.isUniqName) {
      this.isRegistered = true
      return;
    }

    this.loginService.register(this.newUser.value).subscribe((data: any) => {
      console.log(data)
      if (data) {
        //this.location.back();
        this.router.navigate(['view'])

      }
    }, (err:any) => {
        console.log("error is"+err.error)
        this.loginService.msg=err.error
      }
    )

  }
  cancel() {
    this.newUser = new FormGroup({
      userId: new FormControl("", [Validators.required]),
      userName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      loginName: new FormControl("", [Validators.required]),
      unique: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      role: new FormControl( 'user' , [Validators.required]),
      status: new FormControl("", [Validators.required])
    })
    this.router.navigate(['login']);

  }

}
