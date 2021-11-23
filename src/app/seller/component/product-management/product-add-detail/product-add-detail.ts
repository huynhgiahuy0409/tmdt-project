import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'seller-product-add-detail',
  templateUrl: './product-add-detail.html',
  styleUrls: ['./product-add-detail.scss']
})
export class SellerProductAddDetailComponent implements OnInit {

  imglist!:any[];
  constructor() { }

  ngOnInit(): void {
    this.imglist = [1,2,3,4,5,6,7];
    // const chooseFile1 = document.getElementById("choose-file"+this.imglist[1]);
    const chooseFile1 = document.getElementById("choose-file1");
    const a1 = document.getElementById("a1");
    const imgPreview1 = document.getElementById("img-preview1");

    const chooseFile2 = document.getElementById("choose-file2");
    const a2 = document.getElementById("a2");
    const imgPreview2 = document.getElementById("img-preview2");
    // @ts-ignore
    chooseFile1.addEventListener("change", function () {
      // @ts-ignore
      a1.style.position = "absolute";
      // @ts-ignore
      a1.style.marginTop = "-109px";
      // @ts-ignore
      a1.style.border = "none";
      getImgData1();
    });
      // @ts-ignore
      chooseFile2.addEventListener("change", function () {
        // @ts-ignore
        a2.style.position = "absolute";
        // @ts-ignore
        a2.style.marginTop = "-109px";
        // @ts-ignore
        a2.style.border = "none";
        getImgData2();
      });

      function getImgData1() {
        // @ts-ignore
        const files = chooseFile1.files[0];
        if (files) {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(files);
          fileReader.addEventListener("load", function () {
            // @ts-ignore
            imgPreview1.style.display = "block";
            // @ts-ignore
            imgPreview1.style.marginTop = "20px";
            // @ts-ignore
            imgPreview1.innerHTML = '<img style="width: 155px;height: 90px" src="' + this.result + '" />';
          });
        }
      }
    function getImgData2() {
      // @ts-ignore
      const files = chooseFile2.files[0];
      if (files) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
          // @ts-ignore
          imgPreview2.style.display = "block";
          // @ts-ignore
          imgPreview2.style.marginTop = "20px";
          // @ts-ignore
          imgPreview2.innerHTML = '<img style="width: 155px;height: 90px" src="' + this.result + '" />';
        });
      }
    }
    }
}
