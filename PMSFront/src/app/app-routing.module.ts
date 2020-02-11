import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "src/app/my-login/login/login.component";
import { AuthGuardService } from "src/app/my-login/login/auth-guard.service";
import { ViewComponent } from "src/app/view/view.component";
import { PageNotFoundComponent } from "src/app/page-not-found/page-not-found.component";
import { RegisterComponent } from "src/app/my-login/register/register.component";
import { ProjectComponent } from "src/app/view/project/project.component";
import { ProjectDetailComponent } from "src/app/view/project/project-detail/project-detail.component";
import { HomeComponent } from "src/app/home/home.component";
import { UserComponent } from "src/app/view/user/user.component";
import { UserDetailComponent } from "src/app/view/user/user-detail/user-detail.component";
import { BacklogComponent } from "src/app/view/backlog/backlog.component";
import { BacklogDetailComponent } from "src/app/view/backlog/backlog-detail/backlog-detail.component";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuardService] },
  { path: 'user/:userId', component: UserDetailComponent, canActivate: [AuthGuardService] },
  { path: 'project', component: ProjectComponent, canActivate: [AuthGuardService] },
  { path: 'project/:projectId', component: ProjectDetailComponent, canActivate: [AuthGuardService] },
  { path: 'backlog', component: BacklogComponent, canActivate: [AuthGuardService] },
  { path: 'backlog/:backlogId', component: BacklogDetailComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'view', component: ViewComponent, canActivate: [AuthGuardService] },
  { path: 'pnf', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
