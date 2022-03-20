import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
const routes: Routes = [
  /* {
    path: '',
    loadChildren: () =>
      import(
        '../../../../seller/components/product-management/product-management.module'
      ).then((m) => m.ProductManagementModule),
  }, */
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidebarRoutingModule {}
