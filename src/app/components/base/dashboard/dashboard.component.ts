import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  employees: any[] = [];

  constructor(private eService: EmployeeService) { }

  ngOnInit(): void {
    this.eService.getAllEmployees().subscribe(res =>{
      this.employees = res;
    })
  }

}
