import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVendorsComponent } from './search-vendors.component';

describe('SearchVendorsComponent', () => {
  let component: SearchVendorsComponent;
  let fixture: ComponentFixture<SearchVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchVendorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
