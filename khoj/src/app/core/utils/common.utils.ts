import { ProximityType } from '../enums/index.enum';
import { AppLocation } from '../models/common.models';
import { AccessDevice } from '../constants/index.constant';

export class CommonUtils {
    static getMeasurementOverlayColor(): string {
        return '#F' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 5);
    }

    static getDistanceFromLatLon(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number,
        distanceType: ProximityType
    ): number {
        const R = 6371; // Radius of the earth in km
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) *
            Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;

        let distance = distanceType == ProximityType.Miles ? d * 0.621371 : d;
        return Number(distance.toFixed(2));
    }

    static deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }

    static getShapeFileConfig(fileToUpload: File): {} {
        return {
            url: fileToUpload,
            encoding: 'UTF-8',
            EPSG: 4326
        };
    }

    static isMobileDevice() {
        return (
            typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1
        );
    }

    static getDateFromBingTime(date: string): Date {
        if (!date) return undefined;

        let offset = 25200000; // -0700 hours parseInt(date.split('-')[1]);
        let timeStamp = parseInt(date.substring(6));
        var totalOffset = new Date().getTimezoneOffset() * 60000 + offset;
        timeStamp -= totalOffset; //TODO check for different time zone
        let convertedDate = new Date(timeStamp);

        if (timeStamp >= 86400000) convertedDate.setHours(convertedDate.getHours() - 24);

        return convertedDate;
    }

    static isLatLongExist(lat: number, lng: number) {
        return lat && lat != 0 && lng && lng != 0;
    }

    static getFillOpacity(props: any) {
        let fillOpacity: number;
        if (props['fill-opacity']) fillOpacity = Number(props['fill-opacity']);
        else if (props.fillOpacity) fillOpacity = Number(props.fillOpacity);
        return fillOpacity;
    }

    static getStrokeWidth(props: any) {
        let strokeWidth: number;
        if (props['stroke-width']) strokeWidth = Number(props['stroke-width']);
        else if (props.strokeWidth) strokeWidth = Number(props.strokeWidth);
        return strokeWidth;
    }

    static getStrokeOpacity(props: any) {
        let strokeOpacity: number;
        if (props['stroke-opacity']) strokeOpacity = Number(props['stroke-opacity']);
        else if (props.fillOpacity) strokeOpacity = Number(props.strokeOpacity);
        return strokeOpacity;
    }

    static convertStringToBuffer(s: string): ArrayBuffer {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
    }

    static convertToAppointmentDuration(duration: number): string {
        if (typeof duration !== 'number' || duration <= 0) return '0 m';
        if (duration > 1440) return `${(duration / 1440).toFixed(2)} d`;
        if (duration > 60) return `${(duration / 60).toFixed(2)} h`;
        return `${duration.toFixed(2)} m`;
    }

    static isSameLocation(location: AppLocation, currentLocation: AppLocation) {
        if (!location && !currentLocation) return true;
        if (!location || !currentLocation) return false;
        return (
            location.latitude === currentLocation.latitude &&
            location.longitude === currentLocation.longitude
        );
    }

    static isSamePartialLocation(location: AppLocation, currentLocation: AppLocation) {
        if (!location && !currentLocation) return true;
        if (!location || !currentLocation) return false;
        return (
            location.latitude.toFixed(2) === currentLocation.latitude.toFixed(2) &&
            location.longitude.toFixed(2) === currentLocation.longitude.toFixed(2)
        );
    }

    static getDocumentHeight(): number {
        const body = document.body,
            html = document.documentElement;

        const height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );

        return height;
    }

    static minutesToHM(minutes: number) {
        let duration = '';
        if (minutes > 59) {
            const h = Math.floor(minutes / 60);
            duration = h < 10 ? `0${h}` : `${h}`;
        } else duration += '00';

        duration += ':';
        const m = minutes % 60;
        duration += m < 10 ? `0${m}` : `${m}`;
        return duration;
    }

    static copyObject(object: any) {
        // This is the object that will store the original object's properties
        let copiedObj = {};

        for (let key in object) {
            // This copies each property from the original object to the copy object
            copiedObj[key] = { ...object[key] };
        }

        return copiedObj;
    }

    static isInStringArray(items: string[], search) {
        return items.indexOf(search) >= 0;
    }

    static getMobileOperatingSystem() {
        if (navigator.userAgent.indexOf("Android") != -1) return AccessDevice.Android;
        if ((navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPad") != -1) ||
            (navigator.platform.indexOf("iPod") != -1) ||
            (navigator.platform === 'iPhone'))
            return AccessDevice.IOS;
    }
}