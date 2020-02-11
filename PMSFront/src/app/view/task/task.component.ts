import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from "src/app/view/task/task.service";
import { ITask } from "src/app/view/task/itask";
import { UserService } from "src/app/view/user/user.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  role: boolean = false;
  tasks: ITask[] = [];
  taskId: any = {};
  users:any=[]
  @Input() projectId: any;
  updateTask: any = {};
  viewTask:any={};
  isTaskCreate: boolean = false
  isTaskAssign: boolean = false
  constructor(private taskService: TaskService,private userService:UserService) { }

  ngOnInit() {
    if (sessionStorage.getItem('role') == 'admin') {
      this.role = true;
      this.getUsers();
    }
    this.getTasks()
     
  }
  getUsers(){
    this.userService.getUsers().subscribe(data=>{
      console.log(data)
      this.users=data
    },
    err=>{
      console.log("error :" +err)
    })
  }
  getTasks() {
    this.isTaskCreate = false
    this.isTaskAssign = false
    this.updateTask = {};
    this.taskId = {};
    if (this.projectId) {
      this.taskService.getTasks(this.projectId).subscribe(data => {
        this.tasks = data;
        if (sessionStorage.getItem('role') != 'admin') {
          this.tasks = this.tasks.filter(
            (x) => {
            return x.userId == sessionStorage.getItem('userId');
          })
        }

      }, (err: any) => {
        console.log("error is: " + err)
      })
    }
  }
  showViewTask(task){
    this.viewTask = task;
  }
  showAddTask() {
    this.isTaskCreate = true
  }
  showAssignTask() {
    this.isTaskAssign = true
  }
  showUpdateTask(task) {
    this.updateTask = task;
    this.taskId = task.taskId;
  }
  cancelAddTask() {
    this.isTaskCreate = false
  }
  cancelAssignTask() {
    this.isTaskAssign = false
  }
  cancelUpdateTask() {
    this.getTasks()
  }
  cancelViewTask(){
    this.viewTask={};
  }
  deleteTask(task) {
    this.taskService.deleteTask(task).subscribe(data => {
      this.getTasks();
    }, (err: any) => {
      console.log("error is: " + err)
    })
  }
}
