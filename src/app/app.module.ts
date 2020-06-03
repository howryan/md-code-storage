import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.main';
import { DetailContentComponent } from './content/detail-content/detail-content.component';
import { HomeContentComponent } from './content/home-content/home-content.component';
import { SideNavComponent } from './sidenav/side-nav/side-nav.component';
import { SideNavEntryComponent } from './sidenav/side-nav/side-nav-entry/side-nav-entry.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient })
  ],
  declarations: [AppComponent, DetailContentComponent, HomeContentComponent, SideNavComponent, SideNavEntryComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
