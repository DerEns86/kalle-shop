import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductInterface } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http: HttpClient = inject(HttpClient);

  private productsSubject: BehaviorSubject<ProductInterface[]> =
    new BehaviorSubject<ProductInterface[]>([]);
  products$: Observable<ProductInterface[]> =
    this.productsSubject.asObservable();

  private allProducts: ProductInterface[] = [];
  private displayCount = 5;

  public canLoadMoreSignal = signal<boolean>(true);

  loadAllProducts(): void {
    this.http
      .get<ProductInterface[]>('https://fakestoreapi.com/products')
      .subscribe((products) => {
        this.allProducts = products;
        this.updateDisplayedProducts();
      });
  }

  loadMoreProducts(): void {
    this.displayCount += 5;
    this.updateDisplayedProducts();

    if (this.displayCount >= this.allProducts.length) {
      this.canLoadMoreSignal.set(false);
    }
  }

  private updateDisplayedProducts(): void {
    const displayedProducts = this.allProducts.slice(0, this.displayCount);
    this.productsSubject.next(displayedProducts);
  }
}
