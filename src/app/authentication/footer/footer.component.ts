import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  takeCares: [string, string][] = [
    ["Trung tâm trợ giúp", ""]
    , ["Toy Fair Bog", ""]
    , ["Shopee Mall", ""]
    , ["Hướng Dẫn Mua Hàng", ""]
    , ["Hướng Dẫn Bán Hàng", ""]
    , ["Thanh Toán", ""]
    , ["Shopee Xu", ""]
    , ["Vận Chuyển", ""]
    , ["Trả Hàng & Hoàn Tiền", ""]
    , ["Chăm Sóc Khách Hàng", ""]
    , ["Chính Sách Bảo Hành", ""]
  ]
  aboutUs: [string, string][] = [
    ["Giới Thiệu Về Shopee Việt Nam", ""],
    ["Tuyển Dụng", ""],
    ["Điều Khoản Shopee", ""],
    ["Chính Sách Bảo Mật", ""],
    ["Chính Hãng", ""],
    ["Kênh Người Bán", ""],
    ["Flash Sales", ""],
    ["Chương Trình Tiếp Thị Liên Kết Shopee", ""],
    ["Liên Hệ Với Truyền Thông", ""],
  ]
  paymentLogoSources: string[] = [
    "https://cf.shopee.vn/file/d4bbea4570b93bfd5fc652ca82a262a8"
    , "https://cf.shopee.vn/file/a0a9062ebe19b45c1ae0506f16af5c16"
    , "https://cf.shopee.vn/file/38fd98e55806c3b2e4535c4e4a6c4c08"
    , "https://cf.shopee.vn/file/bc2a874caeee705449c164be385b796c"
    , "https://cf.shopee.vn/file/2c46b83d84111ddc32cfd3b5995d9281"
    , "https://cf.shopee.vn/file/5e3f0bee86058637ff23cfdf2e14ca09"
    , "https://cf.shopee.vn/file/9263fa8c83628f5deff55e2a90758b06"
    , "https://cf.shopee.vn/file/0217f1d345587aa0a300e69e2195c492"
  ]
  deliveryLogoSources: string[] = [
    "https://cf.shopee.vn/file/5e7282bd0f7ee0872fdb0bd1d40fbe9e",
    "https://cf.shopee.vn/file/d10b0ec09f0322f9201a4f3daf378ed2",
    "https://cf.shopee.vn/file/77bf96a871418fbc21cc63dd39fb5f15",
    "https://cf.shopee.vn/file/59270fb2f3fbb7cbc92fca3877edde3f",
    "https://cf.shopee.vn/file/957f4eec32b963115f952835c779cd2c",
    "https://cf.shopee.vn/file/0d349e22ca8d4337d11c9b134cf9fe63",
    "https://cf.shopee.vn/file/3900aefbf52b1c180ba66e5ec91190e5",
    "https://cf.shopee.vn/file/6e3be504f08f88a15a28a9a447d94d3d",
    "https://cf.shopee.vn/file/b8348201b4611fc3315b82765d35fc63",
    "https://cf.shopee.vn/file/864825c06b9f2c8c9334ebdeafa1f0fb",
  ]
  downloadQRCodeSrc:  string = "https://cf.shopee.vn/file/a5e589e8e118e937dc660f224b9a1472"
  
  constructor() { }

  ngOnInit(): void {
  }

}
