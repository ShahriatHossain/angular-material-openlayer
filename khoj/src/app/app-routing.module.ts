import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvancedSearchComponent } from './map-dashboard/advanced-search/advanced-search/advanced-search.component';


const routes: Routes = [
  { path: '**', redirectTo: 'advanced-search' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
