import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ITask } from "src/app/view/task/itask";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseURL="http://localhost:3000/pms/"
  constructor(private http:HttpClient) { }
  priorityEnum:any={"1":"high","2":"medium","3":"low"}
  getTasks(projectId:any):Observable<ITask[]>{
    console.log("project id selected :" +projectId)
    return this.http.get<ITask[]>(this.baseURL+`backlogs/${projectId}/tasks`)
    
  }
  getPriority(index:any){
    //console.log(this.priorityEnum[index])
    return this.priorityEnum[index]
  }
  getBacklogs(projectId:any){
    return this.http.get(this.baseURL+`projects/${projectId}/backlogs`);
  }
  createTask(task:any){
    return this.http.post(this.baseURL+`tasks/add`,task);
  }
  assignTask(task:any,user:any){
    return this.http.put(this.baseURL+`tasks/assign/${task}`,{"userId":user});
  }
  updateTask(task:any){
    return this.http.put(this.baseURL+`tasks/${task.taskId}`,task);
  }
  deleteTask(task:any){
    return this.http.delete(this.baseURL+`tasks/${task.taskId}`);
  }
}
