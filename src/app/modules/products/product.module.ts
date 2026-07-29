import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';

import { ProductListComponent } from './components/product-list/product-list.component';

import { SharedModule } from '../../shared/shared.module';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ProductRoutingModule,
    ScrollingModule
  ]
})
export class ProductModule { }