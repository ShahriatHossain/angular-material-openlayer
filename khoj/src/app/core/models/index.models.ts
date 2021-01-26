import * as olGeom from 'ol/geom';

import { APlaceWithData } from './common.models';
import { ProximityType, SearchType, DrawingMode } from '../enums/index.enum';
import { AdvancedSearch } from './advanced-search.models';
import { OlHelperService } from '../services/ol-helper.service';

export class LocationApiParam {
    address: string;
    city: string;
    state: string;
    postCode: string;
    country: string;
    latitude: number;
    longitude: number;
}

export class PlaceSearchParam {
    search: AdvancedSearch;
    proximitySearchParam: ProximitySearchParam;
    quickText: string;
    isQuickSearch: boolean;

    constructor(
        search: AdvancedSearch,
        proximitySearchParam?: ProximitySearchParam,
        quickText?: string,
        isQuickSearch?: boolean
    ) {
        this.search = search;
        this.quickText = quickText;
        this.isQuickSearch = isQuickSearch;
        if (proximitySearchParam) this.proximitySearchParam = proximitySearchParam;
    }
}

export class ProximitySearchParam {
    basePlace: APlaceWithData;
    proximityType: ProximityType;
    proximity: number;
    searchType: SearchType;
    geometry: olGeom.Circle;

    constructor(place: APlaceWithData, search: AdvancedSearch) {
        this.basePlace = place;
        this.proximityType = Number(search.proximityType);
        this.proximity = Number(search.proximity);
        this.searchType = search.type;

        let center = OlHelperService.transformToOlCoordinate([this.basePlace.longitude, this.basePlace.latitude]);
        const radius = this.proximityType === ProximityType.Kilometers ? this.proximity * 1000 : this.proximity * 1609.344;
        this.geometry = OlHelperService.generateCircleGeometry(center, radius);
    }
}

export class GridShapeInfo {
    pinIconUrl: string;
    noRows: number;
    noColumns: number;
    cellType: number;
    prefixTitle: string;
    shapeType: DrawingMode;
    shapeCounter: number;

    constructor(
        pinIconUrl: string,
        noRows: number,
        noColumns: number,
        cellType: number,
        prefixTitle: string,
        shapeType: DrawingMode,
        shapeCounter: number) {

        this.pinIconUrl = pinIconUrl;
        this.noRows = noRows;
        this.noColumns = noColumns;
        this.cellType = cellType;
        this.prefixTitle = prefixTitle;
        this.shapeType = shapeType;
        this.shapeCounter = shapeCounter;
    }
}

export interface Region {
    city: string;
    state: string;
    postCode: string; 
    country: string;
}