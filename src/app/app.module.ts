import { AngularDraggableModule } from "angular2-draggable";
import { AccordionModule } from "primeng/accordion";
import { ButtonModule } from "primeng/button";
import { ColorPickerModule } from "primeng/colorpicker";
import { DialogModule } from "primeng/dialog";
import { DragDropModule } from "primeng/dragdrop";
import { DropdownModule } from "primeng/dropdown";
import { EditorModule } from "primeng/editor";
import { InputTextModule } from "primeng/inputtext";
import { MenuModule } from "primeng/menu";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ToolbarModule } from "primeng/toolbar";
import { NoSanitizePipe } from "src/custom-pipes/nosanitizerpipe";

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatGridListModule } from "@angular/material/grid-list";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TemplateDesignComponent } from "./template-design/template-design.component";
import { TableModule } from "primeng/table";
import { AuthInterceptor } from "./auth-interceptor";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [AppComponent, TemplateDesignComponent, NoSanitizePipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    HttpClientModule,
    ToolbarModule,
    ButtonModule,
    MenuModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    EditorModule,
    DropdownModule,
    ColorPickerModule,
    AngularDraggableModule,
    InputTextModule,
    MatGridListModule,
    DialogModule,
    CommonModule,
    ProgressSpinnerModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    MessageService ,ConfirmationService,
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
