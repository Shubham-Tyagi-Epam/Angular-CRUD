import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment';
  constructor(private authentificationService:AuthentificationService,private router:Router){
    this.authentificationService.logout();
  }

  logout(){
    this.router.navigateByUrl('/login');
    this.authentificationService.logout();
  } 
}
