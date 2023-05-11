import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData() {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartItems.reduce(
      (acc, item) => acc + Number(item.Price) * Number(item.quantity),
      0
    );
  }

  onOrder() {
    this.cartService.clearCart();
    this.getCartData();
  }

  onAddToCart(product: any) {
    this.cartService.addToCart(product);
    this.getCartData();
  }

  onRemoveFromCart(product: any) {
    console.log(product);
    this.cartService.removeFromCart(product);
    this.getCartData();
  }

  onRemoveAllQuantityFromCart(productId: any) {
    this.cartService.removeAllQuantityFromCart(productId);
    this.getCartData();
  }
}
