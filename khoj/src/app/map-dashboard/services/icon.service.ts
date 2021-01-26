import { Injectable } from '@angular/core';
import { BaseService } from '../../core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(private baseService: BaseService) { }

  getAll() {
    const url = '';
    return this.baseService.get(url, 'icon.json');
  }

  getDocumentBody(icon: any) {
    return 'data:image/png;base64,' + icon.documentbody;
  }
}
