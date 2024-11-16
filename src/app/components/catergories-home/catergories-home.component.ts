import { Component } from '@angular/core';

@Component({
  selector: 'app-catergories-home',
  standalone: true,
  imports: [],
  templateUrl: './catergories-home.component.html',
  styleUrl: './catergories-home.component.scss',
})
export class CatergoriesHomeComponent {
  categories: any[] = [
    "men's clothing",
    "women's clothing",
    'electronics',
    'jewelery',
  ];
}
