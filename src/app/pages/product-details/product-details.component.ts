import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ProductInterface } from '../../models/product.interface';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private readonly productService: ProductsService = inject(ProductsService);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  private productId: string | undefined;
  public product: ProductInterface | undefined;

  fullStars: number[] = [];
  hasHalfStar: boolean = false;

  quantity: number = 1;

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    if (this.productId) {
      this.getProduct(this.productId);
      this.calculateStars(this.product?.rating.rate);
    }
  }

  getProduct(id: string) {
    this.productService
      .loadSingleProduct(id)
      .pipe(take(1))
      .subscribe({
        next: (product: ProductInterface) => {
          this.product = product;
          this.calculateStars(product.rating.rate);
        },
      });
  }

  calculateStars(rating: number | undefined): void {
    if (rating) {
      const full = Math.floor(rating);
      const half = rating % 1 >= 0.5;

      this.fullStars = Array(full).fill(0);
      this.hasHalfStar = half;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
    console.log(this.quantity);
  }

  increaseQuantity() {
    this.quantity++;
    console.log(this.quantity);
  }

  addToCart() {
    console.log('Added to cart:', this.product, 'Quantity:', this.quantity);
  }
}
