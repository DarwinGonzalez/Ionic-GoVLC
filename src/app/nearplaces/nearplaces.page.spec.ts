import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearplacesPage } from './nearplaces.page';

describe('NearplacesPage', () => {
  let component: NearplacesPage;
  let fixture: ComponentFixture<NearplacesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearplacesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearplacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
