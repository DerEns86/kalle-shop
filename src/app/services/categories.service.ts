import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  http: HttpClient = inject(HttpClient);

  private categoriesSubject: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  products$: Observable<string[]> = this.categoriesSubject.asObservable();

  loadCategories(): void {
    this.http
      .get<string[]>('https://fakestoreapi.com/products/categories')
      .subscribe({
        next: (categories) => {
          this.categoriesSubject.next(categories);
        },
        error: (err) => {
          console.warn('no categories found,', err);
        },
        complete: () => {
          console.log('Categories loaded');
        },
      });
  }
}
