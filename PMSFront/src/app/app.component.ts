import { Component } from '@angular/core';
import { LoginService } from "src/app/my-login/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PMSFront';
  constructor(private loginService:LoginService){}
}
