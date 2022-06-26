import { UserService } from 'src/app/buyer/services/user.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserResponse } from 'src/app/_models/response';

@Injectable()
export class UserResolve implements Resolve<UserResponse | null>{
    constructor(private userService: UserService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UserResponse | Observable<UserResponse | null> | Promise<UserResponse> {
        return this.userService.user$
    }
}
