import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionsPage } from './sections.page';

describe('SectionsPage', () => {
  let component: SectionsPage;
  let fixture: ComponentFixture<SectionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SectionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
