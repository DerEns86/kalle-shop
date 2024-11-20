import { Component, inject, OnInit } from '@angular/core';
import { ProductInterface } from '../../models/product.interface';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductsService } from '../../services/products.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-popular-products',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.scss',
})
export class PopularProductsComponent implements OnInit {
  private readonly productService: ProductsService = inject(ProductsService);

  popularProducts: ProductInterface[] = [];

  ngOnInit() {
    this.getRandomProducts();
  }

  getRandomProducts() {
    let fistNumber = this.generateRandomNumber(1, 20);
    let secondNumber = this.generateRandomNumber(1, 20);
    while (fistNumber === secondNumber) {
      secondNumber = this.generateRandomNumber(1, 20);
    }
    this.productService
      .loadSingleProduct(fistNumber.toString())
      .pipe(take(1))
      .subscribe((product) => {
        this.popularProducts.push({ ...product });
        console.log(this.popularProducts);

        this.productService
          .loadSingleProduct(secondNumber.toString())
          .pipe(take(1))
          .subscribe((product) => {
            this.popularProducts.push({ ...product });
            console.log(this.popularProducts);
          });
      });
  }

  generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
