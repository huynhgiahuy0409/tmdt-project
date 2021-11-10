import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  path!: string | undefined;
  constructor(private activatedRoute: ActivatedRoute,private router: Router) {
   }

  ngOnInit(): void {
    console.log(this.router)
    this.path = this.router.config[0].path;
    console.log(this.activatedRoute)
  }

}
