import { BaseMapType, ProximityType, DrawingMode } from '../enums/index.enum';

/**
 * Master data configuration class
 */
export class MapConfig {
    baseMapType: BaseMapType;
    baseMapKey: string;
    sessionMapKey: string;
    displayPushpinLabel: string;
    defaultMapView: string;
    distanceType: ProximityType;
    azureMapsKey?: string;
    bingMapViewType: string;
    isDefaultQuery: boolean;
    AuthClientCode: string;
    isClassicPushPin: boolean;
    layerProxyUrl: string;
    numberOfRecords: number;
}

export class ValueTextPair<V, T>{
    public value: V;
    public text: T;

    constructor(val?: V, txt?: T) {
        if (val) this.value = val;
        if (txt) this.text = txt;
    }
}

export class AppLocation {
    constructor(lng?: number, lat?: number) {
        if (lng) this.longitude = Number(lng);
        if (lat) this.latitude = Number(lat);
    }
    longitude: number;
    latitude: number;
}

export interface Intersection {
    baseStreet: string;
    secondaryStreet1: string;
    intersectionType: string;
    secondaryStreet2: string;
    displayName: string;
}

export class BingAddress {
    addressLine: string;
    adminDistrict: string;
    adminDistrict2: string;
    countryRegion: string;
    formattedAddress: string;
    intersection: Intersection;
    locality: string;
    postalCode: string;
}

export class AppGeoAddress {
    country: string;
    state: string;
    city: string;
    postCode: string;
    formattedAddress: string;
    street1: string;
    street2: string;

    constructor(apiAddress?: BingAddress) {
        if (apiAddress) {
            this.street1 = apiAddress.addressLine;
            this.city = apiAddress.locality;
            this.state = apiAddress.adminDistrict;
            this.postCode = apiAddress.postalCode;
            this.country = apiAddress.countryRegion;
            this.formattedAddress = apiAddress.formattedAddress;
            if (apiAddress.intersection) {
                this.street2 = apiAddress.intersection.secondaryStreet1;
            }
        }
    }
}

export class APlace extends AppLocation {
    address: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
}

export class APlaceWithData extends APlace {
    entityName: string;
    entityDisplayName: string;
    title: string;
    color: string;
    entityId: string;
    email: string;
    phone: string;
    icon: string;
    territoryId: string;
    location: string;
    //Data Tab
    distance: number;
}

export class PlaceContainer {
    places: APlaceWithData[];
    location: AppLocation;
    constructor(place: APlaceWithData) {
        this.places = <APlaceWithData[]>[];
        this.places.push(place);
        this.location = new AppLocation(place.longitude, place.latitude);
    }
}

export class Configuration {
    id: number;
    key: string;
    value: string;
}

export class PolygonArea {
    constructor(locations?: Array<AppLocation>, fillColor?: string, strokeColor?: string, center?: AppLocation, radius?: number, id?: number, markerKey?: string) {
        this.locations = locations ? locations : [];
        if (fillColor) this.fillColor = fillColor;
        if (strokeColor) this.strokeColor = strokeColor;
        if (center) this.center = new AppLocation(center.longitude, center.latitude);
        if (radius) this.radius = radius;
        if (id) this.id = id;
        if (markerKey) this.markerKey = markerKey;
    }
    shapeType: DrawingMode;
    locations: Array<AppLocation>;
    center: AppLocation;
    radius: number;
    markerKey: string;

    id: number;
    annotationId: string;

    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
    fillOpacity: number;
    strokeOpacity: number;
}

