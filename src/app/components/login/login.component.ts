import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: any;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(res =>{
      this.returnUrl = res['returnUrl'] || '';
    })

    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  login(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authenticationService.login(this.loginForm.value).subscribe(res =>{
      if(res){
        this.submitted = false;
        sessionStorage.setItem('user', JSON.stringify(res));
        this.authenticationService.currentUser(res);
        this.router.navigate([this.returnUrl]);
      }
    })
  }
}
