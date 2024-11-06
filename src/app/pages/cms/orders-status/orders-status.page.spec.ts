import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersStatusPage } from './orders-status.page';

describe('OrdersStatusPage', () => {
  let component: OrdersStatusPage;
  let fixture: ComponentFixture<OrdersStatusPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrdersStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
