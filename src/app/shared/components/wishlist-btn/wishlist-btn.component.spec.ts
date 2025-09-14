import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhishlistBtnComponent } from './wishlist-btn.component';

describe('WhishlistBtnComponent', () => {
  let component: WhishlistBtnComponent;
  let fixture: ComponentFixture<WhishlistBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhishlistBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WhishlistBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
