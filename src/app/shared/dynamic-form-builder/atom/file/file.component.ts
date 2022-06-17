import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  UntypedFormGroup,
  AbstractControl,
  FormGroup,
} from '@angular/forms';
import { reduce } from 'rxjs/operators';
import { FileUploadService } from 'src/app/seller/services/file-upload.service';
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
  findInputId = 'file-input-'
  @Input() field: any = {};
  @Input() form!: FormGroup;
  imageURLs!: Map<number,string | ArrayBuffer | null>;
  constructor(private fileUploadService: FileUploadService) {
    this.imageURLs = new Map<number,string>([])
  }
  ngAfterViewInit(): void {
  }
  get formArray(): FormArray {
    return this.form.get(this.field.name) as FormArray;
  }
  ngOnInit(): void {
  }
  onFileChange(event: any, i: number) {
    event.stopPropagation()
    event.preventDefault()
    let fileInput = document.getElementById(`${this.findInputId} + ${i}`) as HTMLInputElement
    let files: FileList = event.target.files
    const selectedFile = files!.item(0) as File;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = (event) => {
      this.imageURLs.set(i,reader.result)
      this.fileUploadService.files.set(i, selectedFile);
    };
  }
}
