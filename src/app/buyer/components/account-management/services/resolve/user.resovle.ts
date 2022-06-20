import { UserService } from 'src/app/buyer/services/user.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "src/app/buyer/model/user";

@Injectable()
export class UserResolve implements Resolve<User | null>{
    constructor(private userService: UserService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User | null> | Promise<User> {
        return this.userService.user$
    }
}
