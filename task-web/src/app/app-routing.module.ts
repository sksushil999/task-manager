import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './gaurds/login.guard';
import { UserGuard } from './gaurds/user.guard';
import { PagesComponent } from './pages/pages.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './pages/users/user/user.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskComponent } from './pages/tasks/task/task.component';

const childRoutes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/:id', component: TaskComponent },
];


const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: 'pages', component: PagesComponent, children: childRoutes, canActivate: [UserGuard] },
  { path: 'signin', component: LoginComponent },
  // { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'pages' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
//, canActivate: [LoginGuard]
export class AppRoutingModule { }

