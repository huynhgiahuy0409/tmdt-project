import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { FacebookLoginProvider, SocialAuthService } from "src/app";
import { PreviousRouterService } from "./previous-router.component";

@Injectable({
  providedIn: 'root'
}
)
export class AuthGuardService implements CanActivate{
  constructor(private preRouterService: PreviousRouterService, private socialAuthService: SocialAuthService, public router: Router){
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.socialAuthService.authState.pipe(map(user => {
      console.log(user);
      
      if(user){
        return true
      }else {
        this.router.navigate(['/buyer/login'], { queryParams : {returnUrl : state.url}});
        return false
      }
    }))
  }

}
