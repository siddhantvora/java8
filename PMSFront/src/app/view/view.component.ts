import { Component, OnInit } from '@angular/core';
import { LoginService } from "src/app/my-login/login.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  isLogged=false;
  constructor(private loginService:LoginService) { }

  ngOnInit() {
    this.isLogged=this.loginService.isUserLoggedIn()
  }
  onLogout(){
    this.loginService.logout();
  }
}
