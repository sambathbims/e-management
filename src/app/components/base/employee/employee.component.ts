import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  submitted: boolean = false;

  employeeId: number;
  employee: any;
  edit: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: ActivatedRoute, private eService: EmployeeService, private notifyService: NotifyService) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      name: [null, Validators.required],
      company_name: [null, Validators.required],
      email_id: [null, Validators.required],
      mobile: [null, Validators.required],
      designation: [null, Validators.required],
      avatar: [null, Validators.required]
    })

    this.router.params.subscribe(res =>{
      this.employeeId = res.id;
      this.eService.getEmployee(this.employeeId).subscribe(res =>{
        if(res){
          this.employee = res;
          this.employeeForm.patchValue({
            name: this.employee.name,
            company_name: this.employee.company_name,
            email_id: this.employee.email_id,
            mobile: this.employee.mobile,
            designation: this.employee.designation,
            avatar: this.employee.avatar
          })
        }
      })
    })
  }

  setAvatar(value){
    this.employeeForm.get('avatar').patchValue(value);
  }

  editEmployee(){
    this.submitted = true;
    if(this.employeeForm.invalid){
      return;
    }

    this.eService.updateEmployee(this.employeeForm.value, this.employeeId).subscribe(res =>{
      if(res){
        this.employee = res;
        this.notifyService.showSuccess('Success', 'Employee updated!');
        this.submitted = false;
        this.edit = false;
      }
    })
  }

}
