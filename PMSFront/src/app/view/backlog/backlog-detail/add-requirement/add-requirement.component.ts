import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BacklogService } from "src/app/view/backlog/backlog.service";
import { LoginService } from "src/app/my-login/login.service";

@Component({
  selector: 'app-add-requirement',
  templateUrl: './add-requirement.component.html',
  styleUrls: ['./add-requirement.component.css']
})
export class AddRequirementComponent implements OnInit {
  @Input() backlogId: any = {};
  @Output() cancelAddRequirement: EventEmitter<any> = new EventEmitter();
  @Output() addedRequirement: EventEmitter<any> = new EventEmitter();
  requirement: String = "";
  constructor(private backlogService: BacklogService,private loginService:LoginService) { }

  ngOnInit() {
  }
  cancel() {
    this.cancelAddRequirement.emit()
  }
  add() {
    this.backlogService.addRequirement(this.backlogId, this.requirement).subscribe(
      data => {
        console.log(data)
        this.addedRequirement.emit();
       
      }, (err: any) => {
        if (err)
          this.loginService.msg = err.error

      }
    );
  }
}
