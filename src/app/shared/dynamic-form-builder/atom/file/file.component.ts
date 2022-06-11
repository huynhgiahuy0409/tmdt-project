import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  UntypedFormArray,
  FormControl,
  UntypedFormGroup,
  AbstractControl,
} from '@angular/forms';
import { reduce } from 'rxjs/operators';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit, AfterViewInit {
  fileInputLabelPrefix: string = 'file-input-label-prefix-';
  fileInputLabelSuffix: string = 'file-input-label-suffix-';
  @Input() field: any = {};
  @Input() form!: UntypedFormGroup;
  imageURL!: string | ArrayBuffer | null;
  imageURLs!: any[];
  constructor() {}
  ngAfterViewInit(): void {
    this.formArray.valueChanges.subscribe((v: any[]) => {
      v.forEach((e, i) => {
        if (e) {
          document.getElementById(this.fileInputLabelPrefix + i)?.remove();
          document.getElementById(this.fileInputLabelSuffix + i)?.remove();
        }
      });
    });
  }
  get formArray(): UntypedFormArray {
    return this.form.get(this.field.name) as UntypedFormArray;
  }
  ngOnInit(): void {
    if (this.field.abstractControl == 'array') {
      this.imageURLs = [...this.formArray.value];
    }
    this.formArray.valueChanges.subscribe((v) => console.log(this.imageURLs));
  }
  preview(files: FileList | null, i: number) {
    if (files?.length === 1) {
      const reader = new FileReader();
      const selectedFile = files.item(0) as File;
      /* selected File  =  lastModified: 1620836195592
                          lastModifiedDate: Wed May 12 2021 23:16:35 GMT+0700 (Giờ Đông Dương) {}
                          name: "file-name.png"
                          size: 238154
                          type: "image/png"
                          webkitRelativePath: "" */
      reader.readAsDataURL(selectedFile);
      reader.onload = (event) => {
        this.imageURLs[i] = reader.result;
      };
    }
  }
}
