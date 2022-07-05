import { UserResponse } from 'src/app/_models/response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DigitalBillService } from 'src/app/seller/services/digital-bill.service';
import { UserService } from 'src/app/buyer/services/user.service';
import { DialogService } from 'src/app/buyer/services/dialog.service';

@Component({
  selector: 'app-digital-bill-process',
  templateUrl: './digital-bill-process.component.html',
  styleUrls: ['./digital-bill-process.component.scss'],
})
export class DigitalBillProcessComponent implements OnInit {
  digitalBillForm!: FormGroup;
  constructor(
    private digitalBillService: DigitalBillService,
    private userService: UserService,
    private fb: FormBuilder,
    private dialogService: DialogService
  ) {
    this.digitalBillForm = fb.group({
      encryptedHash: ['', Validators.required],
      orderId: ['', Validators.required],
    });
    this.digitalBillForm.valueChanges.subscribe((v) => console.log(v));
  }

  ngOnInit(): void {}
  submitDigitalBillForm() {
    let encryptHash = this.digitalBillForm.value.encryptedHash;
    let orderId = this.digitalBillForm.value.orderId;
    let user: UserResponse | null = this.userService.userBehaviorSubject.value;
    this.digitalBillService
      .verifyDigitalBill(encryptHash, orderId, user!.id)
      .subscribe((isVerify) => {
        if(isVerify){
          this.dialogService.openDialog("500ms","500ms",{
            title: "Thành công",
            content: "Xác thực chữ ký và hóa đơn thành công"
          })
        }else{
          this.dialogService.openDialog("500ms","500ms",{
            title: "Thất bại",
            content: "Xác thực chữ ký và hóa đơn thất bại"
          })
        }
      });
  }
}
