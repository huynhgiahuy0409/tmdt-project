import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/buyer/model/user';
import { UserService } from 'src/app/buyer/services/user.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  action: [string, string, string]
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', action: ["Xem", "Huỷ", "Đặt lại"] },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', action: ["Xem", "Huỷ", "Đặt lại"] },
];
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  user$!: Observable<User | null>
  contactFormGroup!: FormGroup;
  dataSource = ELEMENT_DATA;
  contactFormSetup = [
    ['Tài khoản', 'username'],
    ['Họ tên', 'fullName'],
    ['Số điện thoại', 'phoneNumber'],
    ['Email', 'email'],
    ['Tên shop', 'shopName'],
    ['Giới tính', 'gender'],
  ];
  constructor(private router: Router, private userService: UserService, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
    this.user$ = this.userService.user$
    let userResolve = this.activatedRoute.snapshot.data.user
    this.contactFormGroup = fb.group({
      username: userResolve.username,
      fullName: userResolve.fullName,
      phoneNumber: userResolve.phoneNumber,
      email: userResolve.username,
      gender: userResolve.gender,
      shopName: userResolve.gender
    });
  }

  ngOnInit(): void {
  }
  onClickUpdateContact(){
      let updateContactDialogRef = this.dialog.open(UpdateContactDiagLog, {
        width: '400px',
      });
  }
}
@Component({
  templateUrl: './edit-contact-dialog.component.html',
  styleUrls: ['./account.component.scss'],
})
export class UpdateContactDiagLog {
  isDisable = true
  user!: User;
  contactFormGroup!: FormGroup;
  constructor(private router: Router, private userService: UserService, private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      if (user) {
        const { username, fullName, phoneNumber, gender } = user
        this.contactFormGroup = this.fb.group({
          username: username,
          fullName: fullName,
          phoneNumber: phoneNumber,
          email: username,
          gender: gender
        });
      }
    })
  }
  onClickUpdate(){
    let user: User = this.contactFormGroup.value
    console.log(user)
    this.userService.updateUser(user).subscribe()
  }
}