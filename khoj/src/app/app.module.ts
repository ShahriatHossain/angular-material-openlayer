import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppRoutingModule } from './app-routing.module';
import { MapDashboardModule } from './map-dashboard/map-dashboard.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';

import { SiteConditionsService } from './core/services/site-conditions.service';
import { WINDOW_PROVIDERS } from './core/services/window.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    MapDashboardModule,
    AppRoutingModule,
    ColorPickerModule,
    ToastrModule.forRoot(), 
    CoreModule
  ],
  providers: [SiteConditionsService, WINDOW_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
