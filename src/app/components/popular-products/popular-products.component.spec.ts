import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularProductsComponent } from './popular-products.component';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PopularProductsComponent', () => {
  let component: PopularProductsComponent;
  let fixture: ComponentFixture<PopularProductsComponent>;

  const mockActivatedRoute = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        ProductsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
      imports: [PopularProductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate an number between 1 and 20', () => {
    const min = 3;
    const max = 18;

    const result = component.generateRandomNumber(min, max);

    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });
});
