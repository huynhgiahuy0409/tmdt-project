import { switchMap, tap } from 'rxjs/operators';
import { AddressResponse, DistrictResponse, ProvinceResponse, UserResponse, WardResponse } from './../../../../_models/response';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AddressService } from 'src/app/buyer/services/address.service';
import { UserService } from 'src/app/buyer/services/user.service';
import { of } from 'rxjs';
import { AddressRequest } from 'src/app/_models/request';
import { DialogComponent } from '../../dialog/dialog.component';
import { DialogService } from 'src/app/buyer/services/dialog.service';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss'],
})
export class DeliveryAddressComponent implements OnInit {
  user$!: Observable<UserResponse | null>;
  provinceAll!: ProvinceResponse[];
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user$ = this.userService.user$;
    this.provinceAll = this.activatedRoute.snapshot.data.provinceAll;
  }
  onClickAddAddress() {
    let data = {
      userId: this.userService.userBehaviorSubject.value!.id,
      provinceAll: this.provinceAll,
      action: 'add'
    };
    this.dialog.open(UpdateAddressDiagLog, {
      data: data,
    });
  }
  onClickEditAddress(address: AddressResponse) {
    let data = {
      userId: this.userService.userBehaviorSubject.value!.id,
      provinceAll: this.provinceAll,
      existAddress: address,
      action: 'edit'
    };
    this.dialog.open(UpdateAddressDiagLog, {
      data: data,
    });
  }
}

@Component({
  templateUrl: './edit-address-dialog.component.html',
  styleUrls: ['./delivery-address.component.scss'],
})
export class UpdateAddressDiagLog {
  disableSelect = true;
  isDisable = true;
  user!: UserResponse;
  provinceAll!: ProvinceResponse[];
  districts$!: Observable<DistrictResponse[]>;
  wards$!: Observable<WardResponse[] | null>;
  addressFormGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private addressService: AddressService,
    private dialogService: DialogService
  ) { }
  ngOnInit(): void {
    if (this.data.existAddress) {
      const existAddress: AddressResponse = this.data.existAddress
      const { fullName, phoneNumber, detailAddress, ward, district, province, status }: AddressResponse = existAddress
      const patchValueAddress = {
        fullName: [fullName, Validators.required],
        phoneNumber: [phoneNumber, Validators.required],
        detailAddress: [detailAddress, Validators.required],
        ward: [ward.id, Validators.required],
        proDisGroup: this.fb.group({
          district: [district.id, Validators.required],
          province: [province.id, Validators.required],
        }),
        status: status,
      }

      this.addressFormGroup = this.fb.group(
        patchValueAddress
      )
    } else {
      this.addressFormGroup = this.fb.group({
        fullName: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        detailAddress: ['', Validators.required],
        ward: [null, Validators.required],
        proDisGroup: this.fb.group({
          district: [null, Validators.required],
          province: [null, Validators.required],
        }),
        status: 0,
      });
    }
    this.setUpAddress();
  }
  onClickSave() {
    const addressValue = this.addressFormGroup.value
    const status: number = addressValue.status ? 1 : 0
    const addressRequest: AddressRequest = {
      ...addressValue,
      districtId: addressValue.proDisGroup.district,
      provinceId: addressValue.proDisGroup.province,
      wardId: addressValue.ward,
      status: status
    }
    if (this.data.action == 'add') {
      this.addressService.addAddress(addressRequest, this.data.userId).subscribe((address: AddressResponse) => {
        this.dialogService.openDialog("500ms", "500ms", {
          "title": "Thành công",
          "content": "Thêm địa chỉ thành công",
        })
        let user: UserResponse | null = this.userService.userBehaviorSubject.value
        let addresses: AddressResponse[] = user!.addresses
        if (address.status == 1) {
          let defaultAddress = addresses.find(address => address.status == 1)
          defaultAddress!.status = 0
        }
        user?.addresses.push(address)
        this.userService.userBehaviorSubject.next(user)
      })
    } else if (this.data.action == 'edit') {
      let existAddress: AddressResponse = this.data.existAddress
      existAddress = {
        ...addressRequest,
        id: existAddress.id,
        ward: { ...existAddress.ward, id: addressRequest.wardId },
        district: { ...existAddress.district, id: addressRequest.districtId },
        province: { ...existAddress.province, id: addressRequest.provinceId }
      }
      this.addressService.editAddress(existAddress, this.data.userId).subscribe((addressResponse: AddressResponse) => {
        console.log(addressResponse);

        this.dialogService.openDialog("500ms", "500ms", {
          "title": "Thành công",
          "content": "Địa chỉ đã được cập nhật!",
        })
        let user: UserResponse | null = this.userService.userBehaviorSubject.value
        let addresses: AddressResponse[] = user!.addresses
        let updatedAddressIdx = addresses.findIndex(address => address.id === addressResponse.id)
        addresses.splice(updatedAddressIdx,1,addressResponse)
        console.log(addresses);
        

        this.userService.userBehaviorSubject.next(user)
      })
    }
  }
  private setUpAddress() {
    this.provinceAll = this.data.provinceAll;
    this.districts$ = this.addressFormGroup
      .get('proDisGroup')!
      .get('province')!
      .valueChanges.pipe(
        tap(() => {
          this.addressFormGroup
            .get('proDisGroup')!
            .get('district')!
            .setValue(null);
        }),
        switchMap((provinceId) => {
          return this.addressService.findAllDistrictByProvince(provinceId);
        })
      );
    this.wards$ = this.addressFormGroup.get('proDisGroup')!.valueChanges.pipe(
      switchMap((proDisGroup) => {
        const provinceId = proDisGroup.province;
        const districtId = proDisGroup.district;
        if (provinceId && districtId) {
          return this.addressService.findAllWardByProvinceAndDistrict(
            provinceId,
            districtId
          );
        }
        return of(null);
      })
    );
  }
}
