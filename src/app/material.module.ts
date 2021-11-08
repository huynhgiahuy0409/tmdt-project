import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
const materialModules = [
  MatButtonModule,
  MatSliderModule,
  MatCardModule,
  MatIconModule,
  MatTableModule
];

@NgModule({
  imports: [materialModules],
  exports: [materialModules],
})
export class MaterialModules {}
