import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Configuration } from '../models/common.models';

@Injectable({
  providedIn: 'root'
})

/**
 * Configuration service
 */
export class ConfigurationService {
  configurations: Configuration[] = <Configuration[]>[];

  /**
   * Create instance of Configuration
   * @param baseService 
   */
  constructor(private baseService: BaseService) { }

  /**
   * Get configurations
   */
  getAll() {
    const url = '';
    this.baseService.get(url, 'configuration.json').subscribe((data: Configuration[]) => {
      this.configurations = data;
    })
  }
}
