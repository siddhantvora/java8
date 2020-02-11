import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {
  role = false;
msg:string;
  ngOnInit() {


  }
  getRole() {
    if(sessionStorage.getItem('role')=='admin'){
      this.role=true;
    }
    return this.role;
  }
  constructor(private http: HttpClient, private router: Router) { }
  register(user: any) {
    return this.http.post("http://localhost:3000/pms/users/register", user, { headers: this.getHeaders() })
  }
  authenticate(user: any) {



   return this.http.post("http://localhost:3000/pms/users/login", user, { headers: this.getHeaders() })
  }

  getFlagForUniqueName(name: any): Observable<boolean> {
    return this.http.post<boolean>("http://localhost:3000/pms/users/checkLoginName", { "loginName": name })
  }
  getHeaders() {

    const headers = new HttpHeaders(sessionStorage.getItem('token') ? {
      authorization: sessionStorage.getItem('token'),
      //  "Access-Control-Allow-Origin":"http://localhost:4200/",
      'Content-Type': 'application/json'
    } : {});
    console.log(headers)
    //localStorage.setItem('token', headers.get('authorization'));
    return headers;
  }
  isUserLoggedIn() {
    let token = sessionStorage.getItem('token')
    let role = sessionStorage.getItem('role')
    console.log(!((token === null) && (role === null)))
    return !(token === null)
  }

  logout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('role')
    this.role = false;
    this.router.navigate(['login']);
  }

}
