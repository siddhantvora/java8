import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { TaskService } from "src/app/view/task/task.service";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() cancelAdd:EventEmitter<any>=new EventEmitter()
  newTask:any={};
  backlogs:any=[];
  @Output() taskAdded:EventEmitter<any>=new EventEmitter()
  @Input() projectId:any;
  requirement:any=[];
  constructor(private taskService:TaskService) { }

  ngOnInit() { 
    this.getBacklogs(); 
  }
  getBacklogs(){
    this.taskService.getBacklogs(this.projectId).subscribe((data:any)=>{
      this.backlogs=data;
    },(err:any)=>{
      console.log("error is :"+ err);
    })
  }
  cancel(){
    this.newTask={}
    this.cancelAdd.emit()
  }
  addTask(){
    console.log(this.newTask)
     this.taskService.createTask(this.newTask).subscribe((data:any)=>{
      console.log("data is :"+data);
      this.newTask={};
      this.taskAdded.emit()

    },(err:any)=>{
      console.log("error is :"+ JSON.stringify(err));
    })
  }
}
