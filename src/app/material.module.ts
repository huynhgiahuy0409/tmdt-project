import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from "@angular/material/checkbox";
const materialModules = [
  MatButtonModule,
  MatSliderModule,
  MatCardModule,
  MatIconModule,
  MatCheckboxModule,
  MatIconModule
];

@NgModule({
  imports: [materialModules],
  exports: [materialModules],
})
export class MaterialModules {}
