import { CookieService } from 'ngx-cookie-service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class JWTInterceptor implements HttpInterceptor{
    constructor(private cookieService: CookieService){
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const haveToken: boolean = this.cookieService.check('refresh-token')
        if(haveToken){
            const token = this.cookieService.get('refresh-token')
            const cloned = req.clone({
                headers: req.headers.set("Authorization", 'Bearer ' + token)
            })
            return next.handle(cloned);
        }else{
            return next.handle(req)
        }
    }
}