import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/view/user/user.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
role:boolean=false;
  userId:number;
  user:any={};
  constructor(private router:Router,private route:ActivatedRoute,private userService:UserService) {
this.userId=this.route.snapshot.params.userId

   }
   flag:boolean=false;
  ngOnInit() {
    if(sessionStorage.getItem('role')=='admin'){
      this.role=true;
    }
    console.log(this.role)
    this.getUserDetails()
  }
  getUserDetails(){
    this.userService.getUserDetails(this.userId).subscribe(
      data=>{
        console.log(data)
        this.user=data[0]
      }
    );
  }
  editUser(){
    this.flag=true
  }
  updateUser(){
    this.userService.updateUserDetails(this.user).subscribe(
      data=>{
        console.log(data)
        this.flag=false;
        this.router.navigate(['user'])
      }
    );
  }
  cancelUpdateUser(){
    this.flag=false;
    this.getUserDetails();
  }
  
}
