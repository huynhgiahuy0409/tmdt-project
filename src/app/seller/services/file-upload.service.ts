import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/_models/constance';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    }),
    params: {},
    responseType: 'blob',
  };
  files: Map<number, File> = new Map([]);
  fileBSub: BehaviorSubject<File[] | null> = new BehaviorSubject<File[] | null>(
    null
  );
  file$: Observable<File[] | null> = this.fileBSub.asObservable();
  constructor(private httpClient: HttpClient) {}
  addProductImages(productId: number): Observable<any> {
    var formData: FormData = new FormData();
    let fileList: Blob[] = [];
    let fileLength = this.files.size;
    for (let index = 0; index < fileLength; index++) {
      const file = this.files.get(index) as Blob;
      if (file != undefined) {
        fileList.push(file);
      }
      formData.append('files', file);
    }
    const url = `${DOMAIN}/api/product/upload-image/${productId}`;
    return this.httpClient.post(url, formData).pipe(
      tap((_) => {
        /* this.files.clear(); */
      })
    );
  }
  downloadFile(filename: string) {
    const url = `${DOMAIN}/api/downloadFile/${filename}`;
    return this.httpClient.get(url, {
      responseType: 'blob',
    });
  }
}
