import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ShopComponent } from './pages/shop/shop.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'details/:id', component: ProductDetailsComponent },
  { path: 'shop/:id', component: ShopComponent },
  { path: 'shop', component: ShopComponent },
];
