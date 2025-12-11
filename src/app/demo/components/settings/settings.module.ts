import { CheckboxModule } from 'primeng/checkbox';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { SettingsRoutingModule } from './settings-routing.module';
import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MenuModule,
    SettingsRoutingModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule
  ]
})
export class SettingsModule { }
