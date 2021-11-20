import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
} from 'src/app';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private socialAuthService: SocialAuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    console.log(this.postService.random)
    this.form = this.fb.group({
      username: this.fb.control('', [Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
    this.socialAuthService.authState.subscribe((user) => {
      console.log(user)
      let returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/';
      if(user != null){
        this.router.navigate([returnUrl]);
      }
    });
  }
  loginWithFacebook() {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
  }
  loginWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
