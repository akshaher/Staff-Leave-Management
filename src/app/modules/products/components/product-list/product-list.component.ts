import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  filteredProducts: Product[] = [];

  searchText = '';

  isLoading = false;

  hasError = false;

  page = 1;

  limit = 20;

  hasMore = true;

  isLoadingMore = false;

  totalProducts = 0;

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {

    this.loadProducts();

  }

  @HostListener('window:scroll', [])

onWindowScroll(): void {

  const scrollPosition =
    window.innerHeight + window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight;

  if (
    scrollPosition >= documentHeight - 200 &&
    !this.isLoadingMore &&
    this.hasMore
  ) {

    this.page++;

    this.loadProducts();

  }

}

loadProducts(): void {

  if (!this.hasMore) {
    return;
  }

  if (this.page === 1) {
    this.isLoading = true;
  } else {
    this.isLoadingMore = true;
  }

  this.productService
    .getProducts(this.page, this.limit)
    .subscribe({

      next: (response) => {

        this.products = [
          ...this.products,
          ...response.data
        ];

        this.filteredProducts = [...this.products];

        this.totalProducts = response.total;

        this.hasMore = response.hasMore;

        this.isLoading = false;

        this.isLoadingMore = false;

      },

      error: () => {

        this.isLoading = false;

        this.isLoadingMore = false;

      }

    });

}

  searchProducts(): void {

    const search = this.searchText
      .trim()
      .toLowerCase();

    if (!search) {

      this.filteredProducts = this.products;

      return;

    }

    this.filteredProducts = this.products.filter(product =>

      product.name.toLowerCase().includes(search) ||

      product.brand.toLowerCase().includes(search) ||

      product.category.toLowerCase().includes(search)

    );

  }

}