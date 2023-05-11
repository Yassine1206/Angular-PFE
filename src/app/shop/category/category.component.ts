import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category!: string;
  products: Product[] = [];
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.showProducts();
  }

  showProducts() {
    this.route.params.subscribe((params: Params) => {
      this.category = params['code'];
    });
    this.productService.getProducts(this.category).subscribe({
      next: (data: any) => {
        console.log(data);
        this.products = data;
      },
    });
    console.log(this.products);
  }
}
