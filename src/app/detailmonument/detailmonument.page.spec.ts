import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailmonumentPage } from './detailmonument.page';

describe('DetailmonumentPage', () => {
  let component: DetailmonumentPage;
  let fixture: ComponentFixture<DetailmonumentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailmonumentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailmonumentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
