import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { User } from '../Users';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private router:Router,private employeeService:EmployeeService) { }
  parameter!:any;
  ngOnInit(): void {
  }

  usrList:User[] = [];
  register(id:string,name:string,pwd:string,cnfpwd:string,age:string,loc:string){
    let u:User = new User(id,name,pwd,age,loc);
    this.usrList.push(u);
    alert('Register Succesful');
  }

  

  add(id:string,name:string,location:string,email:string,designation:string,pwd:string){
    this.employeeService.addData(id,name,location,email,designation,pwd);
    alert("Registerd Succesfully");
  }



}
