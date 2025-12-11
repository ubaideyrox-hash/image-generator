import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { AuthService } from '../demo/components/auth/services/auth.service';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.scss']
})
export class AppTopBarComponent {

    items: MenuItem[] = [];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    @ViewChild('op', {static: false}) model;

    constructor(public layoutService: LayoutService,public authService:AuthService) { }

    ngOnInit() {
        this.items = [
            {
                icon: 'pi pi-cog',

                items: [
                    { label: 'Setting', icon: 'pi pi-cog', routerLink: ['/settings'] },
                    { label: 'Profile', icon: 'pi pi pi-user', routerLink: ['/auth/login'] },
                ]
            }
        ];
    }
}
