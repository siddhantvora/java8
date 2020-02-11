import { Component, OnInit } from '@angular/core';
import { BacklogService } from "src/app/view/backlog/backlog.service";
import { Router } from "@angular/router";
import { LoginService } from "src/app/my-login/login.service";
import { ProjectService } from "src/app/view/project/project.service";

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
  backlogs: any = [];
  projects:any=[]
  addflag: boolean = true;
  newBacklog:any={}
  role: boolean = false;
  constructor(private backlogService: BacklogService, private router: Router, private loginService: LoginService,private projectService:ProjectService) { }

  ngOnInit() {

    if (sessionStorage.getItem('role') != 'admin') {
      this.role = true
    }
    this.getBacklogs();
    
  }
  getBacklogs() {
    this.backlogService.getBacklogs().subscribe(data => {
      this.backlogs = data
    }, (err: any) => {
      if (err)
        this.loginService.msg = err.error

    })
  }
   getProjects() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data
    }, (err: any) => {
      if (err)
        this.loginService.msg = err.error

    })
  }
  addBacklog() {
    this.backlogService.addBacklog(this.newBacklog).subscribe(data => {
      console.log(data)
      this.toggle();
      this.newBacklog ={}
      this.getBacklogs();
    }, (err: any) => {
      console.log("error is" + JSON.stringify(err.error))
      this.loginService.msg = err.error
    })
  }
  toggle() {
    this.newBacklog = {};
    if(this.backlogs.length){
      this.getProjects();
    }else{
      this.backlogs=[]
    }
    this.addflag = !this.addflag
  }
  onDetail(backlogId: any) {
    this.router.navigate(['backlog', backlogId])
  }
}
