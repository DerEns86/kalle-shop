import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { BenefitsComponent } from '../../components/benefits/benefits.component';
import { CategoriesHomeComponent } from '../../components/catergories-home/categories-home.component';
import { PopularProductsComponent } from '../../components/popular-products/popular-products.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    HeroComponent,
    BenefitsComponent,
    CategoriesHomeComponent,
    PopularProductsComponent,
    FooterComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
