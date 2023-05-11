import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-element',
  templateUrl: './cart-element.component.html',
  styleUrls: ['./cart-element.component.scss'],
})
export class CartElementComponent implements OnInit {
  @Input() element: any;
  @Output() removeProduct = new EventEmitter<any>();
  @Output() addProduct = new EventEmitter<any>();
  @Output() removeAllQuantityProduct = new EventEmitter<any>();
  imageUrl!: string;

  constructor() {}

  ngOnInit(): void {
    this.imageUrl = environment.endPointUrlImages + this.element.Urlimage;
  }

  onAddProduct() {
    this.addProduct.emit(this.element);
  }

  onRemoveProduct() {
    this.removeProduct.emit(this.element);
  }

  onAllQuantityProduct() {
    this.removeAllQuantityProduct.emit(this.element.id);
  }
}
