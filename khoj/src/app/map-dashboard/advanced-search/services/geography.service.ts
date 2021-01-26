import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/services/base.service';
import { Observable } from 'rxjs';
import { Geography, GeographyTbl } from 'src/app/core/models/advanced-search.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeographyService {

  /**
    * Create instance for Geography Service
    * @param baseService 
    */
  constructor(private baseService: BaseService) { }

  /**
   * Retrieve all geographies
   */
  getAll(): Observable<Geography[]> {
    const url = '';
    return this.baseService.get(url, 'geography.json')
      .pipe(
        map((res: GeographyTbl[]) => {
          return res.map(gpy => new Geography(gpy));
        })
      )
  }
}