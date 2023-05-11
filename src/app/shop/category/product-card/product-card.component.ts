import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  imageUrl!: string;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.imageUrl = environment.endPointUrlImages + this.product.Urlimage;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
