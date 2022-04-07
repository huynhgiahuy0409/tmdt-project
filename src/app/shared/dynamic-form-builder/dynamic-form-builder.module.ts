import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldBuilderComponent } from './field-builder/field-builder.component';
import { FileComponent } from './atom/file/file.component';
import { MaterialModules } from 'src/app/material.module';
import { TextComponent } from './atom/text/text.component';
import { SelectComponent } from './atom/select/select.component';

@NgModule({
  declarations: [FieldBuilderComponent, FileComponent, TextComponent, SelectComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModules],
  exports: [FieldBuilderComponent, FileComponent],
})
export class DynamicFormBuilderModule {}
