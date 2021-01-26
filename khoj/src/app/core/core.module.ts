import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { MapContainerComponent } from './components/map-container/map-container.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    MapContainerComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MapContainerComponent
  ]
})
export class CoreModule { }
