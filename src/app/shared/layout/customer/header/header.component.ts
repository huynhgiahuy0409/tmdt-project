import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/buyer/model/user';
import { AuthService } from 'src/app/buyer/services/auth.service';
import { UserService } from 'src/app/buyer/services/user.service';
@Component({
  selector: 'customer-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class CustomerHeaderComponent implements OnInit{
  user$!: Observable<User | null>
  constructor(private userService: UserService,private authService: AuthService){
    this.user$ = userService.user$
  }
  ngOnInit(): void {
    this.user$.subscribe(value => {
      console.log(value)
    })
  }
  logout(){
    this.authService.logout().subscribe()
  }
}
