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
    /* return of(1).pipe(map(value => {
      if(value === 2){
        console.log(true)
        return true
      }else {
        console.log(false)
        this.router.navigate(['/login'], { queryParams : {returnUrl : state.url}});
        return true
      }
    }
    )) */
    return this.socialAuthService.authState.pipe(map(user => {
      if(user){
        return true
      }else {
        this.router.navigate(['/login'], { queryParams : {returnUrl : state.url}});
        return false
      }
    }))
  }

}
