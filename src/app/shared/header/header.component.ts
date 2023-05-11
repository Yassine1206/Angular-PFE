import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // categories: any[] = [];
  categories = [
    'informatique',
    'cuisine',
    'mode',
    'santé',
    'sports',
    'téléphones',
    'animaux',
    'bureau',
  ];
  displayCategories: any[] = [];
  cartCount: number = 0;
  cartCountSubscription!: Subscription;
  profile: any;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.categories = this.productService.getAllCategories();
    this.productService.getAllCategories().subscribe({
      next: (data: any) => {
        console.log(data);
        // this.categories = data;
      },
    });
    this.displayCategories = this.categories.slice(0, 5);

    this.cartCountSubscription = this.cartService.cartCount$.subscribe(
      (count) => {
        this.cartCount = count;
      }
    );
    console.log(this.profile);
  }

  isLoggedIn(): boolean {
    return !!this.authService.getAuthData();
  }

  logout() {
    this.authService.clearAuthData();
    this.profile = this.authService.getAuthData();
    this.router.navigate(['/accueil']);
  }
  ngOnDestroy() {
    this.cartCountSubscription.unsubscribe();
  }
}
