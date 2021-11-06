import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import {MatSliderModule} from '@angular/material/slider';
const materialModules = [
  MatButtonModule,
  MatSliderModule
]

@NgModule({
  imports: [materialModules],
  exports:[materialModules]
})
export class MaterialModules{

}
