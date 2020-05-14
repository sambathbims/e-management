import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  base_url:string =  environment.base_url; 

  constructor(private http: HttpClient) { }

  getAllEmployees():Observable<any>{
    return this.http.get(`${this.base_url}/api/employees`);
  }

  createEmployee(value):Observable<any>{
    return this.http.post(`${this.base_url}/api/employees`, value);
  }

  getEmployee(id){
    return this.http.get(`${this.base_url}/api/employees/${id}`);
  }

  updateEmployee(value, id){
    return this.http.put(`${this.base_url}/api/employees/${id}`, value);
  }

  deleteEmployee(id):Observable<any>{
    return this.http.delete(`${this.base_url}/api/employees/${id}`); 
  }

}
