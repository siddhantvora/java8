import { Component, OnInit } from '@angular/core';
import { User } from "src/app/view/user/user";
import { UserService } from "src/app/view/user/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users:User[]=[];
  constructor(private userService:UserService,private router: Router) { }

  ngOnInit() {
    this.getUsers()
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
  onDetail(userId){
 if (userId) {
      this.router.navigate(["user", userId])
    }
  }
}
