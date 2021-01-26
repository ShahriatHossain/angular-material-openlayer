import 'bingmaps';

import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { filter, take } from 'rxjs/operators';

import { SiteConditionsService } from '../../services/site-conditions.service';
import { OlApiService } from '../../services/ol-api.service';

@Component({
  selector: 'map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnChanges, AfterViewInit {

  get center() {
    return this.service.center$;
  }

  streetsideMap: Microsoft.Maps.Map;

  position: Microsoft.Maps.Location;

  log: string[] = [];

  constructor(private service: SiteConditionsService, private olApiService: OlApiService) {
    this.log.push('Constructor');
  }

  ngOnChanges() {
    this.log.push('OnChanges');
  }

  ngAfterViewInit() {
    this.log.push('AfterViewInit');
    this.createStreetSideMap();
    this.service.center$.pipe(
      filter(coords => !!coords),
      take(1)
    ).subscribe(coords => {
      const [lat, lon] = coords;
      this.log.push(`Got coords from service: ${coords}`);
      const position = new Microsoft.Maps.Location(lat, lon);
      this.streetsideMap.setView({ center: position });
      this.log.push(`current Center: ${this.streetsideMap.getCenter()}`);
    });
  }

  createStreetSideMap() {
    this.streetsideMap = new Microsoft.Maps.Map(
      document.getElementById('bMap'),
      {
        zoom: 12
      }
    );

    this.olApiService.loadMap();
  }

  hasLogEntries() {
    return this.log.length > 0;
  }
}
