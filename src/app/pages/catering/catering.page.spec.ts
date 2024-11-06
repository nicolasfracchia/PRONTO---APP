import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CateringPage } from './catering.page';

describe('CateringPage', () => {
  let component: CateringPage;
  let fixture: ComponentFixture<CateringPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CateringPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
