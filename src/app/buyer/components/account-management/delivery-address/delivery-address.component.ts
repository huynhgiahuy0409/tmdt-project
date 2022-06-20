import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/buyer/model/user';
import { UserService } from 'src/app/buyer/services/user.service';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss']
})
export class DeliveryAddressComponent implements OnInit {
  user$!: Observable<User | null>
  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.user$ = this.userService.user$
  }
  onClickUpdateOrAddAddress() {
    this.dialog.open(UpdateAddressDiagLog, {
    })
  }
}

@Component({
  templateUrl: './edit-address-dialog.component.html',
  styleUrls: ['./delivery-address.component.scss'],
})
export class UpdateAddressDiagLog {
  disableSelect = true
  isDisable = true
  user!: User;
  addressFormGroup!: FormGroup;
  constructor(private router: Router, private userService: UserService, private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.addressFormGroup = this.fb.group({
      fullName: '',
      phoneNumber: '',
      detailAddress: '',
      ward: '',
      district: '',
      province: ''
    })
  }

}