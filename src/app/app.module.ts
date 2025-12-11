import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AuthInterceptor } from './auth-interceptor';
import { MenubarModule } from 'primeng/menubar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
// import { SettingsComponent } from './auth/settings/settings.component';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        MenubarModule,
        BrowserAnimationsModule,
        ToastModule,
        ConfirmDialogModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        
       MessageService ,ConfirmationService,
        {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
