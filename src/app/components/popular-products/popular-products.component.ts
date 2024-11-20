import { Component } from '@angular/core';
import { ProductInterface } from '../../models/product.interface';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-popular-products',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.scss',
})
export class PopularProductsComponent {
  dummyProducts: ProductInterface[] = [
    {
      id: 99,
      title: 'Sample Product',
      price: 19.99,
      description: 'This is a sample product description.',
      category: 'Sample Category',
      image: '/assets/img/dummy-product.jpg',
      rating: {
        rate: 4.5,
        count: 100,
      },
    },
    {
      id: 98,
      title: 'Sample Product2',
      price: 39.0,
      description: 'This is a sample product2 description.',
      category: 'Sample Category2',
      image: '/assets/img/dummy-product.jpg',
      rating: {
        rate: 1,
        count: 100,
      },
    },
  ];
}
