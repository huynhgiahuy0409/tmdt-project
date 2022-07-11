import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { AuthService } from '../buyer/services/auth.service';
import { DialogService } from '../buyer/services/dialog.service';

export function appInitializer(
    authenticationService: AuthService,
    cookieService: CookieService,
    dialogService: DialogService
) {
    return () => {
        const haveToken: boolean = cookieService.check('refresh-token');
        if (haveToken) {
            return authenticationService.refreshAccessToken()
            .subscribe(
                (success) => {
                    console.log(success);
                    
                },
                (error) => {
                    const dialogRef = dialogService.openDialog('500ms', '500ms', {
                        title: 'Phiên đăng nhập hết hạn',
                        content: 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại',
                        action: [
                            { path: '/buyer/home', title: 'Trở lại trang đăng nhập' },
                        ],
                    });
                }
            );
        } else {
            return of(null);
        }
    };
}
