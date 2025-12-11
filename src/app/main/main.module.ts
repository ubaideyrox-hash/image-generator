import { CalendarModule } from 'primeng/calendar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MainRoutingModule } from './main-routing.module';
import { ImagesComponent } from './images/images.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from 'primeng/dragdrop';
import { CheckboxModule } from 'primeng/checkbox';
import { VideoComponent } from './video/video.component';
import { PlaylistsComponent } from 'src/app/main/playlists/playlists.component';
import { PlaylistDetailsComponent } from 'src/app/main/playlists/playlist-details/playlist-details.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { DividerModule } from 'primeng/divider';
import { AudioComponent } from './audio/audio.component';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { TemplateDesignComponent } from './template-design/template-design.component';
import {ToolbarModule} from 'primeng/toolbar';
import {SidebarModule} from 'primeng/sidebar';
import {EditorModule} from 'primeng/editor';
// import {DragDropModule} from '@angular/cdk/drag-drop';
import {ColorPickerModule} from 'primeng/colorpicker';
import { AngularDraggableModule } from 'angular2-draggable';
import {MatGridListModule} from '@angular/material/grid-list';
// import { ResizableModule } from 'angular-resizable-element';
import { NoSanitizePipe } from '../custom-pipes/nosanitizerpipe';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DashboardComponent } from './dashboard/dashboard.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { ProfileComponent } from './profile/profile.component';
import { MonitorsComponent } from './monitors/monitors.component';
import { MonitorActionComponent } from './monitors/monitor-action/monitor-action.component';
import { UsersComponent } from './users/users.component';
import { UserActionComponent } from './users/user-action/user-action.component';
import {TabViewModule} from 'primeng/tabview';
import {InputSwitchModule} from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [
    ImagesComponent,
    VideoComponent,
    PlaylistsComponent,
    PlaylistDetailsComponent,
    AudioComponent,
    TemplateDesignComponent,
    NoSanitizePipe,
    DashboardComponent,
    ProfileComponent,
    MonitorsComponent,
    MonitorActionComponent,
    UsersComponent,
    UserActionComponent
  ],
  imports: [
    CommonModule,
    MultiSelectModule,
    MainRoutingModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    NgxFileDropModule,
    DialogModule,
    MenuModule,
    DragDropModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    FormsModule,
    MenubarModule,
    DividerModule,
    FileUploadModule,
    GalleriaModule,
    ImageModule,
    ToolbarModule,
    SidebarModule,
    EditorModule,
    ColorPickerModule,
    AngularDraggableModule,
    MatGridListModule,
    RadioButtonModule,
    OverlayPanelModule,
    TabViewModule,
    InputSwitchModule
  ]
})
export class MainModule { }
