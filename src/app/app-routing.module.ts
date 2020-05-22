import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeContentComponent } from './content/home-content/home-content.component';
import { DetailContentComponent } from './content/detail-content/detail-content.component';

const routes: Routes = [
  {path: '', component: HomeContentComponent, pathMatch: 'full'},
  {path: ':mainTopic/:pathKey', component: DetailContentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
