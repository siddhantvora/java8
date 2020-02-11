import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/view/user/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = "http://localhost:3000/pms/"
  constructor(private http: HttpClient) { }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:3000/pms/" + "users");
  }
  getUserDetails(userId): Observable<User> {
    return this.http.get<User>("http://localhost:3000/pms/" + "users/" + userId);
  }
  updateUserDetails(user): Observable<any> {
    return this.http.put(this.baseUrl + "projects/" + user.userId, user);
  }
  
}
