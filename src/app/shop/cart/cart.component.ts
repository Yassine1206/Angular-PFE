import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  total = 0;

  constructor(
    private cartService: CartService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

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
  isLoggedIn(): boolean {
    return !!this.authService.getAuthData();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent);
  }

  onOrder() {
    if (!this.isLoggedIn()) {
      this.openDialog();
    } else {
      const codeClient = this.authService.getAuthData()[0].no;
      console.log(this.cartService.getCartItems());

      const productArray = this.cartService.getCartItems();

      const newProductArray = productArray.map(
        (obj: { No: any; quantity: any }) => {
          const { No: codearticle, quantity: quantite } = obj;
          return { codearticle, quantite };
        }
      );

      let sentData = {
        codeclient: codeClient,
        lines: JSON.stringify(newProductArray),
      };
      console.log(JSON.stringify(sentData));
      this.cartService.order(sentData).subscribe({
        next: (data: any) => {
          console.log(data);
          this.cartService.clearCart();
          this.getCartData();
        },
      });
    }
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
