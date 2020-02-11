import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BacklogService } from "src/app/view/backlog/backlog.service";
import { LoginService } from "src/app/my-login/login.service";

@Component({
  selector: 'app-backlog-detail',
  templateUrl: './backlog-detail.component.html',
  styleUrls: ['./backlog-detail.component.css']
})
export class BacklogDetailComponent implements OnInit {
isAddRequirement:boolean=false
  role:boolean=false;
  backlogId:number;
  backlog:any={}
  constructor(private router:Router,private route:ActivatedRoute,private backlogService:BacklogService,private loginService:LoginService) {
this.backlogId=this.route.snapshot.params.backlogId

   }
   flag:boolean=false;
  ngOnInit() {
    this.role=this.loginService.getRole();
    console.log(this.role)
    this.getBacklogDetails()
    console.log(this.backlogId)
 
  }
  getBacklogDetails(){
    this.isAddRequirement=false
    this.backlogService.getBacklogDetails(this.backlogId).subscribe(
      data=>{
        console.log(data)
        this.backlog=data[0]
      },
     (err:any) => {
      if (err)
       this.loginService.msg=err.error

    });
  }
  editBacklog(){
    this.flag=true
  }
  updateBacklog(){
    this.backlogService.updateBacklogDetails(this.backlog).subscribe(
      data=>{
        console.log(data)
        this.flag=false;
        this.router.navigate(['Backlog'])
      }, (err:any) => {
      if (err)
       this.loginService.msg=err.error

    }
    );
  }
  cancelUpdateBacklog(){
    this.flag=false;
    this.getBacklogDetails();
  }
  deleteBacklog(){
    this.backlogService.deleteBacklogDetails(this.backlog).subscribe(
      data=>{
        console.log(data)
        this.flag=false;
        this.router.navigate(['backlog'])
      }
    , (err:any) => {
      if (err)
       this.loginService.msg=err.error

    });
  }
  addRequirement(){
    this.isAddRequirement=true
  }
  cancelAddRequirement(){
    this.isAddRequirement=false
  }
}
