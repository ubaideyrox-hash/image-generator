import { ToastModule } from 'primeng/toast';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {DividerModule} from 'primeng/divider';

@NgModule({
    declarations: [
    
  ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        FormsModule,
        TableModule,
        DropdownModule,
        MenubarModule,
        ButtonModule,
        DividerModule
    ]
})
export class PagesModule { }
