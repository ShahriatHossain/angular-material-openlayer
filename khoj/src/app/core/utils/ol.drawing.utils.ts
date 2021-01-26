import olMap from 'ol/Map';
import * as olLayer from 'ol/layer';
import Feature from 'ol/Feature';
import * as olStyle from 'ol/style';
import * as olExtent from 'ol/extent';
import * as olSource from 'ol/source';
import * as olGeom from 'ol/geom';
import * as olProj from 'ol/proj';
import * as olColor from 'ol/color';
import * as olInteraction from 'ol/interaction';
import Overlay from 'ol/Overlay';
import { unByKey, Observable } from 'ol/Observable';



import { AppLocation, PolygonArea } from '../models/common.models';
import { DrawingColor, MarkerKeys, EARTH_RADIUS_IN_MILES, EARTH_RADIUS_IN_KILOMETERS } from '../constants/index.constant';
import { OlHelperService } from '../services/ol-helper.service';
import { LayerKey, DrawingMode, GraveCellType, ProximityType } from '../enums/index.enum';
import { GridShapeInfo } from '../models/index.models';
import { AppUtils } from './app.utils';
import { CommonUtils } from './common.utils';
import { StringUtils } from './string.utils';
import { BoundaryUtils } from './boundary.utils';

export class OlDrawingUtils {
    protected mapControl: olMap;
    private isAnnotationShape: boolean;
    private proximityType: number;
    constructor(mapControl: olMap) {
        this.mapControl = mapControl;
        this.proximityType = null;
    }

    navigateToLocation(center: AppLocation) {
        var location = olProj.fromLonLat([center.longitude, center.latitude]);
        this.mapControl.getView().animate({ center: location, zoom: 15 });
    }

    focusViewFromPolygon(polygonArea: PolygonArea, doNotTransform?: boolean) {
        let feature: Feature = this.getFeatureFromPolygonArea(polygonArea, doNotTransform);
        let vectorSource = OlHelperService.generateVectorSource([feature]);
        this.mapControl.getView().fit(vectorSource.getExtent());
    }

    getStrokeStyle(strColor = DrawingColor.STROKE_COLOR, sWidth = 1, sOpacity?: number): olStyle.Stroke {
        let color = olColor.asArray(strColor);
        let sColor = color.slice();
        if (sOpacity !== undefined) sColor[3] = sOpacity;

        return new olStyle.Stroke({
            color: color,
            width: sWidth
        });
    }

    getFillStyle(hexColor: string, fOpacity?: number): olStyle.Fill {
        let color = olColor.asArray(hexColor);
        if (fOpacity !== undefined) color[3] = fOpacity;
        return new olStyle.Fill({
            color: color
        });
    }

    getPolygonStyle(polygonArea: PolygonArea): olStyle.Style {
        let style = new olStyle.Style({
            stroke: this.getStrokeStyle(polygonArea.strokeColor, polygonArea.strokeWidth, polygonArea.strokeOpacity)
        });

        if (polygonArea.fillColor) style.setFill(this.getFillStyle(polygonArea.fillColor, polygonArea.fillOpacity));

        return style;
    }

    getPolygonStyleFromFeature(feature: Feature): olStyle.Style {
        let fStyle = feature.getStyle();

        let strokeColor = OlHelperService.getStrokeColor(fStyle);
        let strokeWidth = OlHelperService.getStrokeWidth(fStyle);
        let strokeOpacity = OlHelperService.getStrokeOpacity(fStyle);

        let style = new olStyle.Style({
            stroke: this.getStrokeStyle(strokeColor, strokeWidth, strokeOpacity)
        });

        let fillColor = OlHelperService.getFillColor(fStyle);
        if (fillColor) {
            let fillOpacity = OlHelperService.getFillOpacity(fStyle);
            style.setFill(this.getFillStyle(fillColor, fillOpacity));
        }

        return style;
    }


    createBoundary(
        center: AppLocation,
        radius: number,
        proximityType: ProximityType,
        shouldSetView: boolean,
        isGeoCoordinate: boolean,
        isBoundaryCreate?: boolean) {

        const circleRadius = this.getRadius(radius, proximityType);
        const circleCenter = OlHelperService.convertToOlCoordinate(center, isGeoCoordinate);

        let feature = new Feature(new olGeom.Circle(circleCenter, circleRadius));
        let vectorSource = OlHelperService.generateVectorSource([feature]);
        if (isBoundaryCreate) {
            var layer = BoundaryUtils.generateBoundaryLayer(vectorSource);
            this.mapControl.addLayer(layer);
        }

        if (shouldSetView) this.setView(vectorSource);
    }

    public setView(vectorSource: olSource.Vector) {
        this.mapControl.getView().fit(vectorSource.getExtent(), {
            size: this.mapControl.getSize(),
            duration: 2000
        });
    }

    createCircle(
        center: AppLocation,
        radius: number,
        proximityType?: ProximityType,
        shouldSetView?: boolean,
        isGeoCoordinate?: boolean,
        backgroundColor?: string,
        markerKey?: string,
        textKey?: string,
    ): olLayer.Vector {

        const circleRadius = this.getRadius(radius, proximityType);
        const circleCenter = OlHelperService.convertToOlCoordinate(center, isGeoCoordinate);


        let feature = new Feature(new olGeom.Circle(circleCenter, circleRadius));
        if (backgroundColor) {
            let style = new olStyle.Style({
                fill: new olStyle.Fill({
                    color: backgroundColor
                }),
                stroke: new olStyle.Stroke({
                    color: backgroundColor
                })
            })
            feature.setStyle(style);
        }
        let vectorSource = OlHelperService.generateVectorSource([feature]);
        let circleLayer = OlHelperService.generateVectorLayer(vectorSource);
        if (markerKey) circleLayer.set(LayerKey.MarkerKey, markerKey);
        if (textKey) circleLayer.set(LayerKey.TextMarkerKey, textKey);

        this.mapControl.addLayer(circleLayer);
        if (shouldSetView) this.mapControl.getView().fit(vectorSource.getExtent());

        return circleLayer;
    }

    drawPolygons(polygons: Array<PolygonArea>, setView?: boolean, isOLCoordinate?: boolean, editInteraction?: boolean): olLayer.Vector[] {

        let polygonsToDraw = this.getVectorLayers(polygons, editInteraction, isOLCoordinate);
        polygonsToDraw.forEach(p => {
            this.mapControl.addLayer(p);
        });

        if (setView && polygonsToDraw.length > 0) {
            let vectorSource = polygonsToDraw[0].get('source');
            if (vectorSource) this.mapControl.getView().fit(vectorSource.getExtent());
        }

        return polygonsToDraw;
    }
    drawRoutePolygons(polygons: Array<PolygonArea>): olLayer.Vector[] {

        let polygonsToDraw = this.getVectorLayers(polygons, false, false);
        polygonsToDraw.forEach(p => {
            this.mapControl.addLayer(p);
        });

        if (polygonsToDraw.length > 0) {
            let vectorSource = polygonsToDraw[0].get('source');
            if (vectorSource) {
                if (window.screen.width > 766)
                    this.mapControl.getView().fit(vectorSource.getExtent(), { padding: [0, 0, 0, 350] });
                else
                    this.mapControl.getView().fit(vectorSource.getExtent());
            }
        }
        return polygonsToDraw;
    }

    private getVectorLayers(polygons: PolygonArea[], editInteraction: boolean, isOLCoordinate: boolean) {
        let layers = <olLayer.Vector[]>[];
        polygons.forEach(p => {
            let layer = p.shapeType == DrawingMode.Circle
                ? this.plotAndGetCircle(p, editInteraction)
                : this.plotAndGetPolygon(p, isOLCoordinate, editInteraction);
            if (layer) layers.push(layer);
        });
        return layers;
    }

    private plotAndGetCircle(polygonArea: PolygonArea, isEditable?: boolean): olLayer.Vector {
        let feature = this.getFeatureFromPolygonArea(polygonArea, true);
        let vectorSource = OlHelperService.generateVectorSource([feature]);
        var vectorLayer = OlHelperService.generateVectorLayer(vectorSource);

        let markerId = this.generateMarkerId();
        vectorLayer.set(LayerKey.MarkerId, markerId);
        vectorLayer.set(LayerKey.MarkerKey, this.getMarkerKey(polygonArea.markerKey));
        vectorLayer.set(LayerKey.DrawingMode, polygonArea.shapeType);

        let modify: olInteraction.Modify;
        if (isEditable) modify = this.addInteractions(vectorSource);

        if (polygonArea.shapeType == DrawingMode.Circle) {
            let circle = new olGeom.Circle([polygonArea.center.longitude, polygonArea.center.latitude], polygonArea.radius);
            this.createMeasureTooltip(markerId, this.formatRadius(circle), this.getPosition(circle));
            if (isEditable) this.addModifyEvents(modify);

            this.measureTooltipElement = null;
        }

        return vectorLayer;
    }

    private plotAndGetPolygon(polygonArea: PolygonArea, isOLCoordinate?: boolean, isEditable?: Boolean): olLayer.Vector {
        let feature: Feature = this.getFeatureFromPolygonArea(polygonArea, isOLCoordinate);
        if (!feature) return null;

        let style = this.getPolygonStyle(polygonArea);
        let vectorLayer = this.createShapes(feature, style);

        let markerId = this.generateMarkerId();
        vectorLayer.set(LayerKey.MarkerId, markerId);
        vectorLayer.set(LayerKey.DrawingMode, polygonArea.shapeType);
        vectorLayer.set(LayerKey.MarkerKey, this.getMarkerKey(polygonArea.markerKey));

        let modify: olInteraction.Modify;
        if (isEditable) {
            let vectorSource = OlHelperService.generateVectorSource([feature]);
            modify = this.addInteractions(vectorSource);
        }

        if (this.isMeasurementNeeded(polygonArea)) {
            let points = this.getShapePoints(polygonArea, isOLCoordinate); //TODO: check return values
            this.createMeasureTooltip(markerId, this.getLengthFromPolygon(vectorLayer), points[points.length - 1]);
            if (isEditable) this.addModifyEvents(modify);
            this.measureTooltipElement = null;
        }
        return vectorLayer;
    }

    private isMeasurementNeeded(polygonArea: PolygonArea) {
        return polygonArea.markerKey != MarkerKeys.AREA_BOUNDARY
            && (polygonArea.shapeType == DrawingMode.MeasurementLineString
                || polygonArea.shapeType == DrawingMode.MeasurementPolygon
                || polygonArea.shapeType == DrawingMode.Circle
                || polygonArea.shapeType == DrawingMode.LineString
                || polygonArea.shapeType == DrawingMode.Polygon);
    }

    public setDrawingMode(mode: DrawingMode, type: boolean, proximityType: ProximityType, markerKey?: string) {
        this.proximityType = +proximityType;

        this.isAnnotationShape = type;
        switch (mode) {
            case DrawingMode.LineString:
            case DrawingMode.Polygon:
            case DrawingMode.Circle:
            case DrawingMode.MeasurementLineString:
            case DrawingMode.MeasurementPolygon:
                this.drawLinePolygon(mode, true, markerKey);
                break;
            case DrawingMode.Rectangle:
                this.drawRectangle(mode, markerKey);
                break;
            default:
                break;
        }
    }

    draw: olInteraction.Draw;
    private drawLinePolygon(mode: DrawingMode, isMeasurement: boolean, markerKey?: string) {

        var vectorSource = new olSource.Vector({ wrapX: false });
        var vectorLayer = OlHelperService.generateVectorLayer(vectorSource);

        let markerId = this.generateMarkerId();
        vectorLayer.set(LayerKey.MarkerId, markerId);
        vectorLayer.set(LayerKey.MarkerKey, this.getMarkerKey(markerKey));
        vectorLayer.set(LayerKey.DrawingMode, mode);
        this.mapControl.addLayer(vectorLayer);

        this.removeInteraction();
        this.draw = this.addDrawInteraction(mode, vectorSource);
        let modify = this.addInteractions(vectorSource);
        if (isMeasurement) {
            this.createMeasureTooltip(markerId);
            this.addDrawingEvents(this.draw);
            this.addModifyEvents(modify);
        }
    }

    //#region Private Methods    
    private getShapePoints(polygonArea: PolygonArea, isOLCoordinate?: boolean): [number, number][] {
        var rings = <[number, number][]>[];
        if (isOLCoordinate) {
            polygonArea.locations.forEach(p => rings.push([p.longitude, p.latitude]));
        } else {
            polygonArea.locations.forEach(p => {
                if (p['longitude']) {
                    rings.push(OlHelperService.transformToOlCoordinate([p['longitude'], p['latitude']]));
                } else {
                    rings.push(OlHelperService.transformToOlCoordinate([p.longitude, p.latitude]));
                }
            });
        }
        return rings;
    }

    private createShapes(feature: Feature, style: olStyle.Style): olLayer.Vector {
        let vectorSource = OlHelperService.generateVectorSource([feature]);
        let polygon = new olLayer.Vector({
            source: vectorSource,
            style: style
        });

        return polygon;
    }

    getFeatureFromPolygonArea(polygonArea: PolygonArea, isOLCoordinate?: boolean): Feature {
        let feature: Feature;
        switch (polygonArea.shapeType) {
            case DrawingMode.Polygon:
            case DrawingMode.MeasurementPolygon:
                let points = this.getShapePoints(polygonArea, isOLCoordinate);
                feature = new Feature({
                    geometry: new olGeom.Polygon([points])
                });
                feature.setStyle(this.getPolygonStyle(polygonArea));
                break;
            case DrawingMode.Polyline:
            case DrawingMode.LineString:
            case DrawingMode.MeasurementLineString:
                let rings = this.getShapePoints(polygonArea, isOLCoordinate);
                feature = new Feature({
                    geometry: new olGeom.LineString(rings)
                });
                break;
            case DrawingMode.Circle:
                feature = new Feature({
                    geometry: new olGeom.Circle([polygonArea.center.longitude, polygonArea.center.latitude], polygonArea.radius)
                });
                feature.setStyle(this.getPolygonStyle(polygonArea));
                break;
            default:
                break;
        }
        return feature;
    }

    private generateMarkerId(): string {
        return "AS" + (5 * Math.random()).toString();
    }

    private getMarkerKey(markerKey?: string): string {
        return markerKey ? markerKey : this.isAnnotationShape ? MarkerKeys.ANNOTATION_SHAPE : MarkerKeys.DRAWING_SHAPE;
    }

    private getPosition(circle: olGeom.Circle): [number, number] {
        let center = circle.getCenter();
        let radius = circle.getRadius();
        center[0] += radius;
        return center;
    }

    private getRadius(radius: number, proximityType?: ProximityType): number {
        var circleRadius: number;
        if (proximityType) {
            var earthRadius = proximityType == ProximityType.Miles ? EARTH_RADIUS_IN_MILES : EARTH_RADIUS_IN_KILOMETERS;
            circleRadius = radius * earthRadius; // d = angular distance covered on earth's surface
        } else {
            circleRadius = radius;
        }
        return circleRadius;
    }

    private getLengthFromPolygon(layer: olLayer.Vector): string {
        let geometry = OlHelperService.getGeometryFromLayer(layer);
        if (!geometry) return '';

        if (geometry instanceof olGeom.Polygon) return this.formatArea(geometry);
        if (geometry instanceof olGeom.LineString) return this.formatLength(geometry);
        if (geometry instanceof olGeom.Circle) return this.formatRadius(geometry);

        return '';
    }

    private getDrawMode(mode: DrawingMode): olGeom.GeometryType {
        let drawMode;
        switch (mode) {
            case DrawingMode.MeasurementLineString:
                drawMode = DrawingMode[DrawingMode.LineString];
                break;
            case DrawingMode.MeasurementPolygon:
                drawMode = DrawingMode[DrawingMode.Polygon];
                break;
            default:
                drawMode = DrawingMode[mode];
                break;
        }
        return <olGeom.GeometryType>drawMode;
    }

    private addInteractions(source: olSource.Vector): olInteraction.Modify {
        let snap = new olInteraction.Snap({ source: source });
        this.mapControl.addInteraction(snap);

        let modify = new olInteraction.Modify({ source: source });
        this.mapControl.addInteraction(modify);

        return modify;
    }

    removeInteraction() {
        if (this.draw) this.mapControl.removeInteraction(this.draw);
    }

    private addDrawInteraction(mode: DrawingMode, source: olSource.Vector): olInteraction.Draw {
        let drawMode = this.getDrawMode(mode);
        let draw = new olInteraction.Draw({
            source: source,
            type: drawMode
        });
        this.mapControl.addInteraction(draw);

        draw.on('drawend', (evt) => {
            evt.target.getMap().removeInteraction(draw);
        });
        return draw;
    }

    private modifyListener: any;
    private addModifyEvents(modify: olInteraction.Modify) {
        modify.on('modifystart', (evt: any) => {
            evt.features.forEach((e: any) => {
                this.modifyListener = e.getGeometry().on('change', (evt: any) => {
                    let layer = this.getLayerFromFeature(e);
                    if (layer) {
                        let markerId = layer.get(LayerKey.MarkerId);
                        var elm = document.querySelector("[id='" + markerId + "']");

                        let { output, tooltipCoordinate } = this.getLocationAndOutput(evt.target);
                        if (elm) elm.innerHTML = output;
                        this.updateOverlayPositionById(markerId, tooltipCoordinate);
                    }
                });
            })
        });

        modify.on('modifyend', (evt: any) => {
            unByKey(this.modifyListener);
        });
    }


    private drawingListener: any;
    private addDrawingEvents(draw: olInteraction.Draw) {

        draw.on('drawstart', (evt: any) => {
            this.drawingListener = evt.feature.getGeometry().on('change', (evt) => {
                let { output, tooltipCoordinate } = this.getLocationAndOutput(evt.target);
                this.measureTooltipElement.innerHTML = output;
                this.measureTooltip.setPosition(tooltipCoordinate);
            });
        }, this);

        draw.on('drawend', () => {
            this.measureTooltipElement.className = 'measurement-tooltip tooltip tooltip-static';
            this.measureTooltipElement.setAttribute('style', `background-color:${CommonUtils.getMeasurementOverlayColor()};`);
            this.measureTooltip.setOffset([0, -7]);
            this.measureTooltipElement = null;
            unByKey(this.drawingListener);
        }, this);
    }

    private updateOverlayPositionById(markerId: any, tooltipCoordinate: [number, number]): void {
        let overlay = this.mapControl.getOverlayById(markerId);
        if (overlay) overlay.setPosition(tooltipCoordinate);
    }

    private getLocationAndOutput(geom: any) {
        let tooltipCoordinate: [number, number];
        let output: string;
        if (geom instanceof olGeom.Polygon) {
            output = this.formatArea(geom);
            tooltipCoordinate = geom.getInteriorPoint().getCoordinates();
        } else if (geom instanceof olGeom.LineString) {
            output = this.formatLength(geom);
            tooltipCoordinate = geom.getLastCoordinate();
        } else if (geom instanceof olGeom.Circle) {
            output = this.formatRadius(geom);
            tooltipCoordinate = this.getPosition(geom);
        }

        return { output, tooltipCoordinate };
    }
    //#endregion

    public setGridDrawingMode(mode: DrawingMode, gridShapeInfo: GridShapeInfo) {
        this.isAnnotationShape = false;
        switch (mode) {
            case DrawingMode.GridLineString:
            case DrawingMode.GridPolygon:
                this.drawGridLinePolygon(mode, gridShapeInfo);
                break;
            default:
                //this.SetMode(null);
                break;
        }
    }

    private hitCount: number;
    private drawGridLinePolygon(mode: DrawingMode, gridShapeInfo: GridShapeInfo) {
        var source = new olSource.Vector({ wrapX: false });
        var vector = OlHelperService.generateVectorLayer(source);
        vector.set(LayerKey.MarkerKey, MarkerKeys.GRAVE_PUSH_PIN);

        let markerId = "GD" + (5 * Math.random()).toString();
        vector.set(LayerKey.MarkerId, markerId);
        this.mapControl.addLayer(vector);

        var drawMode = this.getDrawMode(mode);
        let draw = new olInteraction.Draw({
            source: source,
            type: drawMode
        });
        this.mapControl.addInteraction(draw);
        this.addInteractions(source);

        var self = this;
        this.hitCount = 1;
        draw.on('drawend', (evt) => {
            evt.target.getMap().removeInteraction(draw);
            setTimeout(() => {
                if (self.hitCount == 1) {
                    self.getGridShape(markerId, gridShapeInfo);
                }
                self.hitCount = self.hitCount + 1;
            }, 1000);
        });
    }

    private getGridShape(markerId: any, gridShapeInfo: GridShapeInfo) {
        var shapes = [];
        this.mapControl.getLayers().forEach((layer) => {
            if (layer instanceof olLayer.Vector) {
                if (layer.get(LayerKey.MarkerId) === markerId) {
                    shapes.push(layer);
                }
            }
        });

        if (shapes && shapes.length > 0) {
            switch (gridShapeInfo.shapeType) {
                case DrawingMode.GridPolygon:
                    this.genSquareGrid(shapes[0], gridShapeInfo, 'Poly');
                    break;
                case DrawingMode.GridLineString:
                    this.getLineGrid(shapes[0], gridShapeInfo, 'Line');
                    break;
            }
        }
    }

    private getLineGrid(shape: any, gridShapeInfo: GridShapeInfo, sType: string) {
        var n = gridShapeInfo.noColumns;
        var geometry = shape.getSource().getFeatures()[0].getGeometry();
        var coords = geometry.getCoordinates();
        var coordIndex = 0;
        var startPoint = coords[coordIndex];
        var nextPoint = coords[coordIndex + 1];
        var endPoint = coords[coords.length - 1];
        var segmentLength = geometry.getLength() / n;
        var currentSegmentLength = 0;
        var pTitle = `${gridShapeInfo.prefixTitle}_${sType}${gridShapeInfo.shapeCounter}_C`;

        this.addGravePushPin(
            new Feature(new olGeom.Point([startPoint[0], startPoint[1]])),
            gridShapeInfo.pinIconUrl,
            pTitle + '0');

        for (var i = 0; i < n - 1; i++) {
            var distanceBetweenPoints = StringUtils.calculatePointsDistance(startPoint, nextPoint);
            currentSegmentLength += distanceBetweenPoints;
            pTitle = `${gridShapeInfo.prefixTitle}_${sType}${gridShapeInfo.shapeCounter}_C${(i + 1)}`;

            if (currentSegmentLength < segmentLength) {
                coordIndex++;
                startPoint = coords[coordIndex];
                nextPoint = coords[coordIndex + 1];
                continue;
            } else {
                var distanceToSplitPoint = currentSegmentLength - segmentLength;
                var splitPointCoords = StringUtils.calculateSplitPointCoords(
                    startPoint,
                    nextPoint,
                    distanceBetweenPoints,
                    distanceToSplitPoint
                );
                var splitPoint = new olGeom.Point([splitPointCoords[0], splitPointCoords[1]]);
                var pinPush = new Feature(splitPoint);
                this.addGravePushPin(
                    pinPush,
                    gridShapeInfo.pinIconUrl,
                    pTitle);
                startPoint = splitPoint.getCoordinates();

                currentSegmentLength = 0;
            }
        }

        pTitle = `${gridShapeInfo.prefixTitle}_${sType}${gridShapeInfo.shapeCounter}_C`;
        this.addGravePushPin(
            new Feature(new olGeom.Point([endPoint[0], endPoint[1]])),
            gridShapeInfo.pinIconUrl,
            pTitle + `${n}`);
    }

    private genSquareGrid(shape: any, gridShapeInfo: GridShapeInfo, sType: string) {
        var self = this;
        var extent = shape.getSource().getFeatures()[0].getGeometry().getExtent();
        var source = shape.getSource();
        var c = 1;

        for (var i = extent[0]; i < extent[2]; i += (extent[2] - extent[0]) / gridShapeInfo.noRows) {
            for (var j = extent[1]; j < extent[3]; j += (extent[3] - extent[1]) / gridShapeInfo.noColumns) {
                var cellExtent = [i, j, i + (extent[2] - extent[0]) / gridShapeInfo.noRows, j + (extent[3] - extent[1]) / gridShapeInfo.noColumns];
                var center = olExtent.getCenter(<olExtent>cellExtent);
                source.forEachFeatureIntersectingExtent(cellExtent, (feature) => {
                    if (feature === shape.getSource().getFeatures()[0]) {
                        var pTitle = `${gridShapeInfo.prefixTitle}_${sType}${gridShapeInfo.shapeCounter}_C${c}`;
                        switch (Number(gridShapeInfo.cellType)) {
                            case GraveCellType.Pin:
                                var pinPush = new Feature(new olGeom.Point(center));
                                self.addGravePushPin(
                                    pinPush,
                                    gridShapeInfo.pinIconUrl,
                                    pTitle);
                                break;
                            case GraveCellType.Grid:
                                var gridPush = new Feature(olGeom.Polygon.fromExtent(<olExtent>cellExtent));
                                self.addGravePushGrid(
                                    gridPush,
                                    gridShapeInfo.pinIconUrl,
                                    pTitle);
                                break;
                        }
                        c = c + 1;
                    }
                });
            }
        }
    }

    public addGravePushPin(pin: any, iconUrl: any, pinMarkerId: any) {
        var coordinate = pin.getGeometry().getCoordinates();
        var iconFeature = new Feature({
            geometry: new olGeom.Point(
                [coordinate[0], coordinate[1]]
            )
        });

        var iconStyle = new olStyle.Style({
            image: new olStyle.Icon({
                src: `../images/dotinsideacircle.png`,
                rotateWithView: true
            })
        });

        iconFeature.setStyle(iconStyle);
        var vectorSource = OlHelperService.generateVectorSource([iconFeature]);
        var vectorLayer = OlHelperService.generateVectorLayer(vectorSource);
        vectorLayer.set(LayerKey.MarkerId, pinMarkerId);
        vectorLayer.set(LayerKey.MarkerKey, MarkerKeys.GRAVE_PUSH_PIN);
        this.mapControl.addLayer(vectorLayer);

        this.addInteractions(vectorSource);
    }

    public addGravePushGrid(pin: any, iconUrl: any, pinMarkerId: any) {
        let iconFeature = new Feature({
            geometry: pin.getGeometry()
        });

        let iconStyle = new olStyle.Style({
            stroke: new olStyle.Stroke({
                color: '#ffcc33',
                width: 2
            })
        });

        iconFeature.setStyle(iconStyle);
        let vectorSource = OlHelperService.generateVectorSource([iconFeature]);
        let vectorLayer = OlHelperService.generateVectorLayer(vectorSource);
        vectorLayer.set(LayerKey.MarkerId, pinMarkerId);
        vectorLayer.set(LayerKey.MarkerKey, MarkerKeys.GRAVE_PUSH_PIN);
        this.mapControl.addLayer(vectorLayer);

        this.addInteractions(vectorSource);
    }

    private drawRectangle(mode: DrawingMode, markerKey?: string) {
        markerKey = this.getMarkerKey(markerKey);
        let source = new olSource.Vector({ wrapX: false });
        let vector = OlHelperService.generateVectorLayer(source);
        vector.set(LayerKey.MarkerKey, markerKey);
        vector.set(LayerKey.DrawingMode, mode);
        this.mapControl.addLayer(vector);

        let drawMode = DrawingMode[mode];
        olInteraction.Draw.createBox();
        let draw = new olInteraction.Draw({
            source: source,
            type: <any>drawMode,
            geometryFunction: olInteraction.Draw.createRegularPolygon(4)
        });
        this.mapControl.addInteraction(draw);

        this.addInteractions(source)
        draw.on('drawend', (evt) => {
            evt.target.getMap().removeInteraction(draw);
        });
    }

    //#region  MEASUREMENT METHODS
    private measureTooltipElement: HTMLElement;
    private measureTooltip: Overlay;
    private createMeasureTooltip(markerId: string, output?: string, position?: [number, number]) {
        if (this.measureTooltipElement) {
            this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
        }

        this.measureTooltipElement = document.createElement('div');
        this.measureTooltipElement.id = markerId;

        let offset: number[];
        if (output && position) {
            offset = [0, -7];
            let getColor = CommonUtils.getMeasurementOverlayColor();
            this.measureTooltipElement.className = 'measurement-tooltip tooltip tooltip-static';
            this.measureTooltipElement.setAttribute('style', `background-color:${getColor};`);
            this.measureTooltipElement.innerHTML = output;
        } else {
            offset = [0, -15];
            this.measureTooltipElement.className = 'measurement-tooltip tooltip tooltip-measure';
        }

        this.measureTooltip = new Overlay({
            id: markerId,
            element: this.measureTooltipElement,
            offset: offset,
            positioning: 'bottom-center'
        });

        if (position) this.measureTooltip.setPosition(position);
        this.mapControl.addOverlay(this.measureTooltip);
    }

    // square mile/km
    private formatArea(polygon: olGeom.Polygon): string {
        let earthRadius = AppUtils.getEarthRadius(this.proximityType);
        const area = polygon.getArea();
        let output: any = (Math.round(area / (earthRadius * 1000) * 100) / 100);
        output += ` ${AppUtils.getProximityLabel(this.proximityType)}<sup>2</sup>`;
        return output;
    }

    private formatLength(line: olGeom.LineString): string {
        let earthRadius = AppUtils.getEarthRadius(this.proximityType);
        const length = line.getLength();
        let output: any = (Math.round(length / earthRadius * 100) / 100);
        output += ` ${AppUtils.getProximityLabel(this.proximityType)}`;
        return output;
    }

    private formatRadius(circle: olGeom.Circle): string {
        let earthRadius = AppUtils.getEarthRadius(this.proximityType);
        const length = circle.getRadius();
        let output: any = (Math.round(length / earthRadius * 100) / 100);
        output += ` ${AppUtils.getProximityLabel(this.proximityType)}`;

        return output;
    }
    //#endregion


    getLayerFromFeature(feature: Feature) {
        let layer: olLayer.Vector;
        this.mapControl.getLayers().forEach((l) => {
            if (l instanceof olLayer.Vector) {
                let source = l.getSource();
                if (source instanceof olSource.Vector) {
                    if (source.getFeatures().find((f) => feature === f)) {
                        layer = l;
                    }
                }
            }
        });
        return layer;
    }
}