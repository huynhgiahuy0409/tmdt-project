import { NgModule } from "@angular/core";
import { BuyerFooterComponent } from "./footer.component";
import {RouterModule} from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [BuyerFooterComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
  exports: [BuyerFooterComponent]
})
export class BuyerFooterModule{

}
