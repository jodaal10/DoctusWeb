import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityComponent } from './components/activity/activity.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent},
  {path:'activity', component: ActivityComponent} //only user auth
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
