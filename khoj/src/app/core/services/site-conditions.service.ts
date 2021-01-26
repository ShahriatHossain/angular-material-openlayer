import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, from } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class SiteConditionsService {
  // _center = new BehaviorSubject<number[]>(null); // works
  _center = new BehaviorSubject<number[]>([41.49871231510167, -72.95581850473526]); // doesn't work
  _heading = new BehaviorSubject<number>(0);

  center$ = this._center.asObservable();
  heading$ = this._heading.asObservable();

  constructor() {
    this.getInitialCenter(0).subscribe(initialCenter => {
      this._center.next(initialCenter);
    })
  }

  getInitialCenter(reportId): Observable<number[]> {
    // would come from HTTP service
    const center = [41.49871231510167, -72.95581850473526];
    return from<number[][]>([center]).pipe(delay(2000));
  }
}

