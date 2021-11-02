import { NgModule } from "@angular/core";
import { CustomerFooterComponent } from "./footer.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [CustomerFooterComponent],
    imports: [
        RouterModule
    ],
  exports: [CustomerFooterComponent]
})
export class CustomerFooterModule{

}
