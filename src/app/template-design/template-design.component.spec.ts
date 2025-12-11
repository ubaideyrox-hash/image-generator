import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDesignComponent } from './template-design.component';

describe('TemplateDesignComponent', () => {
  let component: TemplateDesignComponent;
  let fixture: ComponentFixture<TemplateDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateDesignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
