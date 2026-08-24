import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeTransform } from './pipe-transform';

describe('PipeTransform', () => {
  let component: PipeTransform;
  let fixture: ComponentFixture<PipeTransform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipeTransform],
    }).compileComponents();

    fixture = TestBed.createComponent(PipeTransform);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
