import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
       
        { path: 'file', data: { breadcrumb: 'File' }, loadChildren: () => import('./file/filedemo.module').then(m => m.FileDemoModule) },
        { path: 'main', data: { breadcrumb: 'Main' }, loadChildren: () => import('../../../main/main.module').then(m => m.MainModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UIkitRoutingModule { }
