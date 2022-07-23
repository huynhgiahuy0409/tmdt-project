import { of } from 'rxjs';
import {
  AuthenticationRequest,
  RegisterAccountRequest as UserAccountRequest,
} from './../../model/request';
import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
  NgForm,
  FormArray,
} from '@angular/forms';
import { PostService } from '../../post.service';
import { AuthService } from '../../services/auth.service';
import {
  switchMap,
} from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { AuthenticationResponse } from '../../model/response';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
export function matchedPassword(c: AbstractControl) {
  const passwordValue = c.get('password')?.value;
  const confirmPasswordValue = c.get('confirmPassword')?.value;
  if (passwordValue === confirmPasswordValue) {
    return null;
  } else {
    return { isMatch: false };
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  page!: string;
  isLogin: boolean = true;
  countSlide: number = 0;
  token: string | undefined;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  OTPForm!: FormGroup;
  forgetPasswordForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  public log: string[] = [];
  isForgetPassword: boolean = false;
  pageRedirect: 'login' | 'register' | 'forget-password' | 'valid-otp' =
    'login';
  isExistUsername: boolean = false;
  isLoading: boolean = false;
  isValidOTPPage: boolean = false;
  userAccount!: UserAccountRequest;
  nextPath!: string;
  isExistUser: boolean = false;
  isNotifyNotExistUser = false;
  isSuccessResetPassword = false;
  constructor(
    private fb: FormBuilder,
    private socialAuthService: SocialAuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    public renderer: Renderer2,
    private authService: AuthService,
    public dialog: MatDialog,
    private userService: UserService,
    private cartService: CartService,
    private cookieService: CookieService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      /*  recaptchaReactive: new FormControl('recaptcha', Validators.required), */
    });
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      fullName: new FormControl('', [Validators.required]),
      passwordGr: new FormGroup(
        {
          password: new FormControl(null, Validators.required),
          confirmPassword: new FormControl(null, Validators.required),
        },
        matchedPassword
      ),
    });
    this.OTPForm = this.fb.group({
      OTPNumbers: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
      ]),
    });
    this.forgetPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
    });
    this.forgetPasswordForm.valueChanges.subscribe((value) =>
      console.log(value)
    );
  }
  ngOnInit(): void {
    this.socialAuthService.initState.subscribe(value => {
      console.log(value);
      
    })
    this.nextPath = this.activatedRoute.snapshot.queryParams.next;
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.pageRedirect == 'register') {
        this.setPageRedirect('register');
      } else if (params.pageRedirect == 'login') {
        this.setPageRedirect('login');
      }
    });
    this.runSlideShow(5000);
    this.registerForm.get('passwordGr')?.valueChanges.subscribe((e) => {
      let passwordValue = this.registerForm
        .get('passwordGr')!
        .get('password')!.value;
      this.setLevelPassword(
        'level-password__progress-bar-password',
        passwordValue
      );
    });
    this.forgetPasswordForm.get('password')!.valueChanges.subscribe((e) => {
      console.log(e);
      this.setLevelPassword('level-password__progress-bar-reset-password', e);
    });
    this.page = this.activatedRoute.snapshot.url[0].path;
  }
  get OTPNumbers(): FormArray {
    return this.OTPForm.get('OTPNumbers') as FormArray;
  }
  loginWithFacebook(): void {
    this.isLoading = true;
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((data: SocialUser) => {
        let userAccountRequest: UserAccountRequest = {
          username: data.id,
          password: data.id,
          fullName: data.name,
        };
        this.userService
          .updateUser(userAccountRequest)
          .pipe(
            switchMap((isUpdate) => {
              if (isUpdate) {
                let authRequest: AuthenticationRequest = {
                  ...userAccountRequest,
                };
                return this.authService.login(authRequest);
              }
              return of(null);
            })
          )
          .subscribe(
            (authResponse: AuthenticationResponse | null) => {
              this.isLoading = false;
              if (authResponse) {
                console.log(authResponse);
                
                this.userService.userBehaviorSubject.next(authResponse.user);
                this.cartService.cartBehaviorSubject.next(
                  authResponse.user.cart
                );
                this.authService.accessTokenBehaviorSubject.next(
                  authResponse.accessToken
                );
                this.authService.storeRefreshToken(authResponse.refreshToken);
                this.authService.startRefreshAccessTokenTimer(
                  authResponse.accessToken
                );
                let nextPath = this.nextPath ? this.nextPath : '/buyer/home';
                let data = {
                  title: 'Thành công',
                  content: 'Bạn đã đăng nhập thành công',
                  action: [{ path: nextPath, title: 'Trở lại trang chủ' }],
                };
                const matDialog = this.openDialog('500ms', '500ms', data);
              }
            },
            (error: HttpErrorResponse) => {
              this.isLoading = false;
              const matDialog = this.openDialog('500ms', '500ms', {
                title: 'Lỗi',
                content: `Đăng nhập không thành công: ${error.status}`,
              });
              matDialog.afterClosed().subscribe((response) => {
                this.pageRedirect = 'login';
                this.page = 'login';
              });
            }
          );
      })
      .catch((data: any) => {
        this.isLoading = false;
      });
  }
  loginWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      console.log(data)
    }).catch(data => { console.log(data);
    })
  }
  runSlideShow(ms: number) {
    setInterval(() => {
      this.countSlide++;
      let nameOld = `hinh${this.countSlide}`;
      let nameNew = `hinh${this.countSlide + 1}`;
      if (this.countSlide == 5) {
        nameNew = `hinh${1}`;
        this.countSlide = 0;
      }
      let nameOldObject = document.getElementById(nameOld);
      if (nameOldObject != null) {
        nameOldObject.style.opacity = '0';
      }
      let nameNewObject = document.getElementById(nameNew);
      if (nameNewObject != null) {
        nameNewObject.style.opacity = '1';
      }
      let child = document.getElementById('child');
      if (child != null) {
        child.style.left = `${this.countSlide * 20}%`;
      }
      let content_child = document.getElementById('left-content__progress-bar');
      if (content_child != null) {
        content_child.innerText = `0${this.countSlide + 1}`;
      }
    }, ms);
  }
  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }
    console.debug(`Token [${this.token}] generated`);
  }
  showPassword(iconElement: HTMLElement, passwordInputElement: HTMLElement) {
    console.log(passwordInputElement.getAttribute('type'));
    if (passwordInputElement.getAttribute('type') === 'password') {
      passwordInputElement.setAttribute('type', 'text');
      iconElement.classList.remove('fa', 'fa-eye');
      iconElement.classList.add('far', 'eye', 'fa-eye-slash');
    } else {
      passwordInputElement.setAttribute('type', 'password');
      iconElement.classList.remove('far', 'eye', 'fa-eye-slash');
      iconElement.classList.add('fa', 'fa-eye');
    }
  }
  public addTokenLog(message: string, token: any) {
    console.log(message);
    console.log(token);
  }
  isFailLogin: boolean = false;
  onLoginSubmit() {
    this.isLoading = true;
    let { email, password } = this.loginForm.value;
    const authenticationRequest: AuthenticationRequest = {
      username: email,
      password: password,
    };
    this.authService.login(authenticationRequest).subscribe(
      (authResponse) => {
        this.isLoading = false;
        if (authResponse) {
          console.log(authResponse);
          this.userService.userBehaviorSubject.next(authResponse.user);
          this.cartService.cartBehaviorSubject.next(authResponse.user.cart);
          this.authService.accessTokenBehaviorSubject.next(
            authResponse.accessToken
          );
          this.authService.storeRefreshToken(authResponse.refreshToken);
          this.authService.startRefreshAccessTokenTimer(
            authResponse.accessToken
          );
          let nextPath = this.nextPath ? this.nextPath : '/buyer/home';
          let data = {
            title: 'Thành công',
            content: 'Bạn đã đăng nhập thành công',
            action: [{ path: nextPath, title: 'Trở lại trang chủ' }],
          };
          const matDialog = this.openDialog('500ms', '500ms', data);
        } else {
          this.isFailLogin = true;
        }
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.cookieService.delete("refresh-token")
        const matDialog = this.openDialog('500ms', '500ms', {
          title: 'Lỗi',
          content: `Đăng nhập không thành công: ${error.status}`,
        });
        matDialog.afterClosed().subscribe((response) => {
          this.pageRedirect = 'login';
          this.page = 'login';
        });
      }
    );
  }
  onRegisterSubmit(formValue: any) {
    this.isLoading = true;
    const registerAccountRequest: UserAccountRequest = {
      username: formValue['email'],
      password: formValue.passwordGr['password'],
      fullName: formValue['fullName'],
    };
    this.authService
      .checkExistUser(registerAccountRequest.username)
      .pipe(
        switchMap((isExistUser) => {
          if (isExistUser) {
            this.isLoading = false;
            this.isExistUsername = true;
            return of(null);
          } else {
            return this.authService.generateMailOTP(registerAccountRequest);
          }
        })
      )
      .subscribe(
        (response) => {
          if (response != null) {
            this.isLoading = false;
            this.userAccount = registerAccountRequest;
            const matDialog = this.openDialog('500ms', '500ms', {
              title: 'Tài khoản hợp lệ',
              content: `Đã tạo mã OTP. Vui lòng kiểm tra mail để tiến hành đổi mậu khẩu`,
            });
            matDialog.afterClosed().subscribe((response) => {
              this.setPageRedirect('valid-otp');
              this.validOTPFor = 'register';
            });
          }
        },
        (error: HttpErrorResponse) => {
          this.isLoading = false;
          const matDialog = this.openDialog('500ms', '500ms', {
            title: 'Lỗi',
            content: `Lỗi tạo mail OTP: ${error.status}`,
          });
          matDialog.afterClosed().subscribe((response) => {
            this.pageRedirect = 'login';
            this.page = 'login';
          });
        }
      );
  }
  validOTPFor!: string;
  onValidOTPSubmit() {
    this.isLoading = true;
    let OTPNumberValue = this.OTPForm.get('OTPNumbers')!.value;
    this.authService
      .validOTP(OTPNumberValue, this.userAccount.username)
      .subscribe(
        (isValid) => {
          this.isLoading = false;
          if (isValid) {
            let data;
            if (this.validOTPFor == 'register') {
              data = {
                title: 'Xác thực thành công',
                content:
                  'Xác thực mã thành công. Tài khoản đã được tạo. Đăng nhập ngay!',
                action: [
                  { path: '/buyer/login', title: 'Trở lại trang đăng nhập' },
                ],
              };
            } else if (this.validOTPFor == 'forget-password') {
              data = {
                title: 'Xác thực thành công',
                content: 'Xác thực mã thành công. Vui lòng nhập mật khẩu mới',
              };
            }
            const matDialog = this.openDialog('1000ms', '500ms', data);
            matDialog.afterClosed().subscribe((response) => {
              if (this.validOTPFor == 'register') {
                this.setPageRedirect('login');
                this.page = 'login';
                this.userService.updateUser(this.userAccount).subscribe();
              } else if (this.validOTPFor == 'forget-password') {
                this.setPageRedirect('forget-password');
              }
              this.OTPForm.reset();
            });
          } else {
            this.openDialog('1000ms', '500ms', {
              title: 'Xác thực thất bại',
              content: 'Xác thực mã thất bại. Vui lòng kiểm tra mail',
              action: [
                { path: '/buyer/login', title: 'Trở lại trang đăng nhập' },
              ],
            });
            this.OTPForm.reset();
          }
        },
        (error) => {
          this.isLoading = false;
          const matDialog = this.openDialog('500ms', '500ms', {
            title: 'Lỗi',
            content: `Lỗi xác thực OTP: ${error.status}`,
          });
          matDialog.afterClosed().subscribe((response) => {
            this.pageRedirect = 'login';
            this.page = 'login';
          });
        }
      );
  }

  resetPassword() {
    this.isLoading = true;
    const { email, password } = this.forgetPasswordForm.value;
    const userAccountRequest: UserAccountRequest = {
      username: email,
      password: password,
      fullName: '',
    };
    if (!this.isExistUser) {
      this.authService
        .checkExistUser(email)
        .pipe(
          switchMap((isExistUser) => {
            if (isExistUser) {
              this.isNotifyNotExistUser = false;
              this.userAccount = userAccountRequest;
              return this.authService.generateMailOTP(userAccountRequest);
            } else {
              this.isNotifyNotExistUser = true;
              this.isExistUser = false;
              return of(null);
            }
          })
        )
        .subscribe(
          (response) => {
            this.isLoading = false;
            if (response != null) {
              const matDialog = this.openDialog('500ms', '500ms', {
                title: 'Tài khoản hợp lệ',
                content: `Đã tạo mã OTP. Vui lòng kiểm tra mail để tiến hành đổi mật khẩu`,
              });
              setTimeout(() => {
                matDialog.close();
                this.setPageRedirect('valid-otp');
                this.isExistUser = true;
                this.validOTPFor = 'forget-password';
              }, 3000);
            }
          },
          (error: HttpErrorResponse) => {
            this.isLoading = false;
            const matDialog = this.openDialog('500ms', '500ms', {
              title: 'Server lỗi',
              content: `Lỗi tạo mail OTP: ${error.status}`,
            });
            matDialog.afterClosed().subscribe((response) => {
              this.pageRedirect = 'login';
              this.page = 'login';
            });
          }
        );
    } else {
      this.userService.updateUser(userAccountRequest).subscribe(
        (response) => {
          this.isLoading = false;
          const matDialog = this.openDialog('1000ms', '500ms', {
            title: 'Cập nhật thành công',
            content: 'Mật khẩu đã được đổi lại. Đăng nhập ngay!',
          });
          matDialog.afterClosed().subscribe((response) => {
            this.setPageRedirect('login');
            this.page = 'login';
            this.isExistUser = false;
            this.forgetPasswordForm.reset();
          });
        },
        (error) => {
          this.isLoading = false;
          const matDialog = this.openDialog('500ms', '500ms', {
            title: 'Server lỗi',
            content: `Lỗi cập nhật lại mật khẩu: ${error}`,
          });
          matDialog.afterClosed().subscribe((response) => {
            this.pageRedirect = 'login';
            this.page = 'login';
            this.isExistUser = false;
          });
          this.forgetPasswordForm.reset();
        }
      );
    }
  }
  /* Helper function */
  private openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data: any
  ): MatDialogRef<DialogComponent, any> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
      data: data,
    });
    return dialogRef;
  }
  checkStrength(p: string) {
    let force = 0;
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const lowerLetters = /[a-z]+/.test(p);
    const upperLetters = /[A-Z]+/.test(p);
    const numbers = /[0-9]+/.test(p);
    const symbols = regex.test(p);
    const flags = [lowerLetters, upperLetters, numbers, symbols];
    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }
    force += 2 * p.length + (p.length >= 10 ? 1 : 0);
    force += passedMatches * 10;
    // short password
    force = p.length <= 8 ? Math.min(force, 10) : force;
    // poor variety of characters
    force = passedMatches === 1 ? Math.min(force, 10) : force;
    force = passedMatches === 2 ? Math.min(force, 20) : force;
    force = passedMatches === 3 ? Math.min(force, 30) : force;
    force = passedMatches === 4 ? Math.min(force, 40) : force;
    return force;
  }
  setLevelPassword(id: string, e: any) {
    console.log(e);
    const colors = [
      '#ccc',
      'rgb(255, 123, 92)',
      '#f1f17b',
      'rgb(192, 254, 116)',
      'rgb(140, 255, 0)',
    ];
    const progressBarEle = document.getElementById(id);
    const barsEle = progressBarEle?.childNodes;
    const nextSiblingProgressBarEle = this.renderer.nextSibling(progressBarEle);
    const force = this.checkStrength(e);
    barsEle?.forEach((bar, i) => {
      if (force == 0) {
        this.renderer.setStyle(bar, 'background-color', colors[0]);
        nextSiblingProgressBarEle.innerHTML = 'Hãy nhập mật khẩu';
        this.renderer.setStyle(nextSiblingProgressBarEle, 'color', colors[0]);
      } else if (force == 10) {
        if (i == 0) {
          this.renderer.setStyle(bar, 'background-color', colors[1]);
        } else {
          this.renderer.setStyle(bar, 'background-color', colors[0]);
        }
        nextSiblingProgressBarEle.innerHTML = 'Yếu';
        this.renderer.setStyle(nextSiblingProgressBarEle, 'color', colors[1]);
      } else if (force == 20) {
        if (i == 2 || i == 3) {
          this.renderer.setStyle(bar, 'background-color', colors[0]);
        } else {
          this.renderer.setStyle(bar, 'background-color', colors[2]);
        }
        nextSiblingProgressBarEle.innerHTML = 'Vừa';
        this.renderer.setStyle(nextSiblingProgressBarEle, 'color', colors[2]);
      } else if (force == 30) {
        if (i == 3) {
          this.renderer.setStyle(bar, 'background-color', colors[0]);
        } else {
          this.renderer.setStyle(bar, 'background-color', colors[3]);
        }
        nextSiblingProgressBarEle.innerHTML = 'Mạnh';
        this.renderer.setStyle(nextSiblingProgressBarEle, 'color', colors[3]);
      } else if (force == 40) {
        this.renderer.setStyle(bar, 'background-color', colors[4]);
        nextSiblingProgressBarEle.innerHTML = 'Mạnh';
        this.renderer.setStyle(nextSiblingProgressBarEle, 'color', colors[4]);
      }
    });
  }
  setPageRedirect(
    pageRedirect: 'login' | 'register' | 'forget-password' | 'valid-otp'
  ) {
    this.pageRedirect = pageRedirect;
    if (this.pageRedirect === 'login') {
      this.registerForm.reset();
      this.forgetPasswordForm.reset();
    } else if (this.pageRedirect === 'register') {
      this.loginForm.reset();
      this.forgetPasswordForm.reset();
    } else if (this.pageRedirect === 'forget-password') {
      this.loginForm.reset();
      this.registerForm.reset();
    }
  }
  onClickBackOTP() {
    if (this.validOTPFor == 'register') {
      this.setPageRedirect('register');
    } else if (this.validOTPFor == 'forget-password') {
      this.setPageRedirect('forget-password');
      this.isExistUser = false;
    }
  }
}
