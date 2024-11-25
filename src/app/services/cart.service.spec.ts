import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { ProductInterface } from '../models/product.interface';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should increase the amount if product already exists in the cart', () => {
    const product: ProductInterface = {
      id: 1,
      title: 'Product 1',
      price: 100,
      description: 'A test product',
      category: 'test-category',
      image: 'test-image',
      rating: { rate: 4.5, count: 10 },
    };

    service.addProduct(product);
    service.addProduct(product); // Adding the same product again

    const cart = service.cartSignal();
    expect(cart.length).toBe(1); // Still one product in the cart
    expect(cart[0]).toEqual({ product, amount: 2 }); // Quantity increased
  });

  it('should update totalItemsSignal when products are added', () => {
    const product1: ProductInterface = {
      id: 1,
      title: 'Product 1',
      price: 100,
      description: 'A test product',
      category: 'test-category',
      image: 'test-image',
      rating: { rate: 4.5, count: 10 },
    };
    const product2: ProductInterface = {
      id: 2,
      title: 'Product 2',
      price: 50,
      description: 'Another test product',
      category: 'test-category',
      image: 'test-image',
      rating: { rate: 4.0, count: 20 },
    };

    service.addProduct(product1);
    service.addProduct(product2);

    const totalItems = service.totalItemsSignal();
    expect(totalItems).toBe(2); // 2 items in total (1 each)
  });

  it('should emit the correct total items in totalItems$', (done) => {
    const product: ProductInterface = {
      id: 1,
      title: 'Product 1',
      price: 100,
      description: 'A test product',
      category: 'test-category',
      image: 'test-image',
      rating: { rate: 4.5, count: 10 },
    };

    service.addProduct(product);

    service.totalItems$.subscribe((totalItems) => {
      expect(totalItems).toBe(1);
      done();
    });
  });

  it('should decrease the amount of a product', () => {
    const product: ProductInterface = {
      id: 1,
      title: 'Product 1',
      price: 100,
      description: 'A test product',
      category: 'test-category',
      image: 'test-image',
      rating: { rate: 4.5, count: 10 },
    };

    service.addProduct(product);
    service.addProduct(product);
    service.decreaseAmount(0);

    const cart = service.cartSignal();
    expect(cart.length).toBe(1);
    expect(cart[0]).toEqual({ product, amount: 1 });
  });

  it('should increase the amount of a product', () => {
    const product: ProductInterface = {
      id: 1,
      title: 'Product 1',
      price: 100,
      description: 'A test product',
      category: 'test-category',
      image: 'test-image',
      rating: { rate: 4.5, count: 10 },
    };

    service.addProduct(product);
    service.increaseAmount(0);

    const cart = service.cartSignal();
    expect(cart.length).toBe(1);
    expect(cart[0]).toEqual({ product, amount: 2 });
  });

  it('should remove a product from the cart', () => {
    const product1: ProductInterface = {
      id: 1,
      title: 'Product 1',
      price: 100,
      description: 'A test product',
      category: 'test-category',
      image: 'test-image',
      rating: { rate: 4.5, count: 10 },
    };
    const product2: ProductInterface = {
      id: 2,
      title: 'Product 2',
      price: 50,
      description: 'Another test product',
      category: 'test-category',
      image: 'test-image',
      rating: { rate: 4.0, count: 20 },
    };

    service.addProduct(product1);
    service.addProduct(product2);
    service.removeProduct(0);

    const cart = service.cartSignal();
    expect(cart.length).toBe(1);
    expect(cart[0]).toEqual({ product: product2, amount: 1 });
  });
});
