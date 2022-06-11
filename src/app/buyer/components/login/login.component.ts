import { interval, of } from 'rxjs';
import { RegisterAccountRequest } from './../../model/request';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
  NgForm,
  FormArray,
} from '@angular/forms';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
} from 'src/app';
import { PostService } from '../../post.service';
import { AuthService } from '../../services/auth.service';
import { debounce, debounceTime, switchMap, take, tap } from 'rxjs/operators';
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
  isLogin: boolean = true;
  countSlide: number = 0;
  token: string | undefined;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  public log: string[] = [];
  OTPForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private socialAuthService: SocialAuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    public renderer: Renderer2,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      recaptchaReactive: new FormControl('recaptcha', Validators.required),
    });
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
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
   
  }
  get OTPNumbers(): FormArray{
    return this.OTPForm.get('OTPNumbers') as FormArray
  }
  ngOnInit(): void {
    console.log(this.OTPNumbers.controls)
    this.runSlideShow(5000);
    this.registerForm.valueChanges.subscribe((e) => {
      if (e.passwordGr['password'] || e.passwordGr['confirm-password']) {
        this.setLevelPassword('level-password__progress-bar', e);
      }
    });
  }
  loginWithFacebook() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  loginWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
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
  isExistUsername: boolean = false;
  isLoading: boolean = false;
  isValidOTPPage: boolean = false;
  registerAccount!: RegisterAccountRequest
  onRegisterSubmit(formValue: any) {
    this.isLoading = true;
    const registerAccountRequest: RegisterAccountRequest = {
      username: formValue['email'],
      password: formValue.passwordGr['password'],
      fullName: formValue['fullName'],
    };
    this.authService
      .register(registerAccountRequest)
      .pipe(
        switchMap((response) => {
          if (response) {
            this.isLoading = true;
            this.registerAccount = response
            return this.authService.generateMailOTP(response);
          } else {
            this.isLoading = false;
            this.isExistUsername = true
            return of(null);
          }
        }),
        tap((value) => {
          if(value){
            this.isValidOTPPage = true
            this.isLoading = false;
          }
        })
      )
      .subscribe();
  }
  onValidOTPSubmit(){
    let OTPNumberValue = this.OTPForm.get('OTPNumbers')!.value
    this.authService.validOTP(OTPNumberValue,this.registerAccount).pipe(tap(value => {
      if(value){
        this.router.navigate(['/home'])
      }else{

      }
    })).subscribe()
  }
  openSuccussDialog(enterAnimationDuration: string, exitAnimationDuration: string): void{

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
    const force = this.checkStrength(e.passwordGr.password);
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
}
