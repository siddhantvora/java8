import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectService } from "src/app/view/project/project.service";
import { LoginService } from "src/app/my-login/login.service";
import { IProject } from "src/app/view/project/iproject";



@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
 
  role:boolean=false;
  projectId:number;
  project:IProject={ managerId: "", projectId: "", projectName: "", teamMember: 0, scrumMaster: "", status: "" };
  constructor(private router:Router,private route:ActivatedRoute,private projectService:ProjectService,private loginService:LoginService) {
this.projectId=this.route.snapshot.params.projectId

   }
   flag:boolean=false;
  ngOnInit() {
    this.role=this.loginService.getRole();
    console.log(this.role)
    this.getProjectDetails()
    console.log(this.projectId)
 
  }
  getProjectDetails(){
    this.projectService.getProjectDetails(this.projectId).subscribe(
      data=>{
        console.log(data)
        this.project=data[0]
      },
     (err:any) => {
      if (err)
       this.loginService.msg=err.error

    });
  }
  editProject(){
    this.flag=true
  }
  updateProject(){
    this.projectService.updateProjectDetails(this.project).subscribe(
      data=>{
        console.log(data)
        this.flag=false;
        this.router.navigate(['project'])
      }, (err:any) => {
      if (err)
       this.loginService.msg=err.error

    }
    );
  }
  cancelUpdateProject(){
    this.flag=false;
    this.getProjectDetails();
  }
  deleteProject(){
    this.projectService.deleteProjectDetails(this.project).subscribe(
      data=>{
        console.log(data)
        this.flag=false;
        this.router.navigate(['project'])
      }
    , (err:any) => {
      if (err)
       this.loginService.msg=err.error

    });
  }

}
