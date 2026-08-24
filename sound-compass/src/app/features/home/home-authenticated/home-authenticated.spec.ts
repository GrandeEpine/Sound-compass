import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAuthenticated } from './home-authenticated';

describe('HomeAuthenticated', () => {
  let component: HomeAuthenticated;
  let fixture: ComponentFixture<HomeAuthenticated>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAuthenticated],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeAuthenticated);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
