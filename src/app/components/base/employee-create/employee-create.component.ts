import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { NotifyService } from '../../../services/notify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  employeeForm: FormGroup;
  submitted: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private eService: EmployeeService, private notifyService: NotifyService, private router: Router) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      name: [null, Validators.required],
      company_name: [null, Validators.required],
      email_id: [null, Validators.required],
      mobile: [null, Validators.required],
      designation: [null, Validators.required],
      avatar: [null, Validators.required]
    })
  }

  setAvatar(value){
    this.employeeForm.get('avatar').patchValue(value);
  }

  createEmployee(){
    this.submitted = true;
    if(this.employeeForm.invalid){
      return;
    }

    this.eService.createEmployee(this.employeeForm.value).subscribe(res =>{
      if(res){
        this.notifyService.showSuccess('Success', 'Employee created!');
        this.employeeForm.reset();
        this.submitted = false;
        this.router.navigate(['/employees']);
      }
    })
  }

}
