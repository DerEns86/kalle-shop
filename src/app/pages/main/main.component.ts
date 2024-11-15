import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeroComponent, ProductListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
