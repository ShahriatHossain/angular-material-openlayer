import { ValueTextPair, Configuration } from '../models/common.models';
import { ProximityType } from '../enums/index.enum';
import { EARTH_RADIUS_IN_KILOMETERS, EARTH_RADIUS_IN_MILES, ProximityTypeNames, RegionTypes } from '../constants/index.constant';
import { StringUtils } from './string.utils';
import { Region } from '../models/index.models';

/**
 * App utility class
 */
export class AppUtils {

    /**
     * Get proximity types
     */
    static getProximityTypes() {
        let proximityTypes = <ValueTextPair<ProximityType, string>[]>[];
        proximityTypes.push(new ValueTextPair(ProximityType.Miles, 'Miles'));
        proximityTypes.push(new ValueTextPair(ProximityType.Kilometers, 'Kilometers'));

        return proximityTypes;
    }

    /**
     * Get configuration value by key
     * @param configurations 
     * @param key 
     */
    static getValueByKey(configurations: Configuration[], key: string) {
        const configuration = configurations.find(f => f.key == key);
        return configuration ? configuration.value : '';
    }

    /**
     * Get earth radius
     * @param proximityType 
     */
    static getEarthRadius(proximityType: ProximityType): number {
        switch (proximityType) {
            case ProximityType.Kilometers:
                return EARTH_RADIUS_IN_KILOMETERS;
            case ProximityType.Miles:
            default:
                return EARTH_RADIUS_IN_MILES;
        }
    }

    /**
     * Get proximity label
     * @param proximityType 
     */
    static getProximityLabel(proximityType) {
        switch (proximityType) {
            case ProximityType.Kilometers: return ProximityTypeNames.KM;
            case ProximityType.Miles:
            default: return ProximityTypeNames.MILES;
        }
    }

    /**
     * Generate region
     * @param region 
     */
    static generateRegion(region: Region): string {
        return `${StringUtils.nullToString(region.city)} ${StringUtils.nullToString(region.state)} ${StringUtils.nullToString(region.postCode)} ${StringUtils.nullToString(region.country)}`;
    }

    /**
     * Get region type
     * @param region 
     */
    static getRegionType(region: Region): string {
        var regionType = RegionTypes.PopulatedPlace;
        if (StringUtils.isNullOrEmpty(region.city) && StringUtils.isNullOrEmpty(region.postCode) && !StringUtils.isNullOrEmpty(region.state)) {
            regionType = RegionTypes.AdminDivision1;
        } else if (StringUtils.isNullOrEmpty(region.city) && !StringUtils.isNullOrEmpty(region.postCode)) {
            regionType = RegionTypes.Postcode1;
        } else if (StringUtils.isNullOrEmpty(region.city) && StringUtils.isNullOrEmpty(region.postCode) && StringUtils.isNullOrEmpty(region.state) && !StringUtils.isNullOrEmpty(region.country)) {
            regionType = RegionTypes.CountryRegion;
        }

        return regionType;
    }
}