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
            const token = cookieService.get('refresh-token');
            return authenticationService.refreshAccessToken()
            .subscribe(
                (success) => { },
                (error) => {
                    cookieService.delete('refresh-token');
                    const dialogRef = dialogService.openDialog('500ms', '500ms', {
                        title: 'Phiên đăng nhập hết hạn',
                        content: 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại',
                        action: [
                            { path: '/buyer/login', title: 'Trở lại trang đăng nhập' },
                        ],
                    });
                }
            );
        } else {
            console.log(haveToken);
            return of(null);
        }
    };
}
