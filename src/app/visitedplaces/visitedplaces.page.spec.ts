import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitedplacesPage } from './visitedplaces.page';

describe('VisitedplacesPage', () => {
  let component: VisitedplacesPage;
  let fixture: ComponentFixture<VisitedplacesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitedplacesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitedplacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
