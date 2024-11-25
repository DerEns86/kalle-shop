import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductInterface } from '../../models/product.interface';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, AsyncPipe, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  productService: ProductsService = inject(ProductsService);
  products$: Observable<ProductInterface[]> | undefined | null;

  canLoadMore = true;

  ngOnInit(): void {
    this.products$ = this.productService.products$;
  }

  loadMore(): void {
    this.productService.loadMoreProducts();
    this.canLoadMore = this.productService.canLoadMoreSignal();
  }
}
