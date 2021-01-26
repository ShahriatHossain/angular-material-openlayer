import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdvancedSearchComponent } from './advanced-search/advanced-search/advanced-search.component';
import { AnnotationComponent } from './annotation/annotation.component';
import { LayerComponent } from './layer/layer.component';
import { JourneyPlannerComponent } from './journey-planner/journey-planner.component';
import { AppointmentComponent } from './appointment/appointment.component';

const routes: Routes = [
  {
    path: 'advanced-search',
    component: AdvancedSearchComponent,
    data: { title: 'advanced-search' }
  },
  {
    path: 'annotation',
    component: AnnotationComponent,
    data: { title: 'annotation' }
  },
  {
    path: 'layer',
    component: LayerComponent,
    data: { title: 'layer' }
  },
  {
    path: 'journey-planner',
    component: JourneyPlannerComponent,
    data: { title: 'journey-planner' }
  },
  {
    path: 'appointment',
    component: AppointmentComponent,
    data: { title: 'appointment' }
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MapDashboardRoutingModule { }
