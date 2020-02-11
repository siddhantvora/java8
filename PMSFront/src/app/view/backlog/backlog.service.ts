import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginService } from "src/app/my-login/login.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BacklogService {
  baseUrl = "http://localhost:3000/pms/"

  constructor(private http: HttpClient, private loginService: LoginService) { }
  getBacklogs(): Observable<any> {
    return this.http.get(this.baseUrl + "backlogs");
  }
  getBacklogDetails(backlogId:number):Observable<any>{

    return this.http.get(this.baseUrl+"backlogs/"+backlogId);
   
  }
  updateBacklogDetails(backlog:any):Observable<any>{
   
    return this.http.put(this.baseUrl+"backlogs/"+backlog.backlogId,backlog);
  }
  deleteBacklogDetails(backlog:any):Observable<any>{

    return this.http.delete(this.baseUrl+"backlogs/"+backlog.backlogId);
  }
  addRequirement(backlogId:any, requirement:any){
    return this.http.put(this.baseUrl+"backlogs/"+backlogId+"/requirement",{"requirement":requirement});
  }
  addBacklog(newBacklog:any){
     return this.http.post(this.baseUrl+"backlogs/add",newBacklog);
  }
}
