import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { LocationApiParam } from '../models/index.models';
import { AppLocation, AppGeoAddress, APlace } from '../models/common.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/**
 * Geo location service
 */
export class GeoLocationService {

  /**
   * Create instance of GeoLocationService
   * @param baseService 
   */
  constructor(private baseService: BaseService) { }

  /**
   * 
   * @param params 
   * @param mapKey 
   */
  getLocation(params: LocationApiParam, mapKey: string): Observable<AppLocation> {
    var locationString = '';
    if (params.address) locationString += params.address;
    if (params.city) locationString += ',' + params.city;
    if (params.state) locationString += ',' + params.state;
    if (params.postCode) locationString += ',' + params.postCode;
    if (params.country) locationString += ',' + params.country;
    if (params.latitude && params.latitude != 0) locationString += ',' + params.latitude;
    if (params.longitude && params.longitude != 0) locationString += ',' + params.longitude;

    var url = `https://dev.virtualearth.net/REST/v1/Locations?q=${encodeURIComponent(
      locationString
    )}&key=${mapKey}`;

    return this.baseService.jsonp(url).pipe(
      map((res: any) => {
        if (this.isLocationExist(res)) {
          var rr = res.resourceSets[0].resources[0];
          return new AppLocation(rr.point.coordinates[1], rr.point.coordinates[0]);
        }
      })
    );
  }

  getLocationByPlace(place: APlace, mapKey: string): Observable<AppLocation> {
    let params = new LocationApiParam();
    params.address = place.address;
    params.city = place.city;
    params.state = place.state;
    params.postCode = place.postcode;
    params.country = place.city;
    params.latitude = place.latitude;
    params.longitude = place.longitude;

    return this.getLocation(params, mapKey);
  }

  checkAddressValidation(location, mapKey) {
    let country = location.Country ? `countryRegion=${location.Country}&` : '';
    let state = location.State ? `adminDistrict=${location.State}&` : '';
    let postCode = location.PostCode ? `postalCode=${location.PostCode}&` : '';

    let url = `https://dev.virtualearth.net/REST/v1/Locations?${country}${state}${postCode}key=${mapKey}&callback=result_callback`;

    return this.baseService.jsonp(url);
  }

  getBoundary(location: string, locationType: string, mapKey: string) {
    let levelOfDetail = 0;
    let getAllPolygons = true; // false, for single polygon
    let getEntityMetadata = false; // true, if need metadata
    location = encodeURIComponent(location);
    let url = `https://platform.bing.com/geo/spatial/v1/public/Geodata?SpatialFilter=GetBoundary('${location}',${levelOfDetail},'${locationType}',${getAllPolygons},${getEntityMetadata})&$format=json&key=${mapKey}&callback=result_callback`;

    return this.baseService.jsonp(url);
  }

  getGeoToAddress(mapKey: string) {
    navigator.geolocation.getCurrentPosition(
      position => {
        var url = `https://dev.virtualearth.net/REST/v1/Locations/${position.coords.latitude},${position.coords.longitude}?o=json&key=${mapKey}`;
        return this.baseService.get(url, '')
      },
      error => console.log(error)
    );
  }

  getAddressFromLocation(mapKey: string, location: AppLocation) {
    var url = `https://dev.virtualearth.net/REST/v1/Locations/${location.latitude},${location.longitude}?o=json&key=${mapKey}`;

    return this.baseService.get(url, '');
  }

  // ..........   TO DO    ....................

  // getLocationFromAddress(mapKey: string, loc: string, street: string, city: string, country: string,postalCode:string): ng.IPromise<AppLocation> {
  //   var defer = this.baseService.q.defer<AppLocation>();
  //   var url = `https://dev.virtualearth.net/REST/v1/Locations?countryRegion=${country}&adminDistrict=${city}&locality=${street}&postalCode=${postalCode}&addressLine=${loc}&key=${mapKey}`;
  //   this.baseService.http
  //     .get(url)
  //     .then((response: any) => {
  //       const location = this.getLatLong(response);
  //       defer.resolve(location);
  //     })
  //     .catch(ex => defer.resolve(null));

  //   return defer.promise;
  // }
  // getCurrentLocation(): ng.IPromise<AppLocation> {
  //     var defer = this.baseService.q.defer<AppLocation>();
  //     if (!navigator.geolocation) defer.resolve(null);
  //     else {
  //         navigator.geolocation.getCurrentPosition(
  //             (position) => defer.resolve(new AppLocation(position.coords.longitude, position.coords.latitude)),
  //             (error) => defer.resolve(null));
  //     }

  //     return defer.promise;
  // }

  private isLocationExist(result: any): boolean {
    return (
      result.resourceSets &&
      result.resourceSets.length > 0 &&
      result.resourceSets[0].resources.length > 0 &&
      result.resourceSets[0].resources[0].point &&
      result.resourceSets[0].resources[0].point.coordinates &&
      result.resourceSets[0].resources[0].point.coordinates.length > 0
    );
  }
  getLatLong(result: any): any {
    return <AppLocation>(result.data.resourceSets[0].resources[0].point.coordinates);
  }

  private getAddress(result: any): AppGeoAddress {
    if (
      result.data &&
      result.data.resourceSets.length > 0 &&
      result.data.resourceSets[0].resources.length > 0
    ) {
      const results = <any[]>result.data.resourceSets[0].resources;
      let location = results.find(r => r.address.addressLine && r.confidence == 'High');
      if (!location) location = results.find(r => r.address.addressLine && r.confidence == 'Medium');
      if (!location) location = results.find(r => r.address.addressLine);
      if (!location) location = results[0];

      return new AppGeoAddress(location.address);
    } else return new AppGeoAddress(null);
  }
}
