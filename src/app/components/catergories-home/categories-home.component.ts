import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-home.component.html',
  styleUrl: './categories-home.component.scss',
})
export class CategoriesHomeComponent implements OnInit {
  categoryService: CategoriesService = inject(CategoriesService);

  categories$: Observable<string[]> | null | undefined;

  ngOnInit(): void {
    this.categoryService.loadCategories();
    this.categories$ = this.categoryService.products$;
  }
}
