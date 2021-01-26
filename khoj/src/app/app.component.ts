import { Component } from '@angular/core';

import { BingApiLoaderService } from './core/services/bing-api-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mapLoaded = false;
  title = 'khoj';

  constructor(private bingApiLoader: BingApiLoaderService) {
    this.bingApiLoader.load().then(() => {
      console.log('map loaded');
      this.mapLoaded = true;
    });
  }
}
