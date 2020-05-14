import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  employees: any[] = [];

  showConfirmation: boolean = false;

  employee: any;

  empIndex: number;

  nonDtEmployees: any[] = [];

  filteredEmp: any[] = [];

  constructor(private eService: EmployeeService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order: []
    };

    this.getAllEmployees();
  }

  getAllEmployees(){
    this.eService.getAllEmployees().subscribe(res =>{
      this.employees = res;
      this.nonDtEmployees = this.employees.slice();
      this.filteredEmp = this.employees.slice(); 
      setTimeout(() => {
        this.dtTrigger.next();
      }, 200);
    })
  }

  deleteEmployee(employee, index){
    this.showConfirmation = true;
    this.empIndex = index;
    this.employee = employee;
  }

  confirmDelete(){
    this.eService.deleteEmployee(this.employee.id).subscribe(res =>{
      if(res){
        this.employees.splice(this.empIndex, 1);
        this.filteredEmp = this.employees.slice(); 
        this.rerender();
        this.showConfirmation = false;
      }
    })
  }

  searchEmployee(event){
    if(event.target.value != ''){
      this.filteredEmp = this.nonDtEmployees.filter(em => em.name.toLowerCase().includes(event.target.value.toLowerCase()) || em.email_id.toLowerCase().includes(event.target.value.toLowerCase()));
    }else{
      this.filteredEmp = this.nonDtEmployees.slice(); 
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
}
