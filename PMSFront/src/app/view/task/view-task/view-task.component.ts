import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LoginService } from "src/app/my-login/login.service";

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
 @Input() task:any={};
  @Output() cancelView:EventEmitter<any>=new EventEmitter()
  @Input()users:any=[];
  constructor(private loginService:LoginService) { }
 cancel(){
    this.task={}
    this.cancelView.emit();
    this.users=[]
  }
  ngOnInit() {
  }

}
