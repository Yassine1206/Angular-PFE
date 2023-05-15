import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private endpointUrl = environment.endPointUrl;

  cartData: any[] = [];
  cartCount$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
    this.loadCartData();
    this.updateCartCount();
  }

  private loadCartData() {
    let data = JSON.parse(localStorage.getItem('cart')!) || [];
    this.cartData = data;
  }

  private saveCartData() {
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  }

  private updateCartCount() {
    let count = this.cartData.reduce((acc, item) => acc + item.quantity, 0);
    this.cartCount$.next(count);
  }

  order(data: any): Observable<any> {
    return this.http.post<any>(this.endpointUrl + '/order/insert', data);
  }

  addToCart(product: Product) {
    let existingProductIndex = this.cartData.findIndex(
      (item) => item.No === product.No
    );
    let quantityStq = Number(product.Quantity);
    if (
      existingProductIndex !== -1 &&
      quantityStq === this.cartData[existingProductIndex].quantity
    ) {
      return;
    } else if (existingProductIndex !== -1) {
      this.cartData[existingProductIndex].quantity++;
    } else {
      this.cartData.push({ ...product, quantity: 1 });
    }

    this.saveCartData();
    this.updateCartCount();
  }

  getCartItems() {
    const cartItems = localStorage.getItem('cart');
    return cartItems ? JSON.parse(cartItems) : [];
  }

  removeFromCart(product: any) {
    const existingProductIndex = this.cartData.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      const existingProduct = this.cartData[existingProductIndex];
      if (existingProduct.quantity > 1) {
        existingProduct.quantity--;
      } else {
        this.cartData.splice(existingProductIndex, 1);
      }
      this.saveCartData();
      this.updateCartCount();
    }
  }

  removeAllQuantityFromCart(productId: any) {
    let existingProductIndex = this.cartData.findIndex(
      (item) => item.id === productId
    );

    if (existingProductIndex !== -1) {
      this.cartData.splice(existingProductIndex, 1);
      this.saveCartData();
      this.updateCartCount();
    }
  }

  clearCart() {
    this.cartData = [];
    this.saveCartData();
    this.updateCartCount();
    localStorage.removeItem('cart');
  }
}
