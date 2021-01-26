import { Injectable } from '@angular/core';
import * as olStyle from 'ol/style';
import * as olProj from 'ol/proj';
import * as olExtent from 'ol/extent';
import * as olSource from 'ol/source';
import * as olColor from 'ol/color';
import Feature from 'ol/Feature';
import * as olGeom from 'ol/geom';
import * as olLayer from 'ol/layer';


import { BaseMapType, LayerKey, GeometryType, MapType } from '../enums/index.enum';
import { MapConfig, PlaceContainer, APlaceWithData, AppLocation } from '../models/common.models';
import { DrawingColor } from '../constants/index.constant';

@Injectable({
  providedIn: 'root'
})
export class OlHelperService {

  static transformToOlCoordinate(coordinates: [number, number]): [number, number] {
    return olProj.transform(coordinates, 'EPSG:4326', 'EPSG:3857');
  }

  static transformToGeoCoordinate(coordinates: [number, number]): [number, number] {
    return olProj.transform(coordinates, 'EPSG:3857', 'EPSG:4326');
  }

  static convertToOlCoordinate(location: AppLocation, isGeoCoordinate?: boolean): [number, number] {
    return isGeoCoordinate
      ? this.transformToOlCoordinate([location.longitude, location.latitude])
      : [location.longitude, location.latitude];
  }

  static transformExtentToOlCoordinate(
    extent: [number, number, number, number]
  ): [number, number, number, number] {
    return olProj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857');
  }

  static transformExtentToGeoCoordinate(
    extent: [number, number, number, number]
  ): [number, number, number, number] {
    return olProj.transformExtent(extent, 'EPSG:3857', 'EPSG:4326');
  }

  // static transformExtentFrom4269ToOlCoordinate(
  //   extent: [number, number, number, number]
  // ): [number, number, number, number] {
  //   return proj4('EPSG:4269', 'EPSG:3857', extent);
  // }
  //#endregion

  //#region Common Functionality
  static generatePointFeature(coordinate: [number, number]): Feature {
    return new Feature({
      geometry: this.pointGeometry(coordinate)
    });
  }

  static pointGeometry(coordinate: [number, number]): any {
    return new olGeom.Point(coordinate);
  }

  static getIconPushPinStyle(source: string): olStyle.Style {
    return new olStyle.Style({
      image: new olStyle.Icon({
        src: source
      })
    });
  }

  static getIconAndTextPushPinStyle(source: string): olStyle.Style {
    return new olStyle.Style({
      image: new olStyle.Icon({
        src: source
      }),
      text: new olStyle.Text({
        offsetY: -20,
        font: '16px Segoe UI',

        backgroundFill: new olStyle.Fill({
          color: '#FFFFFF'
        }),
        fill: new olStyle.Fill({
          color: '#3f48cc'
        })
      }),
      zIndex: 9
    });
  }

  static getColorPushPinStyle(color: string): olStyle.Style {
    return new olStyle.Style({
      image: new olStyle.Circle({
        radius: 7,
        fill: new olStyle.Fill({ color: color }),
        stroke: new olStyle.Stroke({
          color: 'white',
          width: 2
        })
      }),
      zIndex: 9
    });
  }

  static getColorAndTextPushPinStyle(color: string): olStyle.Style {
    return new olStyle.Style({
      image: new olStyle.Circle({
        radius: 7,
        fill: new olStyle.Fill({ color: color }),
        stroke: new olStyle.Stroke({
          color: 'white',
          width: 2
        })
      }),
      text: new olStyle.Text({
        offsetY: -20,
        font: '16px Segoe UI',
        backgroundFill: new olStyle.Fill({
          color: '#FFFFFF'
        }),
        fill: new olStyle.Fill({
          color: '#3f48cc'
        })
      }),
      zIndex : 9
    });
  }

  static generateVectorSource(features: Feature[]) {
    return new olSource.Vector({
      features: features
    });
  }

  static generateVectorLayer(vectorSource: olSource.Vector) {
    return new olLayer.Vector({
      source: vectorSource,
      zIndex: 9999
    });
  }

  static generateVectorLayerFromGeometry(geometry: olGeom.Geometry) {
    const feature = new Feature({
      geometry: geometry
    });
    const source = OlHelperService.generateVectorSource([feature]);
    return OlHelperService.generateVectorLayer(source);
  }

  static getGeometryFromLayer(layer: olLayer.Vector): olGeom.Geometry {
    if (!layer) return null;
    if (!layer.getSource()) return null;

    let features = layer.getSource().getFeatures();
    if (!features || features.length == 0) return null;

    return features[0].getGeometry();
  }
  //#endregion

  //#region Style
  static getFillColor(style: any): string {
    if (!style || typeof style.getFill !== 'function') return undefined;

    let fill = style.getFill();
    if (!fill) return undefined;

    let color = fill.getColor();
    return color ? olColor.asString(color) : undefined;
  }

  static getFillOpacity(style: any): number {
    if (!style || typeof style.getFill !== 'function') return undefined;

    let fill = style.getFill();
    if (!fill) return undefined;

    let color = fill.getColor();
    return color && color.length == 4 ? color[4] : undefined;
  }

  static getStrokeColor(style: any): string {
    if (!style || typeof style.getStroke !== 'function') return DrawingColor.STROKE_COLOR;

    let stroke = style.getStroke();
    if (!stroke) return DrawingColor.STROKE_COLOR;

    let color = stroke.getColor();
    return color ? olColor.asString(color) : DrawingColor.STROKE_COLOR;
  }

  static getStrokeOpacity(style: any): number {
    if (!style || typeof style.getStroke !== 'function') return undefined;

    let stroke = style.getStroke();
    if (!stroke) return undefined;

    let color = stroke.getColor();
    return color && color.length == 4 ? color[4] : undefined;
  }

  static getStrokeWidth(style: any): number {
    if (!style || typeof style.getStroke !== 'function') return 1;

    let stroke = style.getStroke();
    return stroke ? stroke.getWidth() : 1;
  }
  //#endregion

  static generateCircleGeometry(center: [number, number], radius: number) {
    return new olGeom.Circle(center, radius);
  }

  // static getSpookfishLayer(layerName: string): olLayer.Tile {
  //   var spookfishSource = new olSource.TileWMS({
  //     url: Spoofish_Url,
  //     params: {
  //       VERSION: '1.1.0',
  //       LAYERS: layerName,
  //       TILED: true,
  //       FORMAT: 'image/png'
  //     }
  //   });

  //   let layer = new olLayer.Tile({ source: spookfishSource });

  //   layer.set(LayerKey.LayerType, 'Spookfish');
  //   layer.set('Spookfish', layerName);

  //   return layer;
  // }

  //#region Something
  // static getPolygonAreaFromPoint(geometry: olGeom.Point) {
  //   let polygonArea = new PolygonArea();
  //   polygonArea.shapeType = DrawingMode.Pushpin;
  //   let coordinates = geometry.getCoordinates();
  //   let points = <AppLocation[]>[];
  //   points.push(new AppLocation(coordinates[0], coordinates[1]));
  //   polygonArea.locations = points;
  //   return polygonArea;
  // }

  // static getPolygonAreaFromCircle(geometry: olGeom.Circle) {
  //   let polygonArea = new PolygonArea();
  //   polygonArea.shapeType = DrawingMode.Circle;
  //   let center = geometry.getCenter();
  //   polygonArea.center = new AppLocation(center[0], center[1]); // TODO: check it
  //   polygonArea.radius = geometry.getRadius();
  //   return polygonArea;
  // }
  // static getPolygonAreaFromLineString(geometry: olGeom.LineString) {
  //   let polygonArea = new PolygonArea();
  //   polygonArea.shapeType = DrawingMode.Polyline;
  //   let coordinates = geometry.getCoordinates();
  //   let points = <AppLocation[]>[];
  //   for (let j = 0; j < coordinates.length; j++) {
  //     points.push(new AppLocation(coordinates[j][0], coordinates[j][1]));
  //   }
  //   polygonArea.locations = points;
  //   return polygonArea;
  // }

  // static addStyleToPolygonObject(polygon: PolygonArea, layer: olLayer.Vector) {
  //   let style = layer.getStyle();
  //   polygon.fillColor = OlHelper.getFillColor(style);
  //   polygon.fillOpacity = OlHelper.getFillOpacity(style);

  //   polygon.strokeColor = OlHelper.getStrokeColor(style);
  //   polygon.strokeOpacity = OlHelper.getStrokeOpacity(style);

  //   polygon.strokeWidth = OlHelper.getStrokeWidth(style);
  // }

  // static getPolygonAreaFromPolygon(geometry: olGeom.Polygon) {
  //   var polygonArea = new PolygonArea();
  //   polygonArea.shapeType = DrawingMode.Polygon;

  //   polygonArea.fillColor = DrawingColor.LIGHT_BLUE;
  //   polygonArea.strokeColor = DrawingColor.BLACK;
  //   polygonArea.strokeWidth;

  //   var coordinates = geometry.getCoordinates()[0];
  //   var points = <AppLocation[]>[];
  //   for (var j = 0; j < coordinates.length; j++) {
  //     points.push(new AppLocation(coordinates[j][0], coordinates[j][1]));
  //   }
  //   polygonArea.locations = points;
  //   return polygonArea;
  // }

  // static isPolygonInsideGeometry(polygon: PolygonArea, geometry: olGeom.Geometry): boolean {
  //   if (polygon.center) {
  //     if (geometry.intersectsCoordinate([polygon.center.Longitude, polygon.center.Latitude])) {
  //       return true;
  //     }
  //   } else if (polygon.locations && polygon.locations.length > 0) {
  //     for (let i = 0; i < polygon.locations.length; i++) {
  //       const location = polygon.locations[i];
  //       if (geometry.intersectsCoordinate([location.Longitude, location.Latitude])) return true;
  //     }
  //   }
  //   return false;
  // }

  static generateFeatureFromPlace(
    place: APlaceWithData,
    location: AppLocation,
    markerKey: string
  ): Feature {
    let feature = OlHelperService.generatePointFeature(OlHelperService.convertToOlCoordinate(location, true));
    feature.set(LayerKey.Name, place.title);
    feature.set(LayerKey.Metadata, place);
    feature.set(LayerKey.MarkerKey, markerKey);

    return feature;
  }

  static generateFeatureFromPlaceContainer(
    placeContainer: PlaceContainer,
    markerKey: string
  ): Feature[] {
    let features = <Feature[]>[];
    for (let i = 0; i < placeContainer.places.length; i++) {
      features.push(
        this.generateFeatureFromPlace(placeContainer.places[i], placeContainer.location, markerKey)
      );
    }
    return features;
  }

  static generateFeaturesFromPlaceContainers(
    placeContainers: PlaceContainer[],
    markerKey: string
  ): olSource.Vector {
    let sourceVector = new olSource.Vector();
    placeContainers.forEach(placeContainer =>
      sourceVector.addFeatures(this.generateFeatureFromPlaceContainer(placeContainer, markerKey))
    );
    return sourceVector;
  }

  // static generateFeatureForTrafficIncident(incident: TrafficIncidentModel): Feature {
  //   let feature = OlHelper.generatePointFeature(
  //     OlHelper.convertToOlCoordinate(incident.point, true)
  //   );
  //   feature.set(LayerKey.Name, incident.severity);
  //   feature.set(LayerKey.Metadata, incident);
  //   feature.set(LayerKey.MarkerKey, MarkerKeys.TRAFFIC_INCIDENT);

  //   return feature;
  // }

  static geometryFunction = (feature: Feature): olGeom.Point => {
    let geometry = feature.getGeometry();
    if (geometry instanceof olGeom.Point) return geometry;
    else if (geometry instanceof olGeom.Polygon) return geometry.getInteriorPoint();
    else if (geometry instanceof olGeom.Circle)
      return new olGeom.Point(geometry.getFirstCoordinate());
    else if (geometry instanceof olGeom.LineString)
      return new olGeom.Point(geometry.getLastCoordinate());
  };

  static isPushPinFeature(features: Feature[]) {
    for (let index = 0; index < features.length; index++) {
      if (features[index].getGeometry().getType() !== GeometryType.Point) {
        return false;
      }
    }
    return true;
  }

  static getStyleForCluster = (size: number): olStyle.Style => {
    let clusterStyle = (<any>window).styleCache[size];
    if (!clusterStyle) {
      clusterStyle = new olStyle.Style({
        image: OlHelperService.generateClusterImage(size),
        text: OlHelperService.generateClusterText(size),
        zIndex : 9
      });
      (<any>window).styleCache[size] = clusterStyle;
    }
    return clusterStyle;
  };

  static generateClusterImage = (size: number) => {
    return new olStyle.Circle({
      radius: OlHelperService.getClusterRadius(size),
      stroke: new olStyle.Stroke({
        color: OlHelperService.getStrokeFillColorForPlace(size),
        width: 7
      }),
      fill: new olStyle.Fill({
        color: OlHelperService.getFillColorForPlace(size)
      }),
      
    });
  };

  static generateClusterText(size: number): olStyle.Text {
    const self = this;
    return new olStyle.Text({
      text: size.toString(),
      fill: new olStyle.Fill({
        color: DrawingColor.WHITE
      })
    });
  }

  static getClusterTextColorByMapType(mapType: MapType) {
    let color = '';
    switch (mapType) {
      case MapType.Road:
        color = DrawingColor.WHITE;
        break;
      case MapType.Satellite:
        color = DrawingColor.BLACK;
        break;
    }

    return color;
  }

  static getClusterRadius(size: number): number {
    return (Math.log(size) / Math.log(10)) * 3 + 10;
  }

  static getStrokeFillColorForPlace(size: number): any {
    if (size < 10) return olColor.asArray([20, 180, 20, 0.5]); //Make the cluster green if there are less than 10 pushpins in it.
    if (size < 100) return olColor.asArray([255, 210, 40, 0.5]); //Make the cluster yellow if there are 10 to 99 pushpins in it.
    return olColor.asArray([255, 40, 40, 0.5]);
  }

  static getFillColorForPlace(size: number): any {
    if (size < 10) return olColor.asArray([20, 180, 20, 0.8]); //Make the cluster green if there are less than 10 pushpins in it.
    if (size < 100) return olColor.asArray([255, 210, 40, 0.8]); //Make the cluster yellow if there are 10 to 99 pushpins in it.
    return olColor.asArray([255, 40, 40, 0.8]);
  }

  //#region Circular Points Generation
  static getPointsInCircle(noOfPoints: number, centerPixel: [number, number]) {
    const radius = OlHelperService.getRadiusCircumference(noOfPoints);

    const points = <[number, number][]>[];
    for (let i = 0; i < noOfPoints; i++) {
      const point = OlHelperService.drawPoint(radius, i, noOfPoints);
      points[i] = [centerPixel[0] + point.x, centerPixel[1] + point.y];
    }

    return points;
  }

  private static getRadiusCircumference(noOfPoints: number): number {
    const twoPi = Math.PI * 2;
    return (25 * (10 + noOfPoints)) / twoPi;
  }

  private static drawPoint(radius: number, pointNo: number, noOfPoints: number) {
    const theta = (Math.PI * 2) / noOfPoints;
    const angle = theta * pointNo;

    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle)
    };
  }
  //#endregion

  // static getExtent(extent: IExtent): [number, number, number, number] {
  //   let ext: [number, number, number, number];
  //   if (extent && extent.spatialReference) {
  //     let wkid = extent.spatialReference.latestWkid
  //       ? extent.spatialReference.latestWkid
  //       : extent.spatialReference.wkid;

  //     ext = [extent.xmin, extent.ymin, extent.xmax, extent.ymax];
  //     if (wkid == 4326) ext = this.transformExtentToOlCoordinate(ext);
  //     //else if (wkid == 4269) ext = this.transformExtentFrom4269ToOlCoordinate(ext);
  //   }
  //   return ext;
  // }

  static getCenterOfExtent(extent: [number, number, number, number]) {
    const xy = olExtent.getCenter(extent);
    return olProj.toLonLat(xy, 'EPSG:3857');
  }

  static isValidBBox(extent: [number, number, number, number]): boolean {
    let isValid = true;
    extent.forEach(item => {
      if (!item) isValid = false;
    })

    return isValid;
  }

  static getRasterSource(mapConfig: MapConfig) {
    let rasterSource;
    switch (mapConfig.baseMapType) {
      case BaseMapType.Bing:
        rasterSource = new olSource.BingMaps({
          imagerySet: mapConfig.bingMapViewType ? mapConfig.bingMapViewType : 'Road',
          key: mapConfig.baseMapKey
        });
        break;
      case BaseMapType.AzureMaps:
        rasterSource = new olSource.XYZ({
          url:
            'https://atlas.microsoft.com/map/tile/png?api-version=1&layer=basic&style=main&tileSize=512&zoom={z}&x={x}&y={y}' +
            '&subscription-key=' +
            mapConfig.azureMapsKey,
          attributions:
            '© ' +
            new Date().getFullYear() +
            ' Microsoft, © 1992 - ' +
            new Date().getFullYear() +
            ' TomTom',
          tileSize: 512
        });
        break;
      case BaseMapType.OpenStreet:
        rasterSource = new olSource.OSM();
        break;
      case BaseMapType.ArcGIS:
        let arcGisRasterAttribution =
          'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
          'rest/services/World_Topo_Map/MapServer">ArcGIS</a>';
        rasterSource = new olSource.XYZ({
          attributions: [arcGisRasterAttribution],
          url:
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
        });
        break;
    }

    return rasterSource;
  }

  //TODO: Move into ol.Helper.ts
  static getRasterAerialSource(mapConfig: MapConfig) {
    let rasterAerialSource;
    rasterAerialSource = new olSource.BingMaps({
      imagerySet: 'AerialWithLabels',
      key: mapConfig.baseMapKey
    });

    switch (mapConfig.baseMapType) {
      case BaseMapType.Bing:
        break;
      case BaseMapType.AzureMaps:
        rasterAerialSource = new olSource.XYZ({
          url:
            'https://atlas.microsoft.com/map/imagery/png?api-version=1&style=satellite&tileSize=256&zoom={z}&x={x}&y={y}' +
            '&subscription-key=' +
            mapConfig.azureMapsKey,
          attributions:
            '© ' +
            new Date().getFullYear() +
            ' Microsoft, © ' +
            new Date().getFullYear() +
            ' DigitalGlobe',
          tileSize: 256
        });
        break;
      case BaseMapType.OpenStreet:
        // rasterAerialSource = new TileLayer({ source: new OSM()})
        break;
      //case BaseMapType.Carto:
        // let rasterAttribution = new ol.Attribution({html: 'CartoDB'});
        // rasterAerialSource = new olSource.XYZ({
        //     attributions: [rasterAttribution],
        //     url: 'https://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
        // });
        //break;
      case BaseMapType.ArcGIS:
        // let arcGISRasterAttribution = 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
        //                                 'rest/services/World_Topo_Map/MapServer">ArcGIS</a>';
        // rasterAerialSource = new olSource.XYZ({
        //     attributions: [arcGISRasterAttribution],
        //     url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
        // });
        break;
    }

    return rasterAerialSource;
  }
}
