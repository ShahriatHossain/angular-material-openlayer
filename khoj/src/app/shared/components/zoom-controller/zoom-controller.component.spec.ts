import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomControllerComponent } from './zoom-controller.component';

describe('ZoomControllerComponent', () => {
  let component: ZoomControllerComponent;
  let fixture: ComponentFixture<ZoomControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
