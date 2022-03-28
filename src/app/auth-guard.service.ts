import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router:Router) { }
  varIsLoggedIn = "isLoggedIn";
  canActivate(){
    console.log("sndsdghs");
    let bReturn = true;
    console.log(localStorage.getItem(this.varIsLoggedIn));
    if(localStorage.getItem(this.varIsLoggedIn) == 'false'){
      bReturn = false;
      alert("Sorry, you are not allowed to use this feature...");
      this.router.navigate(["/login"]);
    }
    return bReturn;
  }
}
