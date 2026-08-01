import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';

import { ProductListComponent } from './components/product-list/product-list.component';



@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    ProductListComponent
]
})
export class ProductModule { }