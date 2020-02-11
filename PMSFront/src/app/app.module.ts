import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import { MyLoginModule } from "src/app/my-login/my-login.module";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { ProjectComponent } from './view/project/project.component';
import { RouterModule } from "@angular/router";
import { ProjectDetailComponent } from './view/project/project-detail/project-detail.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpInterceptorService } from "src/app/utils/http-interceptor.service";
import { HomeComponent } from './home/home.component';
import { UserComponent } from "src/app/view/user/user.component";
import { UserDetailComponent } from './view/user/user-detail/user-detail.component';
import { TaskComponent } from './view/task/task.component';
import { AddTaskComponent } from './view/task/add-task/add-task.component';
import { AssignTaskComponent } from './view/task/assign-task/assign-task.component';
import { UpdateTaskComponent } from './view/task/update-task/update-task.component';
import { BacklogComponent } from './view/backlog/backlog.component';
import { BacklogDetailComponent } from './view/backlog/backlog-detail/backlog-detail.component';
import { AddRequirementComponent } from './view/backlog/backlog-detail/add-requirement/add-requirement.component';
import { ViewTaskComponent } from './view/task/view-task/view-task.component';


@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    PageNotFoundComponent,
    HeaderComponent,
    ProjectComponent,
    ProjectDetailComponent,
    HomeComponent,
    UserComponent,
    UserDetailComponent,
    TaskComponent,
    AddTaskComponent,
    AssignTaskComponent,
    UpdateTaskComponent,
    BacklogComponent,
    BacklogDetailComponent,
    AddRequirementComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyLoginModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
