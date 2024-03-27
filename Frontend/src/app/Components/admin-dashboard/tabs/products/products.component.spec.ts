import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsTabComponent } from './products.component';

describe('ProductsTabComponent', () => {
  let component: ProductsTabComponent;
  let fixture: ComponentFixture<ProductsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
