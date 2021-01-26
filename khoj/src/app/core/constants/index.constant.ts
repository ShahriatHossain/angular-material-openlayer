import { ProximityType, TabSelectionType } from "../enums/index.enum";

// Layer max upload file size for kml, geojson as bytes
export const LAYER_UPLOAD_MAX_FILE_SIZE = 52428800; // 50MB
export const KML_UPLOAD_MAX_FILE_SIZE = 10485760; // 10MB
export const GEOJSON_UPLOAD_MAX_FILE_SIZE = 10485760; // 10MB
export const FILE_SIZE_2MB = 2097152; // 2MB
export const FILE_SIZE_1MB = 1048576; // 2MB

export const EARTH_RADIUS_IN_MILES = 621.371;
export const EARTH_RADIUS_IN_KILOMETERS = 1000;

export const HEAT_MAP_CLUSTER_DISTANCE = 14;
export const DEFAULT_SEARCH_PROXIMITY = 20;
export const DEFAULT_CLUSTER_DISTANCE = 20;
export const DEFAULT_PROXIMITY_TYPE = ProximityType.Miles;
export const DEFAULT_QS_COUNTRY = 'Australia';
export const LANGUAGE_CODE = 1033;
export const NUMBER_OF_RECORDS = 5000;

export const DEFAULT_TAB_SELECTION_TYPE = <TabSelectionType>'NewSearch';

export const NO_OF_DATA_GRID_FIELDS = 5;

export const DEFAULT_COORDINATE = [0, 0]; //[10.00, 8.82] // Long,Lat
export const DEFAULT_MEETING_TIME = 60;
export const DEFAULT_PADDING_TIME = 15;

export const DefaultSecurityGroup = 'all';

export abstract class ZoomValues {
    static readonly DEFAULT_CURRENT_LOCATION = 10;
    static readonly DEFAULT_MAP_CENTER_LOCATION = 2;
    static readonly DEFAULT = 8;
    static readonly DEFAULT_MIN = 3;
    static readonly DEFAULT_MAX = 19;
    static readonly SPOOKFISH_MIN = 3;
    static readonly SPOOKFISH_MAX = 28;
    static readonly ANY_LOCATION = 14;
}

export const LAYER_INSTANCE_PREFIX = 'SERVICEINFO';


export const CountryList = [
    {
        "name": "Afghanistan",
        "code": "AF"
    },
    {
        "name": "Albania",
        "code": "AL"
    },
    {
        "name": "Algeria",
        "code": "DZ"
    },
    {
        "name": "American Samoa",
        "code": "AS"
    },
    {
        "name": "Andorra",
        "code": "AD"
    },
    {
        "name": "Angola",
        "code": "AO"
    },
    {
        "name": "Anguilla",
        "code": "AI"
    },
    {
        "name": "Antarctica",
        "code": "AQ"
    },
    {
        "name": "Antigua and Barbuda",
        "code": "AG"
    },
    {
        "name": "Argentina",
        "code": "AR"
    },
    {
        "name": "Armenia",
        "code": "AM"
    },
    {
        "name": "Aruba",
        "code": "AW"
    },
    {
        "name": "Australia",
        "code": "AU"
    },
    {
        "name": "Austria",
        "code": "AT"
    },
    {
        "name": "Azerbaijan",
        "code": "AZ"
    },
    {
        "name": "Bahamas",
        "code": "BS"
    },
    {
        "name": "Bahrain",
        "code": "BH"
    },
    {
        "name": "Bangladesh",
        "code": "BD"
    },
    {
        "name": "Barbados",
        "code": "BB"
    },
    {
        "name": "Belarus",
        "code": "BY"
    },
    {
        "name": "Belgium",
        "code": "BE"
    },
    {
        "name": "Belize",
        "code": "BZ"
    },
    {
        "name": "Benin",
        "code": "BJ"
    },
    {
        "name": "Bermuda",
        "code": "BM"
    },
    {
        "name": "Bhutan",
        "code": "BT"
    },
    {
        "name": "Bolivia",
        "code": "BO"
    },
    {
        "name": "Bosnia and Herzegovina",
        "code": "BA"
    },
    {
        "name": "Botswana",
        "code": "BW"
    },
    {
        "name": "Bouvet Island",
        "code": "BV"
    },
    {
        "name": "Brazil",
        "code": "BR"
    },
    {
        "name": "British Indian Ocean Territory",
        "code": "IO"
    },
    {
        "name": "Brunei Darussalam",
        "code": "BN"
    },
    {
        "name": "Bulgaria",
        "code": "BG"
    },
    {
        "name": "Burkina Faso",
        "code": "BF"
    },
    {
        "name": "Burundi",
        "code": "BI"
    },
    {
        "name": "Cambodia",
        "code": "KH"
    },
    {
        "name": "Cameroon",
        "code": "CM"
    },
    {
        "name": "Canada",
        "code": "CA"
    },
    {
        "name": "Cape Verde",
        "code": "CV"
    },
    {
        "name": "Cayman Islands",
        "code": "KY"
    },
    {
        "name": "Central African Republic",
        "code": "CF"
    },
    {
        "name": "Chad",
        "code": "TD"
    },
    {
        "name": "Chile",
        "code": "CL"
    },
    {
        "name": "China",
        "code": "CN"
    },
    {
        "name": "Christmas Island",
        "code": "CX"
    },
    {
        "name": "Cocos (Keeling) Islands",
        "code": "CC"
    },
    {
        "name": "Colombia",
        "code": "CO"
    },
    {
        "name": "Comoros",
        "code": "KM"
    },
    {
        "name": "Congo",
        "code": "CG"
    },
    {
        "name": "Cook Islands",
        "code": "CK"
    },
    {
        "name": "Costa Rica",
        "code": "CR"
    },
    {
        "name": "Cote D\"Ivoire",
        "code": "CI"
    },
    {
        "name": "Croatia",
        "code": "HR"
    },
    {
        "name": "Cuba",
        "code": "CU"
    },
    {
        "name": "Cyprus",
        "code": "CY"
    },
    {
        "name": "Czech Republic",
        "code": "CZ"
    },
    {
        "name": "Denmark",
        "code": "DK"
    },
    {
        "name": "Djibouti",
        "code": "DJ"
    },
    {
        "name": "Dominica",
        "code": "DM"
    },
    {
        "name": "Dominican Republic",
        "code": "DO"
    },
    {
        "name": "Ecuador",
        "code": "EC"
    },
    {
        "name": "Egypt",
        "code": "EG"
    },
    {
        "name": "El Salvador",
        "code": "SV"
    },
    {
        "name": "Equatorial Guinea",
        "code": "GQ"
    },
    {
        "name": "Eritrea",
        "code": "ER"
    },
    {
        "name": "Estonia",
        "code": "EE"
    },
    {
        "name": "Ethiopia",
        "code": "ET"
    },
    {
        "name": "Falkland Islands (Malvinas)",
        "code": "FK"
    },
    {
        "name": "Faroe Islands",
        "code": "FO"
    },
    {
        "name": "Fiji",
        "code": "FJ"
    },
    {
        "name": "Finland",
        "code": "FI"
    },
    {
        "name": "France",
        "code": "FR"
    },
    {
        "name": "French Guiana",
        "code": "GF"
    },
    {
        "name": "French Polynesia",
        "code": "PF"
    },
    {
        "name": "French Southern Territories",
        "code": "TF"
    },
    {
        "name": "Gabon",
        "code": "GA"
    },
    {
        "name": "Gambia",
        "code": "GM"
    },
    {
        "name": "Georgia",
        "code": "GE"
    },
    {
        "name": "Germany",
        "code": "DE"
    },
    {
        "name": "Ghana",
        "code": "GH"
    },
    {
        "name": "Gibraltar",
        "code": "GI"
    },
    {
        "name": "Greece",
        "code": "GR"
    },
    {
        "name": "Greenland",
        "code": "GL"
    },
    {
        "name": "Grenada",
        "code": "GD"
    },
    {
        "name": "Guadeloupe",
        "code": "GP"
    },
    {
        "name": "Guam",
        "code": "GU"
    },
    {
        "name": "Guatemala",
        "code": "GT"
    },
    {
        "name": "Guernsey",
        "code": "GG"
    },
    {
        "name": "Guinea",
        "code": "GN"
    },
    {
        "name": "Guinea-Bissau",
        "code": "GW"
    },
    {
        "name": "Guyana",
        "code": "GY"
    },
    {
        "name": "Haiti",
        "code": "HT"
    },
    {
        "name": "Heard Island and Mcdonald Islands",
        "code": "HM"
    },
    {
        "name": "Honduras",
        "code": "HN"
    },
    {
        "name": "Hong Kong",
        "code": "HK"
    },
    {
        "name": "Hungary",
        "code": "HU"
    },
    {
        "name": "Iceland",
        "code": "IS"
    },
    {
        "name": "India",
        "code": "IN"
    },
    {
        "name": "Indonesia",
        "code": "ID"
    },
    {
        "name": "Iran, Islamic Republic Of",
        "code": "IR"
    },
    {
        "name": "Iraq",
        "code": "IQ"
    },
    {
        "name": "Ireland",
        "code": "IE"
    },
    {
        "name": "Isle of Man",
        "code": "IM"
    },
    {
        "name": "Israel",
        "code": "IL"
    },
    {
        "name": "Italy",
        "code": "IT"
    },
    {
        "name": "Jamaica",
        "code": "JM"
    },
    {
        "name": "Japan",
        "code": "JP"
    },
    {
        "name": "Jersey",
        "code": "JE"
    },
    {
        "name": "Jordan",
        "code": "JO"
    },
    {
        "name": "Kazakhstan",
        "code": "KZ"
    },
    {
        "name": "Kenya",
        "code": "KE"
    },
    {
        "name": "Kiribati",
        "code": "KI"
    },
    {
        "name": "Korea, Democratic People\"S Republic of",
        "code": "KP"
    },
    {
        "name": "Korea, Republic of",
        "code": "KR"
    },
    {
        "name": "Kuwait",
        "code": "KW"
    },
    {
        "name": "Kyrgyzstan",
        "code": "KG"
    },
    {
        "name": "Lao People\"S Democratic Republic",
        "code": "LA"
    },
    {
        "name": "Latvia",
        "code": "LV"
    },
    {
        "name": "Lebanon",
        "code": "LB"
    },
    {
        "name": "Lesotho",
        "code": "LS"
    },
    {
        "name": "Liberia",
        "code": "LR"
    },
    {
        "name": "Libyan Arab Jamahiriya",
        "code": "LY"
    },
    {
        "name": "Liechtenstein",
        "code": "LI"
    },
    {
        "name": "Lithuania",
        "code": "LT"
    },
    {
        "name": "Luxembourg",
        "code": "LU"
    },
    {
        "name": "Macao",
        "code": "MO"
    },
    {
        "name": "Macedonia, The Former Yugoslav Republic of",
        "code": "MK"
    },
    {
        "name": "Madagascar",
        "code": "MG"
    },
    {
        "name": "Malawi",
        "code": "MW"
    },
    {
        "name": "Malaysia",
        "code": "MY"
    },
    {
        "name": "Maldives",
        "code": "MV"
    },
    {
        "name": "Mali",
        "code": "ML"
    },
    {
        "name": "Malta",
        "code": "MT"
    },
    {
        "name": "Marshall Islands",
        "code": "MH"
    },
    {
        "name": "Martinique",
        "code": "MQ"
    },
    {
        "name": "Mauritania",
        "code": "MR"
    },
    {
        "name": "Mauritius",
        "code": "MU"
    },
    {
        "name": "Mayotte",
        "code": "YT"
    },
    {
        "name": "Mexico",
        "code": "MX"
    },
    {
        "name": "Micronesia, Federated States of",
        "code": "FM"
    },
    {
        "name": "Moldova, Republic of",
        "code": "MD"
    },
    {
        "name": "Monaco",
        "code": "MC"
    },
    {
        "name": "Mongolia",
        "code": "MN"
    },
    {
        "name": "Montserrat",
        "code": "MS"
    },
    {
        "name": "Morocco",
        "code": "MA"
    },
    {
        "name": "Mozambique",
        "code": "MZ"
    },
    {
        "name": "Myanmar",
        "code": "MM"
    },
    {
        "name": "Namibia",
        "code": "NA"
    },
    {
        "name": "Nauru",
        "code": "NR"
    },
    {
        "name": "Nepal",
        "code": "NP"
    },
    {
        "name": "Netherlands",
        "code": "NL"
    },
    {
        "name": "New Caledonia",
        "code": "NC"
    },
    {
        "name": "New Zealand",
        "code": "NZ"
    },
    {
        "name": "Nicaragua",
        "code": "NI"
    },
    {
        "name": "Niger",
        "code": "NE"
    },
    {
        "name": "Nigeria",
        "code": "NG"
    },
    {
        "name": "Niue",
        "code": "NU"
    },
    {
        "name": "Norfolk Island",
        "code": "NF"
    },
    {
        "name": "Northern Mariana Islands",
        "code": "MP"
    },
    {
        "name": "Norway",
        "code": "NO"
    },
    {
        "name": "Oman",
        "code": "OM"
    },
    {
        "name": "Pakistan",
        "code": "PK"
    },
    {
        "name": "Palau",
        "code": "PW"
    },
    {
        "name": "Panama",
        "code": "PA"
    },
    {
        "name": "Papua New Guinea",
        "code": "PG"
    },
    {
        "name": "Paraguay",
        "code": "PY"
    },
    {
        "name": "Peru",
        "code": "PE"
    },
    {
        "name": "Philippines",
        "code": "PH"
    },
    {
        "name": "Pitcairn",
        "code": "PN"
    },
    {
        "name": "Poland",
        "code": "PL"
    },
    {
        "name": "Portugal",
        "code": "PT"
    },
    {
        "name": "Puerto Rico",
        "code": "PR"
    },
    {
        "name": "Qatar",
        "code": "QA"
    },
    {
        "name": "Reunion",
        "code": "RE"
    },
    {
        "name": "Romania",
        "code": "RO"
    },
    {
        "name": "Russian Federation",
        "code": "RU"
    },
    {
        "name": "RWANDA",
        "code": "RW"
    },
    {
        "name": "Saint Helena",
        "code": "SH"
    },
    {
        "name": "Saint Kitts and Nevis",
        "code": "KN"
    },
    {
        "name": "Saint Lucia",
        "code": "LC"
    },
    {
        "name": "Saint Pierre and Miquelon",
        "code": "PM"
    },
    {
        "name": "Saint Vincent and the Grenadines",
        "code": "VC"
    },
    {
        "name": "Samoa",
        "code": "WS"
    },
    {
        "name": "San Marino",
        "code": "SM"
    },
    {
        "name": "Sao Tome and Principe",
        "code": "ST"
    },
    {
        "name": "Saudi Arabia",
        "code": "SA"
    },
    {
        "name": "Senegal",
        "code": "SN"
    },
    {
        "name": "Serbia",
        "code": "RS"
    },
    {
        "name": "Seychelles",
        "code": "SC"
    },
    {
        "name": "Sierra Leone",
        "code": "SL"
    },
    {
        "name": "Singapore",
        "code": "SG"
    },
    {
        "name": "Slovakia",
        "code": "SK"
    },
    {
        "name": "Slovenia",
        "code": "SI"
    },
    {
        "name": "Solomon Islands",
        "code": "SB"
    },
    {
        "name": "Somalia",
        "code": "SO"
    },
    {
        "name": "South Africa",
        "code": "ZA"
    },
    {
        "name": "South Georgia and the South Sandwich Islands",
        "code": "GS"
    },
    {
        "name": "Spain",
        "code": "ES"
    },
    {
        "name": "Sri Lanka",
        "code": "LK"
    },
    {
        "name": "Sudan",
        "code": "SD"
    },
    {
        "name": "Suriname",
        "code": "SR"
    },
    {
        "name": "Svalbard",
        "code": "SJ"
    },
    {
        "name": "Swaziland",
        "code": "SZ"
    },
    {
        "name": "Sweden",
        "code": "SE"
    },
    {
        "name": "Switzerland",
        "code": "CH"
    },
    {
        "name": "Syrian Arab Republic",
        "code": "SY"
    },
    {
        "name": "Taiwan",
        "code": "TW"
    },
    {
        "name": "Tajikistan",
        "code": "TJ"
    },
    {
        "name": "Tanzania",
        "code": "TZ"
    },
    {
        "name": "Thailand",
        "code": "TH"
    },
    {
        "name": "Timor-Leste",
        "code": "TL"
    },
    {
        "name": "Togo",
        "code": "TG"
    },
    {
        "name": "Tokelau",
        "code": "TK"
    },
    {
        "name": "Tonga",
        "code": "TO"
    },
    {
        "name": "Trinidad and Tobago",
        "code": "TT"
    },
    {
        "name": "Tunisia",
        "code": "TN"
    },
    {
        "name": "Turkey",
        "code": "TR"
    },
    {
        "name": "Turkmenistan",
        "code": "TM"
    },
    {
        "name": "Turks and Caicos Islands",
        "code": "TC"
    },
    {
        "name": "Tuvalu",
        "code": "TV"
    },
    {
        "name": "Uganda",
        "code": "UG"
    },
    {
        "name": "Ukraine",
        "code": "UA"
    },
    {
        "name": "United Arab Emirates",
        "code": "AE"
    },
    {
        "name": "United Kingdom",
        "code": "GB"
    },
    {
        "name": "United States",
        "code": "US"
    },
    {
        "name": "Uruguay",
        "code": "UY"
    },
    {
        "name": "Uzbekistan",
        "code": "UZ"
    },
    {
        "name": "Vanuatu",
        "code": "VU"
    },
    {
        "name": "Vatican City State (Holy See)",
        "code": "VA"
    },
    {
        "name": "Venezuela",
        "code": "VE"
    },
    {
        "name": "Viet Nam",
        "code": "VN"
    },
    {
        "name": "Virgin Islands, British",
        "code": "VG"
    },
    {
        "name": "Virgin Islands, U.S.",
        "code": "VI"
    },
    {
        "name": "Wallis and Futuna",
        "code": "WF"
    },
    {
        "name": "Yemen",
        "code": "YE"
    },
    {
        "name": "Zambia",
        "code": "ZM"
    },
    {
        "name": "Zimbabwe",
        "code": "ZW"
    }
];


export const layerTypes = ['zip', 'geojson', 'kml', 'csv', 'wms'];

export abstract class DataTabAction {
    static readonly EXCEL_EXPORT = 'EXCEL_EXPORT';
    static readonly EXCEL_EXPORT_TITLE = 'Export to Excel';
    static readonly ADD_TO_MARKET_LIST = 'ADD_TO_MARKET_LIST';
    static readonly ADD_TO_MARKET_LIST_TITLE = 'Add to Marketing List';

    static readonly SEND_EMAIL = 'SEND_EMAIL';
    static readonly SEND_EMAIL_TITLE = 'Send Email';

    static readonly ADD_TO_ROUTE = 'ADD_TO_ROUTE';
    static readonly ADD_TO_ROUTE_TITLE = 'Add to Route';
    static readonly CHANGE_OWNER = 'CHANGE_OWNER';
    static readonly CHANGE_OWNER_TITLE = 'Change Owner';

    static readonly MANAGE_TERRITORY = 'MANAGE_TERRITORY';
    static readonly MANAGE_TERRITORY_TITLE = 'Manage Territory';

    static readonly EXECUTE_WORKFLOW = 'EXECUTE_WORKFLOW';
    static readonly EXECUTE_WORKFLOW_TITLE = 'Execute Workflow';

    static readonly CREATE_ACTIVITIES = 'CREATE_ACTIVITIES';
    static readonly CREATE_ACTIVITIES_TITLE = 'Create Activities';

    static readonly AUTO_SCHEDULING = 'AUTO_SCHEDULING';
    static readonly AUTO_SCHEDULING_TITLE = 'Auto Scheduling';

    static readonly WORK_ORDER = 'WORK_ORDER';
    static readonly WORK_ORDER_TITLE = 'Work Order';
}

export abstract class DataFilter {
    static readonly FILTER_ALL = 'FILTER_ALL'
    static readonly FILTER_VALID = 'FILTER_VALID'
    static readonly FILTER_INVALID = 'FILTER_INVALID'
}

export const EntityHardProperties = [
    { name: 'Address', value: 'Address' },
    { name: 'City', value: 'City' },
    { name: 'Country', value: 'Country' },
    { name: 'Distance', value: 'Distance' },
    { name: 'Email', value: 'Email' },
    { name: 'Entity Id', value: 'EntityId' },
    { name: 'Latitude', value: 'Latitude' },
    { name: 'Longitude', value: 'Longitude' },
    { name: 'Phone Number', value: 'Phonenumber' },
    { name: 'Post Code', value: 'PostCode' },
    { name: 'State', value: 'State' },
    { name: 'Title', value: 'Title' }
];

export const actionUniqueOther = "Other";
export const TEMPLATE_PORTAL = 'portal';
export const SAFE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

export abstract class MarkerKeys {
    static readonly PUSH_PIN = 'PushPin';
    static readonly RELATED_RECORD_PUSH_PIN = 'PushPinRelatedRecord';
    static readonly SHAPE_EDITOR_PUSH_PIN = 'ShapeEditorPushPin';
    static readonly ENTITY_LOCATION = 'ENTITY_LOCATION';
    static readonly SHAPE_PUSH_PIN = 'ShapePushPin';
    static readonly GRAVE_PUSH_PIN = 'GravePushPin';
    static readonly GRAVE_POLYGON = 'GravePolygon';

    static readonly CSV_SHAPE = 'CsvPin';
    static readonly ANNOTATION_PIN = 'AnnotatePin';
    static readonly OBJECT_PIN = 'ObjectPin';
    static readonly DRAWING_SHAPE = 'DrawingShapes';
    static readonly ANNOTATION_SHAPE = 'AnnotationShapes';

    static readonly AREA_BOUNDARY = 'Boundary';
    static readonly JOINING_PLACE = 'ConnectedPlace';

    static readonly TRAFFIC_INCIDENT = 'TRAFFIC_INCIDENT';
    static readonly ROUTE_PATH = 'ROUTE_PATH';
    static readonly ROUTE_FOCUS_POINT = 'ROUTE_FOCUS_POINT';
    static readonly ROUTE_END_POINT = 'ROUTE_END_POINT';
    static readonly FOCUS_POINT = 'FOCUS_POINT';
    static readonly ROUTE_POINTS = 'ROUTE_POINTS';

    static readonly ARC_GIS_LAYER = 'ARC_GIS_LAYER';
    static readonly WMS_LAYER = 'WMS_LAYER';
    static readonly WFS_LAYER = 'WFS_LAYER';
    static readonly WMTS_LAYER = 'WMTS_LAYER';
    static readonly FILES_LAYER = 'FILES_LAYER';

    static readonly CSV_PIN = 'CsvPin';
    static readonly CURRENT_LOC_PIN = 'CURRENT_LOC_PIN';
    static readonly ANY_LOC_PIN = 'ANY_LOC_PIN';
    static readonly CONNECTED_LINE = 'CONNECTED_LINE';
}

export abstract class LayerMetaAttribute {
    static readonly STROKE = 'stroke';
    static readonly STROKE_WIDTH = 'stroke-width';
    static readonly STROKE_OPACITY = 'stroke-opacity';
    static readonly FILL = 'fill';
    static readonly FILL_OPACITY = 'fill-opacity';
    static readonly Metadata_Style = 'MetadataStyle';

}

export abstract class LayerTypes {
    static readonly CLUSTER = 'CLUSTER';
}

export abstract class DrawingColor {
    static readonly ROUTE_START_POINT_BACKGROUND = '#107c10';
    static readonly ROUTE_INTERNAL_POINT_BACKGROUND = '#2167ff';
    static readonly ROUTE_END_POINT_BACKGROUND = '#e12d30';
    static readonly WHITE = '#FFF';
    static readonly BLACK = '#000';
    static readonly LIGHT_BLUE = 'LightBlue';
    static readonly BLUE = 'Blue';
    static readonly LINE_COLOR = '#00FF00';
    static readonly STROKE_COLOR = '#0069D9';
}

export abstract class AlertTitle {
    static readonly TRAIL_REQUEST = 'Trail Request';
    static readonly ACTIVATION = 'Activation';
    static readonly CONFIGURATION = 'Configuration';
    static readonly LICENSE = 'License';
    static readonly TEAM = 'Team';
    static readonly TEAM_MEMBER = 'Team Member';
    static readonly SAVE_TERRITORY = 'Sale Territory';
    static readonly MAP_KEY = 'Map Key';
    static readonly CHANGE_OWNER = 'Change Owner';
    static readonly ERROR = 'Error';
    static readonly SEARCH_RESULT = 'Search Result';
    static readonly INFO_BOX_ACTION = 'InfoBox Action';
    static readonly QUESTIONNAIRE = 'Questionnaire';
    static readonly WORK_ORDER = 'Work Order';
    static readonly QUERY_BUILDER = 'Query Builder';
    static readonly MARKETING_LIST = 'Marketing List';
    static readonly LOCATION_SERVICE = 'Location Service';
    static readonly REPORT_FILTER = 'Report Filter';
}

export abstract class AppMessage {
    static readonly TRAIL_REQUEST_SUCCESS = 'Trail Request has been processed successfully. Please check your email for License Key.';
    static readonly TRAIL_REQUEST_EXISTING = 'Trail Request has been processed successfully. Please use existing License Key.';
    static readonly TRAIL_REQUEST_FAILED = 'Failed to process Trail Request, please contact to MapTaskr (http://www.maptaskr.com) for support.';

    static readonly TRAIL_LICENSE_EXPIRED = 'Maptaskr trial license expired, please contact Maptaskr (http://www.maptaskr.com) to renew license.';
    static readonly TRAIL_ACTIVATED = 'Trial license has been activated. To get full license, please contact Maptaskr (http://www.maptaskr.com).';
    static readonly LICENSE_ACTIVATED = 'License has been activated. Please configure to access Maptaskr.';
    static readonly LICENSE_EXPIRED = 'Maptaskr license expired. please contact Maptaskr (http://www.maptaskr.com) to renew license.';
    static readonly LICENSE_ACTIVATION_FAILED = 'Failed to activate license. Please contact Maptaskr (http://www.maptaskr.com) for support.'
    static readonly INVALID_LICENSE_KEY = 'Invalid license key. Please contact Maptaskr (http://www.maptaskr.com) for support.'
    static readonly NOT_ACTIVATED = 'Maptaskr is not activated yet. Please activate and configure Maptaskr.';
    static readonly UNAUTHORIZED_USER = "You don't have license to use Maptaskr. Please ensure you are the member of your desired team.";

    static readonly UNAUTHORIZED_FEATURE = "You don't have license to use this feature. Please ensure you have a Maptaskr Field Sales or Field Engineer license assigned.";

    static readonly CONFIGURATION_SUCCESS = 'Configuration has been setup successfully.';
    static readonly CONFIGURATION_FAILED = 'Failed to configure Maptaskr. Please contact Maptaskr (http://www.maptaskr.com) for support.';


    static readonly INVALID_TEAM = "Please configure Maptaskr. If you have configured already, make sure a team with name 'Maptaskr' exists. Please follow Maptaskr documentation to setup Maptaskr team.";
    static readonly NO_BOUNDARY = 'No boundary found.';
    static readonly FAILED_GEOGRAPHY_VALIDATION = 'Failed to validate territory boundary.';
    static readonly SAVED_GEOGRAPHY = 'Geography has been saved successfully.';
    static readonly SAVE_ENTITY = 'Please save the entity first.';
    static readonly EMPTY_MAP_KEY = 'Bing map key is not provided. Please provide Bing map key in Configuration.';
    static readonly INVALID_MAP_KEY = 'Invalid map key, please contact your administrator.';
    static readonly CHANGE_RECORD_OWNER = 'Record Owner has been changed successfully.';
    static readonly FAILED_RECORD_OWNER = 'Failed to change Record Owner!';
    static readonly FAILED_TO_PLOT = 'Unable to plot. Please contact with system admin.';
    static readonly FAILED_TO_SEARCH = 'We couldn’t find any results. Please try again.';
    static readonly NO_RECORD_FOUND_SEARCH_AREA = 'No records found within the search area.';
    static readonly NO_VALID_ADDRESS_FOUND = 'Address is not valid. Please try with correct region.';
    static readonly SAME_START_FINISH_ADDRESS_FOUND = 'Your starting and ending locations are the same.';
    static readonly ALL_LOCATION_ARE_SAME = 'All your route locations are the same.';


    static readonly NO_BOUNDARY_FOUND = 'Unable to determine the region. Please try again.';
    static readonly LOCATION_DISABLED = 'Your location could not be determined.';
    static readonly NO_ROUTE_FOUND = "We can't find directions for this journey. Check your waypoints and route options and try again.";
    static readonly UNSCHEDULE_ROUTE = 'You are not able to reach any location within this duration';
    static readonly START_ROUTE_ONLY = 'You can only able to reach start location within this duration';
    static readonly DISABLE_VIEW = 'The selected query is disabled from data source. Please update settings or contact administrator';
}

export abstract class LogicalEntityName {
    static readonly ACCOUNT = 'account';
    static readonly CONTACT = 'contact';
    static readonly LEAD = 'lead';
    static readonly COMPETITOR = 'competitor';
    static readonly ASSET = 'msdyn_customerasset';
    static readonly WORK_ORDER = 'msdyn_workorder';
    static readonly APPOINTMENT = 'appointment';
    static readonly OPPORTUNITY = 'opportunity';
    static readonly TASK = 'task';
    static readonly EMAIL = 'email';
    static readonly PHONECALL = 'phonecall';
}

export const DEFAULT_ENTITIES = [LogicalEntityName.ACCOUNT, LogicalEntityName.CONTACT, LogicalEntityName.LEAD, LogicalEntityName.COMPETITOR];

export abstract class GeoJsonGeometryType {
    static readonly POLYGON = 'Polygon';
    static readonly MULTI_POLYGON = 'MultiPolygon';
    static readonly POINT = 'Point';
    static readonly MULTI_POINT = 'MultiPoint';
    static readonly LINE_STRING = 'LineString';
    static readonly MULTI_LINE_STRING = 'MultiLineString';

    static readonly FEATURE = 'Feature';
    static readonly FEATURE_COLLECTION = 'FeatureCollection';

    //Custom
    static readonly CIRCLE = 'Circle';
}
// export abstract class LayerType

export abstract class LocalStorageNames {
    static readonly MapDataRecords = 'mapDataRecords';
    static readonly MapDataConfig = 'mapDataConfig';
}
export const IconSupportedTypes = ['png', 'jpeg'];

export abstract class ConfigurationKeys {
    static readonly HAS_CONFIGURED = 'has_configured';

    static readonly BASE_MAP_TYPE = 'base_map_type';
    static readonly BASE_MAP_VIEW_TYPE = 'base_map_view_type';

    static readonly BASE_MAP_KEY = 'base_map_key';
    static readonly AZURE_MAPS_KEY = 'azure_maps_key';
    static readonly BLOB_KEY = 'blob_key';
    static readonly GOOGLE_MAP_KEY = 'google_map_key';

    static readonly DEFAULT_MAP_VIEW = 'default_map_view';
    static readonly GEOCODE_MAP_TYPE = 'geocode_map_type';
    static readonly PROXIMITY_TYPE = 'proximity_type';

    static readonly DISPLAY_PUSHPIN_LABEL = 'display_pushpin_label';
    static readonly LOAD_DEFAULT_QUERY = 'load_default_query'
    static readonly IS_CLASSIC_PUSH_PIN = 'is_classic_push_pin';
    static readonly CLUSTER_DISTANCE = 'cluster_distance';

    static readonly IS_QUICK_SEARCH_SHOW = 'is_quick_search_show';
    static readonly IS_ANNOTATION_TAB_SHOW = 'is_annotation__tab_show';
    static readonly IS_LIBRARY_TAB_SHOW = 'is_library_tab_show';
    static readonly LOCATION_WITHIN = 'location_within'
    static readonly AUTH_CLIENT_CODE = 'auth_client_code'

    static readonly DEFAULT_QUICK_SEARCH_COUNTRY = 'default_quick_search_country';

    static readonly DEFAULT_TAB_SELECTION_TYPE = 'default_tab_selection_type';

    static readonly IS_REGION_TAB_SHOW = 'is_region_tab_show';
    static readonly IS_DRAW_TAB_SHOW = 'is_draw_tab_show';
    static readonly IS_TERRITORY_TAB_SHOW = 'is_territory_tab_show';
    static readonly LAYER_PROXY_URL = 'layer_proxy_url';
    static readonly SHOW_PHONE_NUM = 'show_phone_num';
    static readonly CHANGE_APPOINTMENT_STYLE = 'change_appointment_style';
    static readonly NUMBER_OF_RECORDS = 'number_of_records';
}

export abstract class OperatorNames {
    static readonly EQUAL = 'eq';
    static readonly NOT_EQUAL = 'ne';
    static readonly CONTAINS = 'contains';
    static readonly DOES_NOT_CONTAIN = 'doesnotcontain';
    static readonly BEGINS_WITH = 'beginswith';
    static readonly DOES_NOT_BEGIN_WITH = 'doesnotbeginwith';
    static readonly ENDS_WITH = 'endswith';
    static readonly DOES_NOT_END_WITH = 'doesnotendwith';

    static readonly GREATER_THAN = 'gt';
    static readonly GREATER_THAN_OR_EQUAL = 'ge';
    static readonly LESS_THAN = 'lt';
    static readonly LESS_THAN_OR_EQUAL = 'le';

    static readonly ON = 'on';
    static readonly ON_OR_AFTER = 'on-or-after';
    static readonly ON_OR_BEFORE = 'on-or-before';

    static readonly CONTAIN_DATA = 'not-null';
    static readonly DOES_NOT_CONTAIN_DATA = 'null';
}

export abstract class EntityNames {
    static readonly MaptaskrCheckIn = 'maptaskr_checkin';
    static readonly MaptaskrQuestionnaire = 'maptaskr_questionnaire';
    static readonly MaptaskrQuestionnaireAnswer = 'maptaskr_questionnaire_answer';
    static readonly Solution = 'solution';
}

export abstract class LayerSections {
    static readonly myLayer = "my";
    static readonly cpLayer = "cpl";
}

export abstract class AccessDevice {
    static readonly Windows = "Windows";
    static readonly Android = "Android";
    static readonly IOS = "IOS";
    static readonly Other = "Other";
}

export abstract class ProximityTypeNames {
    static readonly KM = 'km';
    static readonly MILES = 'mi';
}

export abstract class RegionTypes {
    static readonly PopulatedPlace = 'PopulatedPlace';
    static readonly AdminDivision1 = 'AdminDivision1';
    static readonly Postcode1 = 'Postcode1';
    static readonly CountryRegion = 'CountryRegion';
}

export abstract class MatToolTipPosition {
    static readonly After = 'after';
    static readonly Before = 'before';
    static readonly Above = 'above';
    static readonly Below = 'below';
    static readonly Left = 'left';
    static readonly Right = 'right';
}