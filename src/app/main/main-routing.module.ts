import { VideoComponent } from './video/video.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagesComponent } from './images/images.component';
import { PlaylistsComponent } from 'src/app/main/playlists/playlists.component';
import { PlaylistDetailsComponent } from 'src/app/main/playlists/playlist-details/playlist-details.component';
import { AudioComponent } from './audio/audio.component';
import { TemplateDesignComponent } from './template-design/template-design.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { MonitorsComponent } from 'src/app/main/monitors/monitors.component';
import { UsersComponent } from 'src/app/main/users/users.component';
import { MonitorActionComponent } from './monitors/monitor-action/monitor-action.component';
import { AuthGuard } from '../demo/components/auth/services/auth.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'images', component: ImagesComponent, canActivate: [AuthGuard] },
  { path: 'video', component: VideoComponent, canActivate: [AuthGuard] },
  { path: 'video', component: VideoComponent, canActivate: [AuthGuard] },
  { path: 'audio', component: AudioComponent, canActivate: [AuthGuard] },
  { path: 'monitors', component: MonitorsComponent, canActivate: [AuthGuard] },
  { path: 'monitor-detail', component: MonitorActionComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'playlists', component: PlaylistsComponent, canActivate: [AuthGuard] },
  { path: 'playlist-details', component: PlaylistDetailsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'layout', component: TemplateDesignComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
