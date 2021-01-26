import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';


import { MapControllerComponent } from './components/map-controller/map-controller.component';
import { ViewSwitcherComponent } from './components/view-switcher/view-switcher.component';
import { ZoomControllerComponent } from './components/zoom-controller/zoom-controller.component';



@NgModule({
  declarations: [MapControllerComponent, ViewSwitcherComponent, ZoomControllerComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  exports: [
    MapControllerComponent
  ]
})
export class SharedModule { }
