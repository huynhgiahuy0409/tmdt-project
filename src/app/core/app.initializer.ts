import { CookieService } from "ngx-cookie-service";
import { of } from "rxjs";
import { AuthService } from "../buyer/services/auth.service";

export function appInitializer(authenticationService: AuthService, cookieService: CookieService) {
    return () => {
        const haveToken: boolean = cookieService.check('refresh-token')
        if(haveToken){
            const token = cookieService.get('refresh-token')
            return  authenticationService.refreshAccessToken()
        }else{
            return of(null)
        }
    }
};