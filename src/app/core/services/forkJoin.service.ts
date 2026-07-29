import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForkService {

  constructor() { }

  // Widget 1 (Completes after 3 sec)
  getProductCount(): Observable<number> {
    return new Observable<number>((observer) => {
      setTimeout(() => {
        console.log('Product Count API Completed');
        observer.next(120);
        observer.complete();
      }, 3000);
    });
  }

  // Widget 2 (Completes after 5 sec)
  getOrderCount(): Observable<number> {
    return new Observable<number>((observer) => {
      setTimeout(() => {
        console.log('Order Count API Completed');
        observer.next(450);
        observer.error("Order has not been placed")
        observer.complete();
      }, 5000);
    });
  }

  // Widget 3 (Completes after 8 sec)
  getRevenue(): Observable<number> {
    return new Observable<number>((observer) => {
      setTimeout(() => {
        console.log('Revenue API Completed');
        observer.next(98000);
        observer.complete();
      }, 8000);
    });
  }

  // Combine all APIs
  getDashboardData() {
    return forkJoin({
      products: this.getProductCount(),
      orders: this.getOrderCount(),
      revenue: this.getRevenue()
    });
  }
}