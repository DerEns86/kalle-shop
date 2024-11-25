import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartItemInterface } from '../../models/cartItem.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartService: CartService = inject(CartService);
  router: Router = inject(Router);

  readonly shippingCost: number = 0;

  decreaseAmount(index: number) {
    this.cartService.decreaseAmount(index);
  }

  increaseAmount(index: number) {
    this.cartService.increaseAmount(index);
  }

  deleteItem(index: number) {
    this.cartService.removeProduct(index);
  }

  calculateItemTotal(index: number): number {
    const amount: number = this.cartService.cartSignal()[index].amount;
    const price: number = this.cartService.cartSignal()[index].product.price;

    return amount * price;
  }

  calculateSubTotal(): number {
    let total: number = 0;

    this.cartService.cartSignal().forEach((item: CartItemInterface) => {
      total += item.amount * item.product.price;
    });

    return total;
  }

  calculateTotal(): number {
    return this.calculateSubTotal() + this.shippingCost;
  }

  onCheckout() {
    this.router.navigateByUrl('/checkout');
  }
}
