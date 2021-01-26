import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/services/base.service';
import { Observable } from 'rxjs';
import { DatasourceTbl, Datasource } from 'src/app/core/models/advanced-search.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/**
 * Datasource Service
 */
export class DataSourceService {

  /**
   * Create instance of Datasource Service
   * @param baseService 
   */
  constructor(private baseService: BaseService) { }

  /**
   * Retrieve all datasources
   */
  getAll(): Observable<Datasource[]> {
    const url = '';
    return this.baseService.get(url, 'datasource.json')
      .pipe(
        map((res: DatasourceTbl[]) => {
          return res.map(d => new Datasource(d));
        })
      )
  }
}
