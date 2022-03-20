import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
interface categoryList {
  type: string;
  detailType: [string, string[]][];
}
@Component({
  selector: 'seller-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class SellerProductAddComponent implements OnInit {
  productNameValue: string = '';
  categoryList!: categoryList[];
  selectedType!: string | null;
  selectedDetailType!: string | null;
  selectedProductName!: string | null;
  searchForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.categoryList = [
      {
        type: 'Thời Trang Nữ',
        detailType: [
          ['Áo', ['Áo hai dây và ba lỗ', 'Áo ông', 'Áo thun', 'Khác']],
          ['Quần', ['Quần legging', 'Quần dài', 'Khác']],
          ['Sắc đẹp', ['Chăm sóc tay, chân & móng ', 'Chăm sóc tóc', 'Khác']],
          ['Giày', ['Giày Snaeker', 'Giày boot', 'Khác']],
        ],
      },
      {
        type: 'Thời Trang Nam',
        detailType: [
          ['Áo ', ['Hoodie & Áo nỉ', 'Áo len', 'Áo khoác', 'Khác']],
          ['Quần ', ['Quần jean', 'Quần dài', 'Khác']],
          ['Sắc đẹp', ['Chăm sóc tóc & râu ', 'Dao cạo', 'Khác']],
          ['Giày', ['Giày thể thao', 'Giày da', 'Khác']],
          ['Khác', ['']],
        ],
      },
      {
        type: 'Phụ Kiện thời trang',
        detailType: [
          ['Nhẫn', ['Innox', 'Bạc', 'Khác']],
          ['Kính mắt', ['Kính mát', 'Hộp kính', 'Gọng kính']],
          ['Lắc tay', ['Innox', 'Bạc', 'Khác']],
          ['Mủ', ['Mủ len','Mủ lưỡi trai']],
          ['Phụ kiện thêm', ['Cài tóc','Khăn tay']],
          ['Khác', ['']],
        ],
      },
      {
        type: 'Chăm sóc thú cưng',
        detailType: [
          ['Thức ăn', ['Thức ăn cho chó', 'Thuwsca ăn cho mèo', 'Thức ăn cho cá', 'Thức ăn cho chim','Khác']],
          ['Phụ kiện', ['Vòng cổ', 'Quần áo', 'Nội thất cho thú cưng']],
          ['Làm đẹp cho thú cưng', ['Chăm sóc lông ', 'Chăm sóc răng miệng', 'Chăm sóc móng']],
          ['Khác', ['']],
        ],
      },
      {
        type: 'Thể thao & Dã ngoại',
        detailType: [
          ['Dụng cụ', ['Cần câu', 'Cầu lông', 'Xe leo núi','DỤng cụ cấm trại', 'Khác']],
          ['Giày thể thao', ['Giày bóng rổ', 'Giày bóng đá', 'Giày leo núi']],
          ['Thời trang ', ['Đồng phục dã ngoại ', 'Đồ bơi', 'Áo khoác CLB']],
          ['Khác', ['']],
        ],
      },
      {
        type: 'Đồ chơi trẻ am',
        detailType: [
          ['Robot', ['Robot điều khiển', 'Robot rắp ráp', 'Robot biến hình', 'Khác']],
          ['Xe', ['Xe điều khiển', 'Xe rắp ráp', 'Xe kết hợp']],
          ['Buppe ', ['Buppe con người ', 'Buppe con vật', 'Khác']],
          ['Khác', ['']],
        ],
      },
    ];
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: '',
    });
  }
  selectType(item: categoryList) {
    this.selectedType = item.type;
    this.selectedDetailType = null;
    this.selectedProductName = null;
  }
  selectDetailType(detailType: string) {
    this.selectedDetailType = detailType;
    this.selectedProductName = null;
  }
  selectProductName(productName: string) {
    this.selectedProductName = productName;
  }
  getDetailType(selectedType: string) {
    let result: [string, string[]][] | null = null;
    this.categoryList.forEach((e) => {
      if (e.type === selectedType) {
        result = e.detailType;
      }
    });
    return result;
  }
  getProductName(detailType: string) {
    let result!: string[];
    this.categoryList.forEach((e) => {
      if (e.type === this.selectedType) {
        e.detailType.forEach((e) => {
          if (e[0] == detailType) {
            result = e[1];
          }
        });
      }
    });
    return result;
  }
}
