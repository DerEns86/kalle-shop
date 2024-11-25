import { Component, inject, Input } from '@angular/core';
import { ProductInterface } from '../../models/product.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  private readonly cartService: CartService = inject(CartService);

  @Input() product!: ProductInterface;

  onAddProduct(product: ProductInterface) {
    this.cartService.addProduct(product);
  }
}
