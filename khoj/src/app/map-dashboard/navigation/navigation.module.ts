import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { QuickSearchComponent } from './quick-search/quick-search.component';

import { NavigationRoutingModule } from './navigation-routing.module';

@NgModule({
  declarations: [TopNavigationComponent, QuickSearchComponent],
  imports: [
    CommonModule,
    NavigationRoutingModule
  ],
  exports: [
    TopNavigationComponent
  ]
})
export class NavigationModule { }
