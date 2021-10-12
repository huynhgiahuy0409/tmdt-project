import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatSliderModule
]
@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialModules{

}

