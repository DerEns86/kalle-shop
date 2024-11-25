import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Observable } from 'rxjs';
import { ProductInterface } from '../../models/product.interface';
import { ProductListComponent } from '../../components/product-list/product-list.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  private readonly productService: ProductsService = inject(ProductsService);

  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  products$: Observable<ProductInterface[]> | undefined | null;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const categoryId = params['id'];
      if (categoryId) {
        this.productService.loadProductsByCategory(categoryId);
      } else {
        this.productService.loadAllProducts();
      }
      this.products$ = this.productService.products$;
    });
  }
}
