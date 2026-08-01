import { Component, inject, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';
import { ProductQuery } from 'src/app/core/models/product-query.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProductImageDirective } from '../../../../shared/directives/product-image.directive';
import { NgFor, NgIf, NgClass, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        NgFor,
        NgIf,
        ProductImageDirective,
        NgClass,
        DecimalPipe,
    ],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  websiteURL:any='';

  filteredProducts: Product[] = [];

  isLoading = false;

  hasError = false;

  page = 1;

  limit = 20;

  hasMore = true;

  isLoadingMore = false;

  totalProducts = 0;
  brands:string[]=[];
  categories:string[]=[];

  query: ProductQuery={
    page: 1, limit: 20, search:'', sort:'', brand:'', category:''
  }

  private searchSubject = new Subject<string>();
  private domsanitizer=inject(DomSanitizer);

  constructor(private productService: ProductService,) {
    this.websiteURL=this.domsanitizer.bypassSecurityTrustResourceUrl('https://angular.dev/update-guide?v=12.0-17.0&l=1');
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadFilters();

    this.searchSubject
      .pipe(
        debounceTime(500),

        distinctUntilChanged(),

        tap(() => {
            this.resetProducts();
        }),

        switchMap((search) => {
          this.query.search = search;
          return this.productService.getProducts(
           this.query
          );
        }),
      )
      .subscribe({
        next: (response) => {
          this.products = response.data;
          this.filteredProducts = [...this.products];
          this.totalProducts=response.total;
          this.hasMore = response.hasMore;
        },

        error: (err) => {
          console.error(err);
        },
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;

    const documentHeight = document.documentElement.scrollHeight;

    if (
      scrollPosition >= documentHeight - 200 &&
      !this.isLoadingMore &&
      this.hasMore
    ) {
      this.query.page++;

      this.loadProducts();
    }
  }

  trackByProductId(index:number, product:any){
    console.log(product.id,'TrackBy')
    return product.id
  }

  onSearch(): void {
    this.searchSubject.next(this.query.search);
  }

  onSortChange() {
    this.resetProducts();
    this.loadProducts();
  }

  onFilterChange(){
    this.resetProducts();
    this.loadProducts();
  }

  private resetProducts(){
    this.query.page=1;
    this.products=[];
    this.filteredProducts=[];
    this.hasMore=true;
  }

  loadFilters(){
    this.productService.getProductFilters().subscribe({
        next: (response)=>{
            this.brands=response.data.brands;
            this.categories=response.data.categories;
        }
    })
  }

  loadProducts(): void {
    if (!this.hasMore) {
      return;
    }

    if (this.query.page === 1) {
      this.isLoading = true;
    } else {
      this.isLoadingMore = true;
    }

    this.productService
      .getProducts(this.query)
      .subscribe({
        next: (response: { data: any; total: number; hasMore: boolean; }) => {
        console.log(response);
          this.products = [...this.products, ...response.data];
          
          this.filteredProducts = [...this.products];
        

          this.totalProducts = response.total;

          this.hasMore = response.hasMore;

          this.isLoading = false;

          this.isLoadingMore = false;
        },

        error: () => {
          this.isLoading = false;

          this.isLoadingMore = false;
        },
      });
  }
}
