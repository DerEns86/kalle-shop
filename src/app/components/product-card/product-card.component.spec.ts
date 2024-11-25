import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { ProductInterface } from '../../models/product.interface';
import { CartService } from '../../services/cart.service';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  let mockCartService = {
    addProduct: jest.fn(),
    cartSignal: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [{ provide: CartService, useValue: mockCartService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a product on onAddProduct', () => {
    const product: ProductInterface = {
      id: 1,
      title: 'Article1',
      price: 10,
      description: 'Test Description',
      category: 'clothes',
      image: 'test_url',
      rating: {
        rate: 3,
        count: 20,
      },
    };
    component.onAddProduct(product);

    expect(mockCartService.addProduct).toHaveBeenCalledWith(product);
  });
});
