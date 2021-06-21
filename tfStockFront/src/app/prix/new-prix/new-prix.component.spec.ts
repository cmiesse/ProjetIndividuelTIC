import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPrixComponent } from './new-prix.component';

describe('NewPrixComponent', () => {
  let component: NewPrixComponent;
  let fixture: ComponentFixture<NewPrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
