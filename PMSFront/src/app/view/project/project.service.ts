import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginService } from "src/app/my-login/login.service";
import { Observable } from "rxjs";
import { IProject } from "src/app/view/project/iproject";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl="http://localhost:3000/pms/"

  constructor(private http:HttpClient,private loginService:LoginService) { }

  getProjects():Observable<IProject[]>{
    console.log(this.loginService.getHeaders())
    
    //return this.http.get(this.baseUrl+"projects",{headers:this.loginService.getHeaders()});
   return this.http.get<IProject[]>(this.baseUrl+"projects");
  } 
  getProjectDetails(projectId:number):Observable<IProject>{

    return this.http.get<IProject>(this.baseUrl+"projects/"+projectId);
    // return this.http.get(this.baseUrl+"projects/"+projectId,{headers:this.loginService.getHeaders()});
  }
  updateProjectDetails(project:any):Observable<any>{
    // return this.http.put(this.baseUrl+"projects/"+project.projectId,project,{headers:this.loginService.getHeaders()});
    return this.http.put(this.baseUrl+"projects/"+project.projectId,project);
  }
  deleteProjectDetails(project:any):Observable<any>{
    // return this.http.delete(this.baseUrl+"projects/"+project.projectId,{headers:this.loginService.getHeaders()});
    return this.http.delete(this.baseUrl+"projects/"+project.projectId);
  }
  addProject(project:any):Observable<any>{
    return this.http.post(this.baseUrl+"projects/add",project);
    // return this.http.post(this.baseUrl+"projects/add",project,{headers:this.loginService.getHeaders()});
  }
}
