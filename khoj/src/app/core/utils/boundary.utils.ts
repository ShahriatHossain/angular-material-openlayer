import * as olLayer from 'ol/layer';
import Feature from 'ol/Feature';
import * as olStyle from 'ol/style';
import * as olSource from 'ol/source';
import * as olGeom from 'ol/geom';
import * as olProj from 'ol/proj';
import { LayerKey } from '../enums/index.enum';
import { MarkerKeys, SAFE_CHARACTERS } from '../constants/index.constant';

export class BoundaryUtils {
    //#region Public Methods
    static getPolygonsFromBoundary(result) {
        var entity = result.d.results[0];
        var primitives = entity.Primitives;
        var numOfVertices = 0;

        var polygonArray = new Array();
        for (var i = 0; i < primitives.length; i++) {
            var ringStr = primitives[i].Shape;
            var ringArray = ringStr.split(",");
            for (var j = 1; j < ringArray.length; j++) {
                var array = this.parseEncodedValue(ringArray[j]);
                if (array.length > numOfVertices) {
                    numOfVertices = array.length;
                }
                polygonArray.push(array);
            }
        }
        return polygonArray;
    }

    static generateFeaturesForBoundary(polygons: any[]): Feature[] {
        let features = <Feature[]>[];

        if (polygons.length == 1) {
            features.push(this.generateFeature(polygons[0]));
        }
        else {
            //TODO: implement later after getting response from TL
            // polygons = polygons.sort((a, b) => b.length - a.length);
            polygons.forEach(polygon => {
                features.push(this.generateFeature(polygon));
            });
        }
        return features;
    }

    static generateBoundaryLayer(vectorSource: olSource.Vector) {
        var layer = new olLayer.Vector({
            source: vectorSource,
            style: this.getBoundaryStyle()
        });

        layer.set(LayerKey.MarkerKey, MarkerKeys.AREA_BOUNDARY);
        return layer;
    }
    //#endregion


    //#region Private Methods
    private static parseEncodedValue(value: any): Array<any> {
        var list = new Array();
        var index = 0;
        var xSum = 0;
        var ySum = 0;
        var max = 4294967296;

        while (index < value.length) {
            var n = 0;
            var k = 0;

            while (1) {
                if (index >= value.length) {
                    return null;
                }
                var b = SAFE_CHARACTERS.indexOf(value.charAt(index++));
                if (b == -1) {
                    return null;
                }
                var tmp = (b & 31) * Math.pow(2, k);

                var ht = tmp / max;
                var lt = tmp % max;

                var hn = n / max;
                var ln = n % max;

                var nl = (lt | ln) >>> 0;
                n = (ht | hn) * max + nl;
                k += 5;
                if (b < 32) break;
            }

            var diagonal = parseInt(((Math.sqrt(8 * n + 5) - 1) / 2).toString());
            n -= (diagonal * (diagonal + 1)) / 2;
            var ny = parseInt(n.toString());
            var nx = diagonal - ny;
            nx = (nx >> 1) ^ -(nx & 1);
            ny = (ny >> 1) ^ -(ny & 1);
            xSum += nx;
            ySum += ny;
            var lat = ySum * 0.00001;
            var lon = xSum * 0.00001;

            list.push(olProj.transform([lon, lat], "EPSG:4326", "EPSG:3857"));
        }
        return list;
    }

    private static generateFeature(polygon: any): Feature {
        return new Feature({
            geometry: new olGeom.Polygon([polygon])
        })
    }

    //TODO: why text styles?
    private static getBoundaryStyle(): olStyle.Style {
        return new olStyle.Style({
            stroke: new olStyle.Stroke({
                color: '#0069D9',
                width: 1
            }),
            fill: new olStyle.Fill({
                color: 'rgba(230, 238, 255, 0.1)'
            }),
            text: new olStyle.Text({
                font: '12px Calibri,sans-serif',
                fill: new olStyle.Fill({
                    color: '#000'
                }),
                stroke: new olStyle.Stroke({
                    color: '#0069D9',
                    width: 3
                })
            })
        });
    }
}