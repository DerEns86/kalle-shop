import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatergoriesHomeComponent } from './catergories-home.component';

describe('CatergoriesHomeComponent', () => {
  let component: CatergoriesHomeComponent;
  let fixture: ComponentFixture<CatergoriesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatergoriesHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatergoriesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
