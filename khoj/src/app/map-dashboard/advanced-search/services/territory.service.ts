import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/services/base.service';
import { TerritoryTbl, Territory } from 'src/app/core/models/advanced-search.models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Territory service
 */
export class TerritoryService {

  /**
   * Create instance for Territory Service
   * @param baseService 
   */
  constructor(private baseService: BaseService) { }

  /**
   * Retrieve all territories
   */
  getAll(): Observable<Territory[]> {
    const url = '';
    return this.baseService.get(url, 'territory.json')
      .pipe(
        map((res: TerritoryTbl[]) => {
          return res.map(tbl => new Territory(tbl));
        })
      )
  }
}
