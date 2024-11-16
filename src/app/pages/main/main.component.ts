import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { BenefitsComponent } from '../../components/benefits/benefits.component';
import { CatergoriesHomeComponent } from '../../components/catergories-home/catergories-home.component';
import { PopularProductsComponent } from '../../components/popular-products/popular-products.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    HeroComponent,
    ProductListComponent,
    BenefitsComponent,
    CatergoriesHomeComponent,
    PopularProductsComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
