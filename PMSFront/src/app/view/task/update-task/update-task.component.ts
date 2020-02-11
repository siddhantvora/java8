import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TaskService } from "src/app/view/task/task.service";
import { LoginService } from "src/app/my-login/login.service";

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
 @Output() cancelUpdate:EventEmitter<any>=new EventEmitter()
 @Output() taskUpdated:EventEmitter<any>=new EventEmitter()
 @Input() task:any={};
 @Input()users:any=[];
  constructor(private taskService:TaskService,private loginService:LoginService) { }

  ngOnInit() {
  }
  cancel(){
    this.task={}
    this.cancelUpdate.emit();
    
  }
  updateTask(){
    this.taskService.updateTask(this.task).subscribe((data:any)=>{
      this.task={}
      this.taskUpdated.emit();
    },(err:any)=>{
      console.log("error is: "+JSON.stringify(err))
    })
  }
}
