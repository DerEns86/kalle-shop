import { Injectable, signal, WritableSignal } from '@angular/core';
import { ProductInterface } from '../models/product.interface';
import { CartItemInterface } from '../models/cartItem.interface';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartSignal: WritableSignal<CartItemInterface[]> = signal([]);
  public totalItemsSignal: WritableSignal<number> = signal(0);
  public totalItems$ = toObservable(this.totalItemsSignal);

  addProduct(newProduct: ProductInterface) {
    this.cartSignal.update((products: CartItemInterface[]) => {
      const productIndex = products.findIndex(
        (item) => item.product.id === newProduct.id,
      );
      if (productIndex !== -1) {
        return products.map((item, index) =>
          index === productIndex ? { ...item, amount: item.amount + 1 } : item,
        );
      } else {
        return [...products, { product: newProduct, amount: 1 }];
      }
    });
    this.setCartTotalItems();
  }

  setCartTotalItems() {
    let totalItems = 0;
    this.cartSignal().forEach((item: CartItemInterface) => {
      totalItems += item.amount;
    });
    this.totalItemsSignal.set(totalItems);
  }
}
