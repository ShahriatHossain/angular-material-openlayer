import { Injectable } from '@angular/core';

import olMap from 'ol/Map';
import olView from 'ol/View';
import * as olLayer from 'ol/layer';
import * as olControl from 'ol/control';
import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import * as olStyle from 'ol/style';
import * as olExtent from 'ol/extent';
import * as olSource from 'ol/source';
import * as olGeom from 'ol/geom';
import * as olProj from 'ol/proj';
import * as olInteraction from 'ol/interaction';
import * as olCoordinate from 'ol/coordinate';

import { ZoomValues, DEFAULT_COORDINATE, MarkerKeys, LayerTypes, DrawingColor } from '../constants/index.constant';
import { OlHelperService } from './ol-helper.service';
import { MapConfig, APlaceWithData, PlaceContainer, AppLocation } from '../models/common.models';
import { OlDrawingUtils } from '../utils/ol.drawing.utils';
import { LayerKey, MapType, DrawingMode, ProximityType } from '../enums/index.enum';
import { BoundaryUtils } from '../utils/boundary.utils';

@Injectable({
  providedIn: 'root'
})
export class OlApiService {
  private olMap: olMap;
  private olView: olView;
  private raster: olLayer.Tile;
  private rasterAerial: olLayer.Tile;
  private clusterSource: olSource.Cluster;
  private olDrawingUtils: OlDrawingUtils;
  private selectedMapViewType: MapType;
  private isErase: boolean;

  constructor() { }

  public loadMap(mapConfig?: MapConfig) {

    mapConfig = <MapConfig>{
      baseMapType: "Bing",
      baseMapKey: "Arp5Gp_Txsby9UoPMQX_PGRFzlgE-ba0itBI3Bev6lCSHLhNFoKtzyYNAxATZyMa",
      displayPushpinLabel: "NO",
      defaultMapView: "1",
      distanceType: 1,
      azureMapsKey: undefined,
      bingMapViewType: "canvasLight",
      isDefaultQuery: true,
      isClassicPushPin: true,
      AuthClientCode: "ad6ff1f3-6c41-4f00-8cff-316851a8fb92",
      layerProxyUrl: "https://cors-anywhere.herokuapp.com/",
      numberOfRecords: 100000,
    }

    let rasterSource = OlHelperService.getRasterSource(mapConfig);
    //TODO: SHow default Attribution - Hide OpenLayer Icon
    this.raster = new olLayer.Tile({
      source: rasterSource
    });

    let rasterAerialSource = OlHelperService.getRasterAerialSource(mapConfig);
    this.rasterAerial = new olLayer.Tile({
      source: rasterAerialSource
    });

    this.olView = new olView({
      zoom: ZoomValues.DEFAULT_MAP_CENTER_LOCATION,
      minZoom: ZoomValues.DEFAULT_MIN,
      maxZoom: ZoomValues.DEFAULT_MAX,
      center: [DEFAULT_COORDINATE[0], DEFAULT_COORDINATE[1]],
      enableRotation: false
    });

    this.olMap = new olMap({
      layers: [this.rasterAerial, this.raster],
      loadTilesWhileInteracting: true,
      target: document.getElementById('olMap'),
      view: this.olView,
      controls: olControl.defaults({
        attribution: true,
        zoom: false
      })
    });

    this.olDrawingUtils = new OlDrawingUtils(this.olMap);

    //geoloc
    var geolocation = new Geolocation({ trackingOptions: { enableHighAccuracy: true }, projection: this.olView.getProjection() });
    var positionFeature = new Feature();
    positionFeature.setStyle(new olStyle.Style({ image: new olStyle.Circle({ radius: 6, fill: new olStyle.Fill({ color: '#3399CC' }), stroke: new olStyle.Stroke({ color: '#fff', width: 2 }) }) }));

    new olLayer.Vector({ map: this.olMap, source: new olSource.Vector({ features: [positionFeature] }) });
    geolocation.on('change:position', () => {
      var coordinates = geolocation.getPosition();
      positionFeature.setGeometry(coordinates ? new olGeom.Point(coordinates) : null);
      if (coordinates) { this.olView.animate({ center: coordinates, zoom: 10 }); }
    });
    geolocation.setTracking(true);

    this.controlZoomInOut();

    this.onMapClick();
  }

  /**
   * Zoom in/out control
   */
  private controlZoomInOut() {
    const zoomInMaptaskrMap = document.getElementById('zoomInBtn');
    if (zoomInMaptaskrMap != null) {
      zoomInMaptaskrMap.onclick = () => {
        const z = this.olMap.getView().getZoom() + 1;
        this.olMap.getView().animate({ zoom: z });
      };
    }

    const zoomOutMaptaskrMap = document.getElementById('zoomOutBtn');
    if (zoomOutMaptaskrMap != null) {
      zoomOutMaptaskrMap.onclick = () => {
        const z = this.olMap.getView().getZoom() - 1;
        this.olMap.getView().animate({ zoom: z });
      };
    }
  }

  private onMapClick() {
    this.olMap.on('singleclick', e => {
      var evt = e;
      this.onMapClickHandler(evt);
    });
  }

  private onMapClickHandler(evt) {
    var layers = [];
    var features = [];
    evt.target.forEachFeatureAtPixel(
      evt.pixel,
      function (feature, layer) {
        if (layer) {
          features.push(feature);
          layers.push(layer);
        }
      },
      {
        hitTolerance: 5
      }
    );

    layers.map((layer, idx) => {
      switch (layer.get(LayerKey.MarkerKey)) {
        case MarkerKeys.DRAWING_SHAPE:
          if (this.isErase) {
            this.removeAnnotationPushPin(layer, features[idx]);
          }
      }
    });
  }

  private removeAnnotationPushPin(layer: olLayer.Vector, feature: Feature): string | undefined {
    if (!layer) return;

    this.removeMeasurement(layer);

    this.deleteLayers([layer]);

    return layer.get(LayerKey.MarkerId);
  }

  private deleteLayers(layers: any[]) {
    layers.forEach(layer => {
      if (layer instanceof olLayer.Vector && layer.getSource()) {
        layer.getSource().clear();
      }

      this.olMap.removeLayer(layer);
    });
  }

  private removeMeasurement(layer: olLayer.Vector): void {
    let markerId = layer.get(LayerKey.MarkerId);
    if (!markerId) return;

    let elms = document.querySelectorAll("[id='" + markerId + "']");
    for (var i = 0; i < elms.length; i++) {
      if ((<HTMLElement>elms[i]).innerText) {
        elms[i].parentNode.removeChild(elms[i]);
      }
    }
  }

  public suggestLocation(suggestionResult) {
    var location = olProj.fromLonLat([suggestionResult.location.longitude, suggestionResult.location.latitude]);
    this.olMap.getView().animate({ center: location, duration: 2000, zoom: 15 });
  }

  showPlaces(places: APlaceWithData[]) {
    if (!places || places.length == 0) return;

    let placeContainers = <PlaceContainer[]>[];
    let features = <Feature[]>[];

    places.forEach(place => {
      if (place.longitude && place.latitude) {
        this.updatePlaceContainers(placeContainers, place);
      }
    })

    if (features.length > 0 || placeContainers.length > 0) {
      const markerKey = MarkerKeys.PUSH_PIN;
      var vectorSource = OlHelperService.generateFeaturesFromPlaceContainers(placeContainers, markerKey);
      if (features.length > 0) vectorSource.addFeatures(features);

      var distance = '20';
      this.clusterSource = new olSource.Cluster({
        distance: distance,
        source: vectorSource,
        geometryFunction: OlHelperService.geometryFunction
      });

      var vectorLayer = new olLayer.Vector({
        renderMode: 'image',
        source: this.clusterSource,
        style: this.styleFunction,
        zIndex: 9999
      });

      vectorLayer.set(LayerKey.MarkerKey, MarkerKeys.PUSH_PIN);

      vectorLayer.set(LayerKey.LayerType, LayerTypes.CLUSTER);
      this.olMap.addLayer(vectorLayer);

      var getExtent = vectorSource.getExtent();
      this.olMap.getView().fit(getExtent, { duration: 2000 });
    }
  }

  private updatePlaceContainers(placeContainers: PlaceContainer[], place: APlaceWithData) {
    let location = new AppLocation(place.longitude, place.latitude);

    let existingPlace = placeContainers.find(
      l => l.location.latitude == location.latitude && l.location.longitude == location.longitude
    );

    if (existingPlace) existingPlace.places.push(place);
    else placeContainers.push(new PlaceContainer(place));
  }

  private styleFunction = (feature, resolution) => {
    if (!feature || !resolution) return;

    const features = <Feature[]>feature.get('features');
    if (features.length == 0) return;

    if (features.length < 2) {
      if (!OlHelperService.isPushPinFeature(features)) return this.clusterPolygonStyle(features);

      if (resolution <= 0.8) this.visibleConnectedLayer(features[0]);
      return this.getPushPinStyle(features[0]);
    }

    if (resolution > 0.8) {
      this.hideConnectedLine(features);
      return OlHelperService.getStyleForCluster(features.length);
    }

    if (OlHelperService.isPushPinFeature(features)) {
      if (this.isSamePoints(features)) this.displayOverlapping(features);
      else return OlHelperService.getStyleForCluster(features.length);
    } else return this.clusterPolygonStyle(features);
  };

  private clusterPolygonStyle = (features: Feature[]) => {
    let self = this;
    let polygonStyle = this.olDrawingUtils.getPolygonStyleFromFeature(features[0]); // features[0].getStyle(); //self.OLDrawingToolManager.getDefaultPolygonStyle();
    polygonStyle.setGeometry(features[0].getGeometry());
    return polygonStyle;
  };

  private visibleConnectedLayer(feature: Feature) {
    const point = <string>feature.get(LayerKey.OriginalPoint);
    this.olMap.getLayers().forEach(layer => {
      if (!(layer instanceof olLayer.Vector)) return;

      if (layer.get(LayerKey.MarkerKey) !== MarkerKeys.CONNECTED_LINE) return;

      if (layer.get(LayerKey.OriginalPoint) === point) {
        layer.setVisible(true);
      }
    });
  }

  private hideConnectedLine(features: Feature[]) {
    const points = this.getFeaturePoints(features);
    this.olMap.getLayers().forEach(layer => {
      if (!(layer instanceof olLayer.Vector)) return;

      if (layer.get(LayerKey.MarkerKey) !== MarkerKeys.CONNECTED_LINE) return;

      if (this.isOverlappingLayer(layer, points)) {
        layer.setVisible(false);
      }
    });
  }

  private getPushPinStyle = (feature: any) => {
    let self = this;


    return OlHelperService.getIconPushPinStyle(self.getIconForSinglePlace(feature));

    return OlHelperService.getColorPushPinStyle(self.getPushPinColor(feature));
  };

  private getIconForSinglePlace(feature: any) {
    return feature.get(LayerKey.Metadata).icon;
  }

  private getPushPinColor(feature: any): string {
    return feature.get(LayerKey.Metadata).icon;
  }

  private isSamePoints(features: Feature[]): boolean {
    const fp = (<olGeom.Point>features[0].getGeometry()).getCoordinates();
    for (let i = 1; i < features.length; i++) {
      const point = (<olGeom.Point>features[i].getGeometry()).getCoordinates();
      if ((((point[0] >= fp[0]) ? point[0] - fp[0] : fp[0] - point[0]) > 15) || (((point[1] >= fp[1]) ? point[1] > fp[1] : fp[1] - point[1]) > 15)) return false;
    }
    return true;
  }

  private getFeaturePoints(features: Feature[]): string[] {
    const points = <string[]>[];
    for (let i = 0; i < features.length; i++) {
      const point = <string>features[i].get(LayerKey.OriginalPoint);
      points.push(point);
    }
    return points;
  }

  private isOverlappingLayer(layer: olLayer.Vector, points: string[]) {
    const originalPoint = <string>layer.get(LayerKey.OriginalPoint);
    for (let i = 0; i < points.length; i++) {
      if (points[i] === originalPoint) return true;
    }
    return false;
  }

  private displayOverlapping = (features: Feature[]) => {
    if (!features || features.length === 0) return;

    const originalCoordinate = (<olGeom.Point>features[0].getGeometry()).getCoordinates();
    const points = OlHelperService.getPointsInCircle(features.length, originalCoordinate);
    const pointStr = `${originalCoordinate[0]}_${originalCoordinate[1]}`;

    const multiLineString = new olGeom.MultiLineString([]);
    features.forEach((feature, index) => {
      feature.setGeometry(OlHelperService.pointGeometry(points[index]));
      feature.set(LayerKey.OriginalPoint, pointStr);
      multiLineString.appendLineString(new olGeom.LineString([originalCoordinate, points[index]]));
    });

    this.addOverlappingLayers(multiLineString, originalCoordinate);
  };

  private addOverlappingLayers(geometry: olGeom.MultiLineString, coordinate: [number, number]) {
    const pointStr = `${coordinate[0]}_${coordinate[1]}`;
    const layer = this.generateConnectedLayer(geometry, pointStr);

    layer.setZIndex(0);
    this.olMap.addLayer(layer);

    const circleLayer = this.generateConnectedPoint(coordinate, pointStr);
    layer.setZIndex(1);
    this.olMap.addLayer(circleLayer);
  }

  private generateConnectedLayer(geometry: olGeom.MultiLineString, pointStr: string) {
    const layer = OlHelperService.generateVectorLayerFromGeometry(geometry);
    layer.set(LayerKey.MarkerKey, MarkerKeys.CONNECTED_LINE);
    layer.set(LayerKey.OriginalPoint, pointStr);
    return layer;
  }

  private generateConnectedPoint(coordinate: [number, number], pointStr: string) {
    const circleGeometry = OlHelperService.pointGeometry(coordinate);
    const layer = OlHelperService.generateVectorLayerFromGeometry(circleGeometry);
    layer.set(LayerKey.MarkerKey, MarkerKeys.CONNECTED_LINE);
    layer.set(LayerKey.OriginalPoint, pointStr);
    layer.setStyle(this.connectedPointStyle());
    return layer;
  }

  private connectedPointStyle() {
    return new olStyle.Style({
      image: new olStyle.Circle({
        radius: 6,
        fill: new olStyle.Fill({ color: DrawingColor.BLUE }),
        stroke: new olStyle.Stroke({ color: DrawingColor.BLUE })
      }),
      zIndex: 4
    });
  }

  switchMapView(mapType: MapType) {
    switch (mapType) {
      case MapType.Road:
        this.selectedMapViewType = MapType.Road;
        this.raster.setVisible(true);
        this.rasterAerial.setVisible(false);
        this.olView.setMaxZoom(ZoomValues.DEFAULT_MAX);
        break;
      case MapType.Satellite:
        this.selectedMapViewType = MapType.Satellite;
        this.raster.setVisible(false);
        this.rasterAerial.setVisible(true);
        const zoomLevel = ZoomValues.DEFAULT_MAX;
        this.olView.setMaxZoom(zoomLevel);
        break;
    }
  }

  public resetMap() {
    if (this.olMap) {
      this.olMap.getLayers().forEach((layer: olLayer) => {
        if (layer instanceof olLayer.Vector && layer.getSource()) {
          layer.getSource().clear();
          this.olMap.removeLayer(layer);
        }
      });
    }
  }


  renderBoundary(result: any, setView?: boolean) {
    var polygonArray = BoundaryUtils.getPolygonsFromBoundary(result);
    var features = BoundaryUtils.generateFeaturesForBoundary(polygonArray);

    var vectorSource = OlHelperService.generateVectorSource(features);
    let layer = BoundaryUtils.generateBoundaryLayer(vectorSource);

    this.olMap.addLayer(layer);
    if (setView) {
      this.redirectToCountryLocation(vectorSource, result.d.results[0].Name.EntityName)
    }
    return olExtent.applyTransform(
      vectorSource.getExtent(),
      olProj.getTransform('EPSG:3857', 'EPSG:4326')
    );
  }

  private redirectToCountryLocation(vectorSource, country: string) {
    var location: olCoordinate;

    switch (country) {
      case "United States":
        location = olProj.fromLonLat([-96.4247, 31.51073]);
        this.olView.animate({ center: location, duration: 2000, zoom: 2 });
        break;
      case "New Zealand":
        location = olProj.fromLonLat([174.885971, -40.900558]);
        this.olView.animate({ center: location, duration: 2000, zoom: 5 });
        break;
      case "Fiji":
        var location = olProj.fromLonLat([178.441895, -18.141600]);
        this.olView.animate({ center: location, duration: 2000, zoom: 7 });
        break;
      case "Russian":
        location = olProj.fromLonLat([105.318756, 61.524010]);
        this.olView.animate({ center: location, duration: 2000, zoom: 2 });
        break;
      case "Saint Helena, Ascension and Tristan da Cunha":
        location = olProj.fromLonLat([-5.715560, -15.927630]);
        this.olView.animate({ center: location, duration: 2000, zoom: 11 });
        break;
      case "Kiribati":
        location = olProj.fromLonLat([173.019910, 1.335570]);
        this.olView.animate({ center: location, duration: 2000, zoom: 8 });
        break;
      default:
        let extent = vectorSource.getExtent();
        this.olMap.getView().fit(extent, { duration: 2000 });
        break;
    }
  }

  getShapesForSearch(): olLayer.Vector[] {
    var shapes = []
    this.olMap.getLayers().forEach(layer => {
      if (layer instanceof olLayer.Vector && layer.get(LayerKey.MarkerKey) !== MarkerKeys.CURRENT_LOC_PIN &&
        (layer.get(LayerKey.MarkerKey) == MarkerKeys.DRAWING_SHAPE || layer.get(LayerKey.MarkerKey) == MarkerKeys.AREA_BOUNDARY)) {
        shapes.push(layer);
      }
    });
    return shapes;
  }

  setSearchByShape(drawingMode: DrawingMode, proximityType: ProximityType) {
    switch (drawingMode) {
      case DrawingMode.LineString:
      case DrawingMode.Polygon:
      case DrawingMode.Circle:
      case DrawingMode.Rectangle:
        this.isErase = false;
        this.olDrawingUtils.setDrawingMode(drawingMode, false, proximityType);
        break;
      case DrawingMode.Erase:
        this.isErase = true;
        break;
      default:
        this.isErase = false;
        this.olDrawingUtils.setDrawingMode(DrawingMode.None, false, proximityType);
        break;
    }
  }

  isSearchShapeDrawn() {
    var count = 0;
    this.olMap.getLayers().forEach(layer => {
      if (layer instanceof olLayer.Vector && layer.get(LayerKey.MarkerKey) !== MarkerKeys.CURRENT_LOC_PIN) {
        count++;
      }
    });
    return count;
  }
}
