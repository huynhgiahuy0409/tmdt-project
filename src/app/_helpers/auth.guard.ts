import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../buyer/services/user.service';
@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService
    ) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        console.log(route);
        console.log(state);

        if (this.userService.userBehaviorSubject.value) {
            return true;
        } else {
            if (state.url == '/cart'){
                this.router.navigate(['/login'])
            }else if(route.routeConfig?.path === 'product-management'){
                this.router.navigate(['/seller/login'], {
                    queryParams: {
                        next: 'seller'
                    }
                })
            }
            return false
        }
    }
}