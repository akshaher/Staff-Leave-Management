import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ProductResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(page: number, limit: number): Observable<ProductResponse> {

    return this.http.get<ProductResponse>(
      `${this.apiUrl}?page=${page}&limit=${limit}`
    );

  }

}