import { Injectable } from '@angular/core';
import * as olProj from 'ol/proj';
import * as olExtent from 'ol/extent';

import { AdvancedSearch, Datasource, Category } from 'src/app/core/models/advanced-search.models';
import { SearchType } from 'src/app/core/enums/index.enum';
import { APlaceWithData, AppLocation } from 'src/app/core/models/common.models';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { ConfigurationService } from 'src/app/core/services/configuration.service';
import { AppUtils } from 'src/app/core/utils/app.utils';
import { ConfigurationKeys } from 'src/app/core/constants/index.constant';
import { MessageTitle, ErrorMessage } from 'src/app/core/constants/message.constant';
import { NotifyService } from 'src/app/core/services/notify.service';
import { ProximitySearchParam, PlaceSearchParam, Region } from 'src/app/core/models/index.models';
import { DataSourceService } from './data-source.service';
import { BaseService } from 'src/app/core/services/base.service';
import { map } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { OlApiService } from 'src/app/core/services/ol-api.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Search Helper
 */
export class SearchHelperService {
  private baseLocation: APlaceWithData = new APlaceWithData();
  private searchRecords: APlaceWithData[] = <APlaceWithData[]>[];
  private search: AdvancedSearch = new AdvancedSearch();
  private dataSources: Datasource[] = <Datasource[]>[];

  /**
   * Create instance of Search Helper
   * @param geoLocService 
   * @param configService 
   */
  constructor(
    private geoLocService: GeoLocationService,
    private configService: ConfigurationService,
    private notifyService: NotifyService,
    private dataSourceService: DataSourceService,
    private baseService: BaseService,
    private olApiService: OlApiService
  ) {
    this.configService.getAll();
    this.dataSourceService.getAll().subscribe(data => this.dataSources = data);
  }

  /**
   * Process search for search types
   * like address, region etc.
   * @param search 
   */
  processSearch(search: AdvancedSearch) {
    this.search = search;
    switch (search.type) {
      case SearchType.SearchByAddress:
        this.searchByAddress();
        break;
      case SearchType.SearchByRegion:
        this.searchByRegion();
        break;
      case SearchType.SearchByTerritory:
        if (!this.validateTerritory() || !this.validateDatasource()) return;
        this.searchByTerritoryOrDraw();
        break;
      case SearchType.DrawAndSearch:
        if (!this.validateDrawSearch() || !this.validateDatasource()) return;
        this.searchByTerritoryOrDraw();
        break;
    }
  }

  /**
   * Process search for address
   */
  searchByAddress() {
    if (!this.validateAddress() || !this.validateDatasource()) return;

    this.olApiService.resetMap();

    this.baseLocation.address = this.search.address;
    const baseMapKey = AppUtils.getValueByKey(this.configService.configurations, ConfigurationKeys.BASE_MAP_KEY);

    this.geoLocService.getLocationByPlace(this.baseLocation, baseMapKey)
      .subscribe((location: AppLocation) => {
        this.baseLocation.latitude = location.latitude;
        this.baseLocation.longitude = location.longitude;
        const proximitySearchParam = new ProximitySearchParam(this.baseLocation, this.search);
        const placeSearchParam = new PlaceSearchParam(this.search, proximitySearchParam);

        const boundingBox = [];
        boundingBox.push(olExtent.applyTransform(proximitySearchParam.geometry.getExtent(), olProj.getTransform('EPSG:3857', 'EPSG:4326')));

        this.getPlaces(placeSearchParam, boundingBox).subscribe((places: any[]) => {
          this.searchRecords = <APlaceWithData[]>places[0];
          this.olApiService.showPlaces(this.searchRecords);
        })
      });
  }

  /**
   * Search by region
   */
  searchByRegion() {
    if (!this.validateRegion() || !this.validateDatasource()) return;
    this.olApiService.resetMap();

    const regionObj = this.populateRegion();
    const baseMapKey = AppUtils.getValueByKey(this.configService.configurations, ConfigurationKeys.BASE_MAP_KEY);
    const region = AppUtils.generateRegion(regionObj);
    const regionType = AppUtils.getRegionType(regionObj);

    this.geoLocService.getBoundary(region, regionType, baseMapKey)
      .subscribe((res: any) => {
        const boundingBox = [];
        boundingBox.push(this.olApiService.renderBoundary(res, true));
        const placeSearchParam = new PlaceSearchParam(this.search);

        this.getPlaces(placeSearchParam, boundingBox).subscribe((places: any[]) => {
          this.searchRecords = <APlaceWithData[]>places[0];
          this.olApiService.showPlaces(this.searchRecords);
        })
      })
  }

  /**
   * Search by territory or draw
   */
  searchByTerritoryOrDraw() {
    this.olApiService.resetMap();

    const placeSearchParam = new PlaceSearchParam(this.search)
    let boundingBox = [];
    let shapes = this.olApiService.getShapesForSearch();
    shapes.forEach(p => {
      boundingBox.push(olExtent.applyTransform(p.getSource().getExtent(), olProj.getTransform('EPSG:3857', 'EPSG:4326')));
    });

    this.getPlaces(placeSearchParam, boundingBox).subscribe((places: any[]) => {
      this.searchRecords = <APlaceWithData[]>places[0];
      this.olApiService.showPlaces(this.searchRecords);
    })
  }

  /**
   * Populate region
   */
  private populateRegion() {
    return <Region>{
      city: this.search.city,
      state: this.search.state,
      postCode: this.search.postCode,
      country: this.search.country
    };
  }

  /**
   * Validate input for search by address
   */
  private validateAddress() {
    let valid = true;
    let title = '';
    let msg = '';

    switch (true) {
      case !this.search.address:
        valid = false;
        title = MessageTitle.Address;
        msg = ErrorMessage.InvalidAddress;
        break;
      case !this.search.proximity:
        valid = false;
        title = MessageTitle.Distance;
        msg = ErrorMessage.InvalidDistance;
        break;
      case !this.search.proximityType:
        valid = false;
        title = MessageTitle.ProximityType;
        msg = ErrorMessage.InvalidProximityType;
        break;
    }

    if (!valid)
      this.notifyService.showError(msg, title);

    return valid;
  }

  /**
   * Validate input for search by region
   */
  private validateRegion() {
    let valid = true;
    let title = '';
    let msg = '';

    switch (true) {
      case !this.search.country:
        valid = false;
        title = MessageTitle.Country;
        msg = ErrorMessage.InValidCountry;
        break;
    }

    if (!valid)
      this.notifyService.showError(msg, title);

    return valid;
  }

  /**
   * Validate input for search by territory
   */
  private validateTerritory() {
    let valid = true;
    let title = '';
    let msg = '';

    switch (true) {
      case !this.search.territory:
        valid = false;
        title = MessageTitle.Territory;
        msg = ErrorMessage.InValidTerritory;
        break;
    }

    if (!valid)
      this.notifyService.showError(msg, title);

    return valid;
  }

  /**
   * Validate draw shape for search
   */
  private validateDrawSearch() {
    let valid = true;
    let title = '';
    let msg = '';

    switch (true) {
      case !this.olApiService.isSearchShapeDrawn():
        valid = false;
        title = MessageTitle.DrawShape;
        msg = ErrorMessage.InValidDrawShape;
        break;
    }

    if (!valid)
      this.notifyService.showError(msg, title);

    return valid;
  }

  /**
   * Validate empty datasource
   */
  private validateDatasource() {
    let valid = true;
    this.search.categories.forEach(cat => {
      if (!cat.datasourceId) {
        valid = false;
      }
    })

    const msg = ErrorMessage.InValidCategoryType;
    const title = MessageTitle.CategoryType;

    if (!valid)
      this.notifyService.showError(msg, title);

    return valid;
  }

  /**
   * Get places by search types
   * @param placeSearchParam 
   * @param boundingBox 
   * @param territoryId 
   */
  private getPlaces(placeSearchParam: PlaceSearchParam, boundingBox: any[], territoryId: string = ''): Observable<any[]> {
    let categories = placeSearchParam.search.categories;
    const url = '';
    let promise = [];

    categories.forEach(cat => {
      const dataSource = this.dataSources.find(ds => ds.id === Number(cat.datasourceId));

      promise.push(
        this.baseService.get(url, `${dataSource.name}.json`).pipe(
          map((res: any[]) => {
            return res.map(d => this.getMappedData(d, dataSource, cat))
          })
        )
      )
    })

    return forkJoin(promise);
  }

  /**
   * Map table data with object
   * @param data 
   * @param ds 
   * @param category 
   */
  private getMappedData(data: any, ds: Datasource, category: Category) {
    let place = new APlaceWithData();

    place.title = data[ds.title];
    place.entityName = ds.name;
    place.email = data[ds.email];
    place.phone = data[ds.phone];
    place.city = data[ds.city];
    place.state = data[ds.state];
    place.country = data[ds.country];
    place.address = data[ds.addressComposite];
    place.postcode = data[ds.postCode];
    place.latitude = data[ds.latitude];
    place.longitude = data[ds.longitude];
    place.color = category.color;
    place.icon = category.icon.documentBody;

    return place;
  }
}
