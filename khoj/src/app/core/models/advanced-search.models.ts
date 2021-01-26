import { SearchType, ProximityType, PinType } from '../enums/index.enum';
/**
 *  Advanced Search model
 */
export class AdvancedSearch {
    type: SearchType;
    city: string;
    state: string;
    country: string;
    address: string;
    postCode: string;
    territory: number;
    proximity: number;
    proximityType: ProximityType;
    categories: Category[];

    /**
     * Create instance of AdvancedSearch class
     */
    constructor(icon?: Icon) {
        this.type = SearchType.SearchByAddress;
        this.initCategories(icon);
    }

    /**
     * Initiate categories
     */
    private initCategories(icon?: Icon) {
        this.categories = <Category[]>[];
        this.categories.push(
            <Category>{
                datasourceId: undefined,
                icon: icon? icon: undefined,
                color: '#000000',
                iconType: PinType.Room
            }
        );
    }
}

export class Category {
    datasourceId: number;
    icon: Icon;
    color: string;
    iconType: string;
}

/**
 * Data Source model
 */
export class Datasource {

    /**
     * Create instance of Data Source with ORM 
     * @param ds 
     */
    constructor(tbl?: DatasourceTbl) {
        if (!tbl) return;
        this.id = tbl.id;
        this.name = tbl.entity_name;
        this.displayName = tbl.display_name;
        this.title = tbl.title;
        this.addressComposite = tbl.address_composite;
        this.city = tbl.city;
        this.country = tbl.country;
        this.email = tbl.email;
        this.latitude = tbl.latitude;
        this.longitude = tbl.longitude;
        this.postCode = tbl.postcode;
        this.state = tbl.state;
        this.street1 = tbl.street1;
        this.street2 = tbl.street2;
        this.street3 = tbl.street3;
        this.phone = tbl.phone;
        this.active = tbl.active;
    }

    id: number;
    name: string;
    displayName: string;
    title: string;
    addressComposite: string;
    city: string;
    country: string;
    email: string;
    latitude: string;
    longitude: string;
    postCode: string;
    state: string;
    street1: string;
    street2: string;
    street3: string;
    phone: string;
    pushpin: string;
    active: boolean;
}

/**
 * Data Source Table model
 */
export class DatasourceTbl {
    id: number;
    entity_name: string;
    display_name: string;
    title: string;
    address_composite: string;
    city: string;
    country: string;
    email: string;
    latitude: string;
    longitude: string;
    postcode: string;
    state: string;
    street1: string;
    street2: string;
    street3: string;
    phone: string;
    active: boolean;
}

/**
 * Icon class
 */
export class Icon {
    id: string;
    name: string;
    type: number;
    size: string;
    documentBody: string;
    active: boolean;

    /**
     * Create instance of Icon class
     * @param icon
     */
    constructor(tbl?: IconTbl) {
        if (!tbl) return;
        this.id = tbl.id;
        this.name = tbl.name;
        this.type = tbl.type;
        this.size = tbl.size;
        this.documentBody = this.customizeDocumentBody(tbl);
        this.active = tbl.active;
    }

    /** 
     * Format with base64
     */
    private customizeDocumentBody(icon: IconTbl): string {
        return 'data:image/png;base64,' + icon.documentbody;
    }
}

/**
 * Icon database table
 */
export class IconTbl {
    id: string;
    name: string;
    type: number;
    size: string;
    documentbody: string;
    active: boolean;
}

/**
 * Territory class
 */
export class Territory {
    id: number;
    name: string;
    description: string;
    parentTerritory: number;

    /**
     * Create instance of Territory
     */
    constructor(tbl?: TerritoryTbl) {
        this.id = tbl.id;
        this.name = tbl.name;
        this.description = tbl.description;
        this.parentTerritory = tbl.parent_territory;
    }
}

/**
 * Territory database table
 */
export class TerritoryTbl {
    id: number;
    name: string;
    description: string;
    parent_territory: number;
}

/**
 * Geography class
 */
export class Geography {
    id: number;
    name: string;
    parentTerritory: number;
    data: string;

    /**
     * Create instance of Geography 
     * @param tbl 
     */
    constructor(tbl?: GeographyTbl) {
        this.id = tbl.id;
        this.name = tbl.name;
        this.parentTerritory = tbl.parent_territory;
        this.data = tbl.data;
    }
}

/**
 * Geography database table
 */
export class GeographyTbl {
    id: number;
    name: string;
    parent_territory: number;
    data: string;
}