import { Component, OnInit } from '@angular/core';

import { MapType } from 'src/app/core/enums/index.enum';

import { OlApiService } from 'src/app/core/services/ol-api.service';
import { MatToolTipPosition } from 'src/app/core/constants/index.constant';

@Component({
  selector: 'view-switcher',
  templateUrl: './view-switcher.component.html',
  styleUrls: ['./view-switcher.component.scss']
})

/**
 * ViewSwitcher component
 */
export class ViewSwitcherComponent implements OnInit {
  viewType: any;
  defaultViewType: MapType;
  toolPosition: string = MatToolTipPosition.Above;

  /**
   * Create instance of ViewSwitcherComponent
   */
  constructor(private olApiService: OlApiService) { }

  /**
   * 
   */
  ngOnInit(): void {
    this.defaultViewType = MapType.Road;
    this.viewType = MapType;
  }

  /**
   * Switch map view
   * @param type 
   */
  switchView(type: MapType) {
    this.defaultViewType = type;
    this.olApiService.switchMapView(type);
  }

}
