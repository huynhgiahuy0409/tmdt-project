import { CookieService } from 'ngx-cookie-service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from '../buyer/services/auth.service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService){
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let jwt = this.authService.accessTokenBehaviorSubject.value
        if(jwt){
            let accessToken = jwt.token
            const cloned = req.clone({
                headers: req.headers.set("Authorization", 'Bearer ' + accessToken)
            })
            return next.handle(cloned);
        }else{
            return next.handle(req)
        }
    }
}