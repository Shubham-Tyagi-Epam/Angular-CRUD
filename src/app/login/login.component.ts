import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';
import { RegisterComponent } from '../register/register.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private activatedRoute:ActivatedRoute,private router:Router,private authentificatonService:AuthentificationService,private employeeService:EmployeeService) { }
  parameter!:any;
  strUrlForRouting!:any;
  varIsLoggedIn = "isLoggedIn";
  userid="";
  password="";
  empList:Employee[] = []
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (param) => {
        this.parameter = param;
        console.log(this.parameter);
        if(this.parameter.uid == "Shubham" && this.parameter.pwd == "admin"){
          alert("Login Succesful");
          this.authentificatonService.login();
          this.strUrlForRouting = "/about";
          this.router.navigate([this.strUrlForRouting]);
        }
        this.empList = this.employeeService.getEmployeeList();
        console.log(this.empList);
        for(let u of this.empList){
          console.log(u.id,u.pwd);
          if(this.parameter.uid == u.id && this.parameter.pwd == u.pwd){
            alert("Login Succesful");
            this.authentificatonService.login();
            this.strUrlForRouting = "/about";
            this.router.navigate([this.strUrlForRouting]);
          }
        }
        
      }
    );
  }
}

