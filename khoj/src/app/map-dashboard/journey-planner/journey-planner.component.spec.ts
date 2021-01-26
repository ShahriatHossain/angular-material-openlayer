import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyPlannerComponent } from './journey-planner.component';

describe('JourneyPlannerComponent', () => {
  let component: JourneyPlannerComponent;
  let fixture: ComponentFixture<JourneyPlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneyPlannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
