import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductQuery } from 'src/app/core/models/product-query.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
apiUrl='http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(query: ProductQuery): Observable<any> {

    let params = new HttpParams()
      .set('page', query.page.toString())
      .set('limit', query.limit.toString());

    if (query.search) {
      params = params.set('search', query.search);
    }

    if (query.sort) {
      params = params.set('sort', query.sort);
    }

    if (query.brand) {
      params = params.set('brand', query.brand);
    }

    if (query.category) {
      params = params.set('category', query.category);
    }

    console.log(params.toString());
    return this.http.get<any>(
      'http://localhost:5000/api/products',{ params }
    );
  }

  getProductFilters(){
    return this.http.get<any>(`${this.apiUrl}/filters`)
  }
}