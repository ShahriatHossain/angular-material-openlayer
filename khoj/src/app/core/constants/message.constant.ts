export abstract class SuccessMessage {

}

export abstract class ErrorMessage {
    static readonly InvalidAddress = 'Required valid address.';
    static readonly InvalidDistance = 'Required valid distance.';
    static readonly InvalidProximityType = 'Required proximity type.';
    static readonly InValidCategoryType = 'Required category type.';
    static readonly InValidCountry = 'Required country.';
    static readonly InValidTerritory = 'Required territory.';
    static readonly InValidDrawShape = 'Required shape to draw on map.';
}

export abstract class WarningMessage {

}

export abstract class MessageTitle {
    static readonly Address = 'Address';
    static readonly Distance = 'Distance';
    static readonly ProximityType = 'Proximity Type';
    static readonly CategoryType = 'Category Type';
    static readonly Country = 'Country';
    static readonly Territory = 'Territory';
    static readonly DrawShape = 'Draw Shape';
}