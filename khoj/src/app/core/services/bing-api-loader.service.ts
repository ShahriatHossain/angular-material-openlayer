import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from './window.service';

@Injectable({
  providedIn: 'root'
})
export class BingApiLoaderService {
  private promise;
  private url = 'https://www.bing.com/api/maps/mapcontrol?key=Arp5Gp_Txsby9UoPMQX_PGRFzlgE-ba0itBI3Bev6lCSHLhNFoKtzyYNAxATZyMa&callback=__onBingLoaded&branch=release';

  constructor(@Inject(DOCUMENT) private _documentRef: Document, @Inject(WINDOW) private _windowRef: Window) {}

  public load() {
    // First time 'load' is called?
    if (!this.promise) {

        // Make promise to load
        this.promise = new Promise( resolve => {

            // Set callback for when bing maps is loaded.
            this._windowRef['__onBingLoaded'] = (ev) => {
                resolve('Bing Maps API loaded');
            };

            // const node = document.createElement('script');
            const node = this._documentRef.createElement('script');
            node.src = this.url;
            node.type = 'text/javascript';
            node.async = true;
            node.defer = true;
            // _documentRef.getElementsByTagName('head')[0].appendChild(node);
            this._documentRef.getElementsByTagName('head')[0].appendChild(node);
        });
    }

    // Always return promise. When 'load' is called many times, the promise is already resolved.
    return this.promise;
  }
}
