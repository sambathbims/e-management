import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { LoginComponent } from './components/login/login.component';
import { EmployeeListComponent } from './components/base/employee-list/employee-list.component';
import { DashboardComponent } from './components/base/dashboard/dashboard.component';
import { EmployeeComponent } from './components/base/employee/employee.component';
import { EmployeeCreateComponent } from './components/base/employee-create/employee-create.component';


import { AuthGuard } from './guard/auth.guard'

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'employees',
        children: [
          {
            path: '',
            component: EmployeeListComponent
          },
          {
            path: 'create',
            component: EmployeeCreateComponent 
          },
          {
            path: 'edit/:id',
            component: EmployeeComponent
          },
          {
            path: '',
            redirectTo: '',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
