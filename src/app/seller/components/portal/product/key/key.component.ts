import { FileUploadService } from 'src/app/seller/services/file-upload.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/buyer/services/user.service';
import { DIRECT_LINK_DIG_BILL } from 'src/app/_models/constance';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  directLinkDigitalBill = `${DIRECT_LINK_DIG_BILL}/`
  publicKeyFilename!: string
  constructor(private userService: UserService, private fileUploadService: FileUploadService, private renderer2: Renderer2, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.publicKeyFilename = this.userService.userBehaviorSubject.value!.publicKeyFilename
  }
  downloadFile(filename: string){
    this.fileUploadService.downloadFile(filename).subscribe(blob => {
      let a = this.renderer2.createElement('a')
      this.renderer2.setAttribute(a,'href',  window.URL.createObjectURL(blob))
      this.renderer2.setAttribute(a,'download',filename)
      a.click()
    })
  }
}
