export enum ConfigurationTab {
  Registration = 1,
  License,
  //Configuration,
  Users,
  AdvancedSettings,
  InfoboxActions,
  CaptureShapeData,
  PowerBIReport,
  DataTabAction
}

export enum MapType {
  Road = 1,
  Satellite = 2
}

export enum SearchType {
  SearchByAddress = 1,
  SearchByRegion = 2,
  SearchByTerritory = 3,
  DrawAndSearch = 4,
  Annotation = 5,
  SetPushPin = 6,
  Upload = 7,
  QuickSearch = 8
}

export enum ProximityType {
  None = 0,
  Miles = 1,
  Kilometers = 2,
  Hours = 3,
  Minutes = 4
}
export enum TabSelectionType {
  NewSearch = 'New Search',
  SavedSearch = 'Saved Search',
  NewRoute = 'New Route',
  SavedRoute = 'Saved Route',
  MySchedule = 'My Schedule',
  TeamSchedule = 'Team Schedule',
  Annotations = 'Annotations',
  Layers = 'Layers'
}

export enum ListEntityType {
  Account = 1,
  Contact = 2,
  Lead = 4
}
export enum MessageType {
  Info = 0,
  Warning = 1,
  Error = 2,
  Success = 3
}

export enum SaveQueryType {
  New = 0,
  Edit = 1,
  SaveAs = 2
}

export enum PeoplePickerLoaderType {
  AssignTo = 0,
  ShareIt = 1
}

export enum LayerFileType {
  Zip = 0,
  Geojson = 1,
  Kml = 2,
  Csv = 3,
  Wms = 4,
  ArcGis = 5,
  Wfs = 6,
  Wmts = 7
}
export enum LayerSubFileType {
  Wms = 1,
  Wfs = 2,
  Wmts = 3,
  Default = 4
}

export enum LayerServiceFileType {
  Wms = 4,
  ArcGis = 5
}
export enum IconType {
  PushPin = 1,
  ObjectLibrary = 2,
  EntityProperty = 3
}

export enum BaseMapType {
  Bing = 'Bing',
  AzureMaps = 'Azure Maps',
  OpenStreet = 'OpenStreet',
  ArcGIS = 'ArcGIS'
}

export enum GeoCodeMapType {
  Bing = 'bing',
  Google = 'google'
}

export enum FlagType {
  YES = 'YES',
  NO = 'NO'
}

export enum GraveCellType {
  Pin = 0,
  Grid = 1
}

export enum ConfigurationType {
  Default = 1,
  DataTab = 2
}

export enum InfoboxTabs {
  Actions = 1,
  Reports = 2,
  Details = 3,
  Notes = 4,
}

export enum InfoboxStaticTabs {
  Actions = 'actions',
  Details = 'details',
  Reports = 'reports',
  Notes = 'notes',
  Posts = 'posts'
}

export enum DPropertyValueType {
  EntityProperty = 'property',
  CustomJs = 'customjs'
}

export enum DataSourceType {
  View = 0,
  Expression = 1
}

export enum AssignToType {
  User = 1,
  Team = 2,
  UserOrTeam = 3
}

export enum LicenseTypes {
  FieldSales = 2,
  FieldEngineer = 3
}

export enum LayerType {
  File = 1,
  Service = 2
}

export enum PriorityType {
  Low = 0,
  Normal = 1,
  High = 2
}

//UI
export enum ActivityType {
  Appointment = 'appointment',
  ServiceActivity = 'serviceactivity'
  // BookableResourceBooking='Bookable Resource Booking'
}

//CRM
export enum ActivityTypeCode {
  Task = 'task',
  Letter = 'letter',
  Email = 'email',
  Fax = 'fax',
  PhoneCall = 'phonecall',
  Appointment = 'appointment',
  ServiceAppointment = 'serviceappointment'
}

export enum ServiceInitStatus {
  Requested = 1,
  Tentative = 2,
  Pending = 3,
  Reserved = 4,
  InProgress = 6,
  Arrived = 7,
  Completed = 8,
  Canceled = 9,
  NoShow = 10
}

export enum ParticipationTypeMask {
  Sender = 1, //Specifies the sender.
  ToRecipient = 2, //Specifies the recipient in the To field.
  CCRecipient = 3, //Specifies the recipient in the Cc field.
  BccRecipient = 4, //Specifies the recipient in the Bcc field.
  RequiredAttendee = 5, //Specifies a required attendee.
  OptionalAttendee = 6, //Specifies an optional attendee.
  Organizer = 7, //Specifies the activity organizer.
  Regarding = 8, //Specifies the regarding item.
  Owner = 9, //Specifies the activity owner.
  Resource = 10, //Specifies a resource.
  Customer = 11 //Specifies a customer.
}

export enum ActivityStatus {
  Open = 1,
  Completed = 2,
  Canceled = 3,
  Scheduled = 4
}

export enum RelationalDataDisplayType {
  Map = 1,
  List = 2
}

export enum LicenseStatus {
  Activated = 1,
  NotActivated = 2,
  Trail = 3,
  Expired = 4
}

export enum RelationshipType {
  OneToMany = 'OneToManyRelationship',
  ManyToOne = 'ManyToOneRelationship',
  ManyToMany = 'ManyToManyRelationship'
}

export enum MenuKey {
  None = '',
  SearchQuery = 'search-query',
  RoutePlanner = 'route-planner',
  Schedule = 'schedule',
  Annotations = 'annotations',
  SidebarLayer = 'sidebar-layer',
  SubLayer = 'layer-sub-item',
  QuickSearch = 'quick-search'
}
export enum SubMenuKey {
  NewSearch = 'new-search',
  SaveQuery = 'saved-search',
  NewRoute = 'new-route',
  SavedRoute = 'saved-route',
  MySchedule = 'my-schedule',
  TeamSchedule = 'team-schedule'
}

export enum NavState {
  Toggle = 0,
  Show = 1,
  Hide = 2
}

export enum ShapeFileType {
  KML = 'KML',
  GeoJson = 'GeoJson',
  ShapeFile = 'ShapeFile'
}

export enum DrawingMode {
  None = 0,
  Pushpin = 1,
  LineString = 2,
  MeasurementLineString = 7,
  Polyline = 12,
  GridLineString = 10,
  Polygon = 3,
  MeasurementPolygon = 8,
  GridPolygon = 11,
  Circle = 4,
  Rectangle = 5,
  FreeHand = 6,
  MeasurementFreeHand = 9,
  Edit = 13,
  Erase = 14,
  Text = 15
}
//For UI
export enum EnumGroup {
  Layer = 1,
  SaveSearch = 2,
  ObjectLibrary = 3,
  Route = 4
}

//Map to server data
export enum GroupType {
  CorporateLayer = 1,
  MyLayer = 2,
  MySaveSearch = 3,
  GlobalSaveSearch = 4,
  ObjectLibrary = 5,
  Route = 6
}

export enum GeometryType {
  Point = 'Point',
  Circle = 'Circle',
  Polygon = 'Polygon',
  LineString = 'LineString',
  LinearRing = 'LinearRing',
  MultiPoint = 'MultiPoint',
  MultiLineString = 'MultiLineString',
  MultiPolygon = 'MultiPolygon',
  GeometryCollection = 'GeometryCollection'
}

export enum AssignToTypeStr {
  User = 'User',
  Team = 'Team'
}

export enum LayerKey {
  MarkerId = 'MarkerId',
  TextMarkerKey = 'TextMarkerKey',
  MarkerKey = 'MarkerKey',
  DrawingMode = 'DrawingMode',
  LayerType = 'LayerType',
  LayerId = 'LayerId',
  Metadata = 'metadata',
  MetadataStyle = 'MetadataStyle',
  Name = 'name',
  DocumentBody = 'DocumentBody',
  OriginalPoint = 'ORIGINAL_POINT',
  SubLayerId = 'SUB_LAYER_ID',
}

export enum OpenFormType {
  Generic = 1,
  WorkOrder
}

export enum ViewType {
  System = 1,
  Personal = 2
}

export enum ClientType {
  Web = 'Web',
  Outlook = 'Outlook',
  Mobile = 'Mobile'
}

export enum IconSizeGroup {
  S16 = '16 * 16',
  S24 = '24 * 24',
  S32 = '32 * 32',
  // S64 = '64 * 64',
  // S128 = '128 * 128',
  // S256 = '256 * 256',
  // S512 = '512 * 512'
}
export enum DataType {
  Text = 1,
  DateTime = 2,
  Boolean = 3,
  Contain = 4,
  DoesNotContain = 5,
  Number = 6,
  OptionSet = 7,
  Lookup = 8,
  Virtual = 9,
  Memo = 10,
  Owner = 11,
  Customer = 12

}

export enum EntityAttributeType {
  Virtual = 'Virtual',
  PickList = 'Picklist',
  String = 'String',
  UniqueIdentifier = 'Uniqueidentifier',
  Integer = 'Integer',
  Lookup = 'Lookup',
  Money = 'Money',
  Double = 'Double',
  EntityName = 'EntityName',
  DateTime = 'DateTime',
  Boolean = 'Boolean',
  BigInt = 'BigInt',
  //Status = 'Status',
  Decimal = 'Decimal',
  Memo = 'Memo',
  Owner = 'Owner',
  //State = 'State',
  Customer = 'Customer',
  Bit = 'bit',
  DateTimeSmall = 'datetime',
  PickListSmall = 'picklist',
}

export enum GeographySaveStatus {
  Saved = 'maptaskr-geography-saved',
  Failed = 'geography-save-failed',
  Upload = 'geography-file-upload'
}

export enum SortOrder {
  Undefined = 0,
  Ascending = 1,
  Descending = 2
}
export enum LocationError {
  USER_DENIED_GEOLOCATION = 1
}

export enum JoinOperator {
  And = 'and',
  Or = 'or'
}

export enum TemplateType {
  My = 1,
  Global = 2,
  Shared = 3
}
export enum CheckinCheckout {
  Checkin = 1,
  Checkout = 2,
}

export enum AnswerType {
  ChoiceField = 'Choice Field',
  TextField = 'Text Field',
  NumberField = 'Number Field',
  YesNoField = 'Yes / No Field',
  DateTimeField = 'DateTime Field'
}
export enum MetadataStyleType {
  Table = 'Table View',
  List = 'List View',
  Collapsable = 'Collapsable View',
}

export enum MarketingListType {
  Static = 0,
  Dynamic = 1
}

export enum PinType {
  Palette = 'palette',
  Room = 'room'
}