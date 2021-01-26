import { EntityAttributeType } from '../enums/index.enum';

export class StringUtils {
    static GuidEquals(guid1: string, guid2: string) {
        return guid1 != null && guid2 != null && guid1.replace(/[{}]/g, "").toLowerCase() === guid2.replace(/[{}]/g, "").toLowerCase();
    }

    static Sort<T>(t1: T, t2: T, property: string) {
        if (t1[property] < t2[property]) return -1;
        if (t1[property] > t2[property]) return 1;
        return 0;
    }

    static isNullOrEmpty(value: any) {
        return value == null || value.trim() == '';
    }

    static isNullOrEmptyObj(value: any) {
        return value === null || value === undefined;
    }

    static nullToString(value: any) {
        return value == null ? '' : value;
    }

    static IsValidEmail(email: string) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    static ToCamelCase(str: string) {
        return str.replace(/^./, function (str) { return str.toUpperCase(); });
    }

    static capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static RandomString(len: number, an: string) {
        an = an && an.toLowerCase();
        var str = "", i = 0, min = an == "a" ? 10 : 0, max = an == "n" ? 10 : 62;
        for (; i++ < len;) {
            var r = Math.random() * (max - min) + min << 0;
            str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
        }
        return str;
    }

    static ValidateLatLng(lat: number, lng: number) {

        if (lat < -90 || lat > 90) {
            console.log("Latitude must be between -90 and 90 degrees inclusive.");
            return false;
        }
        else if (lng < -180 || lng > 180) {
            console.log("Longitude must be between -180 and 180 degrees inclusive.");
            return false;
        }
        else if (lat == 0 || lng == 0) {
            console.log("Enter a valid Latitude or Longitude!");
            return false;
        }

        return true;
    }

    static validateUrl(value) {
        var expression = /(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        var regexp = new RegExp(expression);
        return regexp.test(value);
    }

    static removeLastSlash(url) {
        return url.replace(/\/$/, "");
    }

    static removeGuidCurlyBrace(guid: string) {
        return guid ? guid.replace(/[{}]/g, "").toLowerCase() : '';
    }

    static urlExists(url) {
        var http = new XMLHttpRequest();
        try {
            http.open('GET', url, false);
            http.send();
            return (http.status == 404) ? false : true;
        } catch (e) {
            return false;
        }
    }

    static exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ';';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    static calculateSplitPointCoords(startNode, nextNode, distanceBetweenNodes, distanceToSplitPoint) {
        var d = distanceToSplitPoint / distanceBetweenNodes;
        var x = nextNode[0] + (startNode[0] - nextNode[0]) * d;
        var y = nextNode[1] + (startNode[1] - nextNode[1]) * d;

        return [x, y];
    }


    static calculatePointsDistance(c1: number, c2: number) {
        var dx = c1[0] - c2[0];
        var dy = c1[1] - c2[1];

        return Math.sqrt(dx * dx + dy * dy);
    }

    static getUrlParameter(name: string, url: string) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(url);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    static isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    static isValidUrl(item: any) {
        let isValidUrl = false;
        var pattern = new RegExp('^((ft|htt)ps?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?' + // port
            '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
            '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        switch (true) {
            case (item && pattern.test(item)):
                isValidUrl = true;
                break;
        }
        return isValidUrl;
    }
}