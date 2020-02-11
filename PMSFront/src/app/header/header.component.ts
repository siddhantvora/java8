import { Component, OnInit } from '@angular/core';
import { LoginService } from "src/app/my-login/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(private loginService: LoginService) { }
  
  ngOnInit() {
    
  }
  onLogout() {

    this.loginService.logout();
  
  }

}
