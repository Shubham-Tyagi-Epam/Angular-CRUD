import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product1RoutingModule } from './product1-routing.module';
import { Product1Component } from './product1.component';


@NgModule({
  declarations: [
    Product1Component
  ],
  imports: [
    CommonModule,
    Product1RoutingModule
  ]
})
export class Product1Module { }
