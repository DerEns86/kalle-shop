import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductInterface } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http: HttpClient = inject(HttpClient);

  private readonly BASE_URL: string = 'https://fakestoreapi.com/';

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

  loadSingleProduct(id: string): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(this.BASE_URL + 'products/' + id);
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

  loadProductsByCategory(category: string): void {
    this.http
      .get<ProductInterface[]>(this.BASE_URL + 'products/category/' + category)
      .subscribe((products) => {
        this.allProducts = products;
        this.updateDisplayedProducts();
      });
  }
}
