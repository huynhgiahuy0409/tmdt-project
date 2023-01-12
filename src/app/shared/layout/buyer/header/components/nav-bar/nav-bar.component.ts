import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/buyer/services/user.service';
import { UserResponse } from 'src/app/_models/response';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  user$!: Observable<UserResponse | null>;
  constructor( private userService: UserService,) {
    this.user$ = userService.user$;
  }

  ngOnInit(): void {
  }

}
