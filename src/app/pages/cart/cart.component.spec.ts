import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { signal } from '@angular/core';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  let mockActivatedRoute = {};
  let mockCartService: jest.Mocked<CartService>;

  beforeEach(async () => {
    mockCartService = {
      decreaseAmount: jest.fn(),
      increaseAmount: jest.fn(),
      removeProduct: jest.fn(),
      cartSignal: signal([]),
    } as unknown as jest.Mocked<CartService>;

    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: CartService, useValue: mockCartService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call cartService.decreaseAmount with the correct index', () => {
    const index = 2;

    component.decreaseAmount(index);

    expect(mockCartService.decreaseAmount).toHaveBeenCalledWith(index);
  });

  it('should call cartService.increaseAmount with the correct index', () => {
    const index = 2;

    component.increaseAmount(index);

    expect(mockCartService.increaseAmount).toHaveBeenCalledWith(index);
  });

  it('should call cartService.removeProduct with the correct index', () => {
    const index = 2;

    component.deleteItem(index);

    expect(mockCartService.removeProduct).toHaveBeenCalledWith(index);
  });
});
