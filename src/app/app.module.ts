import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BaseComponent } from './components/base/base.component';
import { EmployeeListComponent } from './components/base/employee-list/employee-list.component';
import { EmployeeComponent } from './components/base/employee/employee.component';
import { EmployeeCreateComponent } from './components/base/employee-create/employee-create.component';
import { DashboardComponent } from './components/base/dashboard/dashboard.component';
import { SidebarComponent } from './components/base/sidebar/sidebar.component';
import { HeaderComponent } from './components/base/header/header.component';
// Modules
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SimpleNotificationsModule } from 'angular2-notifications';
// Services
import { EmployeeService } from './services/employee.service';
import { NotifyService } from './services/notify.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BaseComponent,
    EmployeeListComponent,
    EmployeeComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    EmployeeCreateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    DataTablesModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [EmployeeService, NotifyService,
    {
			provide: HTTP_INTERCEPTORS,
			useClass: JwtInterceptor,
			multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
