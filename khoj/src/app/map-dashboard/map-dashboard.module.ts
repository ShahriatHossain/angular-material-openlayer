import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationModule } from './navigation/navigation.module';
import { AdvancedSearchModule } from './advanced-search/advanced-search.module';
import { MapDashboardRoutingModule } from './map-dashboard-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AnnotationComponent } from './annotation/annotation.component';
import { LayerComponent } from './layer/layer.component';
import { JourneyPlannerComponent } from './journey-planner/journey-planner.component';
import { AppointmentComponent } from './appointment/appointment.component';

@NgModule({
  declarations: [DashboardComponent, AnnotationComponent, LayerComponent, JourneyPlannerComponent, AppointmentComponent],
  imports: [
    CommonModule,
    AdvancedSearchModule,
    MapDashboardRoutingModule,
    NavigationModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class MapDashboardModule { }
