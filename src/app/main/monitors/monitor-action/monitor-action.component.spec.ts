import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorActionComponent } from './monitor-action.component';

describe('MonitorActionComponent', () => {
  let component: MonitorActionComponent;
  let fixture: ComponentFixture<MonitorActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
