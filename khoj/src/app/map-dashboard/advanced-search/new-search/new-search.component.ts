import { Component, OnInit } from '@angular/core';

import { BingApiLoaderService } from '../../../core/services/bing-api-loader.service';
import { OlApiService } from '../../../core/services/ol-api.service';
import { DataSourceService } from '../services/data-source.service';
import { IconService } from '../../services/icon.service';
import { IconType, SearchType, ProximityType, PinType, DrawingMode } from '../../../core/enums/index.enum';
import { IconTbl, Icon, AdvancedSearch, Datasource, DatasourceTbl, Territory, TerritoryTbl, Category } from 'src/app/core/models/advanced-search.models';
import { ValueTextPair } from 'src/app/core/models/common.models';
import { AppUtils } from 'src/app/core/utils/app.utils';
import { CountryList, MatToolTipPosition, ConfigurationKeys } from 'src/app/core/constants/index.constant';
import { TerritoryService } from '../services/territory.service';
import { SearchHelperService } from '../services/search-helper.service';
import { ConfigurationService } from 'src/app/core/services/configuration.service';

@Component({
  selector: 'new-search',
  templateUrl: './new-search.component.html',
  styleUrls: ['./new-search.component.scss']
})

/**
 * New Search class
 */
export class NewSearchComponent implements OnInit {
  datasources: Datasource[] = <Datasource[]>[];
  pushpins: Icon[] = <Icon[]>[];
  search: AdvancedSearch;
  searchType: any;
  proximityTypes: ValueTextPair<ProximityType, string>[];
  countries: string[];
  territories: Territory[] = <Territory[]>[];
  toolPosition: string = MatToolTipPosition.Above;
  currentDrawingMode: DrawingMode;
  drawingModes: any;

  /**
   * Create instance of New Search class
   * @param bingApiLoader 
   * @param olApiService 
   * @param dataSourceService 
   * @param iconService 
   */
  constructor(
    private bingApiLoader: BingApiLoaderService,
    private olApiService: OlApiService,
    private dataSourceService: DataSourceService,
    private iconService: IconService,
    private territoryService: TerritoryService,
    private searchHelperService: SearchHelperService,
    private configService: ConfigurationService) { }

  /**
   * Execute after view initiate 
   */
  ngAfterViewInit() {
    this.bingApiLoader.load().then(() => {
      Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', () => {
        var options = {
          placeSuggestions: true,
          businessSuggestions: true,
          autoDetectLocation: true,
          showBingLogo: false
        };
        var manager = new Microsoft.Maps.AutosuggestManager(options);
        manager.attachAutosuggest('#searchBox', '#searchBoxContainer', (suggestionResult) => {
          this.search.address = suggestionResult.formattedSuggestion;
          this.olApiService.suggestLocation(suggestionResult);
        });
      });
    });
  }

  /**
   * Initialize after loading component
   */
  ngOnInit(): void {
    this.initSetting();
    this.getDatasources();
    this.getPushpins();
    this.getTerritories();
    this.configService.getAll();
  }

  /** Initialize default setting */
  private initSetting() {
    this.searchType = SearchType;
    this.proximityTypes = AppUtils.getProximityTypes();
    this.countries = CountryList.map(c => c.name);
    this.search = new AdvancedSearch(new Icon());
    this.drawingModes = DrawingMode;
  }

  /**
   * Retrieve territories from api
   */
  private getTerritories() {
    this.territoryService.getAll().subscribe(data => this.territories = data)
  }

  /**
   * Retrieve datasources from api
   */
  private getDatasources() {
    this.dataSourceService.getAll().subscribe(data => this.datasources = data);
  }

  /**
   * Retrieve pushpins from api
   */
  private getPushpins() {
    this.iconService.getAll().subscribe((data: IconTbl[]) => {
      this.pushpins = data.map(d => new Icon(d));
      this.pushpins = this.pushpins.filter(icon => icon.type === IconType.PushPin);

      // set default icon
      this.search = this.pushpins && this.pushpins[0] ?
        new AdvancedSearch(this.pushpins[0]) : new AdvancedSearch(new Icon());
    })
  }

  /**
   * Change icon from ui
   * @param icon 
   */
  selectIcon(icon: Icon, category: Category) {
    category.icon = icon;
  }

  /**
   * Add category
   */
  addCategory() {
    this.search.categories.push(
      <Category>{
        datasourceId: undefined,
        icon: this.pushpins && this.pushpins[0] ? this.pushpins[0] : undefined,
        color: '#000000',
        iconType: PinType.Room
      }
    );
  }

  /**
   * Remove category from category list
   * @param category 
   */
  removeCategory(category: Category) {
    const index = this.search.categories.indexOf(category, 0);
    if (index > -1) {
      this.search.categories.splice(index, 1);
    }
  }

  /**
   * Do search resources
   */
  doSearch() {
    console.log(this.search);
    this.searchHelperService.processSearch(this.search);
  }

  /**
   * Change search type
   * @param type 
   */
  onSearchTypeChange(type: number) {
    this.search.type = type;
  }

  /**
   * Set drawging mode
   * @param mode 
   */
  setDrawingMode(mode: DrawingMode) {
    if (mode == this.currentDrawingMode) mode = null;
    const proximityType = AppUtils.getValueByKey(this.configService.configurations, ConfigurationKeys.PROXIMITY_TYPE);
    this.currentDrawingMode = mode;

    this.olApiService.setSearchByShape(mode, Number(proximityType));
  }

  reset() {
    this.initSetting();
    this.olApiService.resetMap();
  }
}
