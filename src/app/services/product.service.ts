import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private endpointUrl = environment.endPointUrl;

  constructor(private http: HttpClient) {}

  /* getAllCategories(): string[] /*  Observable<String[]> */
  // return this.http.get<String[]>(this.endpointUrl + '/category/all');

  // return ['Catégorie 1', 'Catégorie 2', 'Catégorie 3'];*/

  getAllCategories(): Observable<any> {
    return this.http.get<any>(this.endpointUrl + '/category/all');
  }

  getProducts(category: string): Observable<Product[]> {
    console.log(category);

    return this.http.post<Product[]>(this.endpointUrl + '/product/all', {
      codecategorie: category,
    });
  }
}
