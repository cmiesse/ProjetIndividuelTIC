import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVilleComponent } from './new-ville.component';

describe('NewVilleComponent', () => {
  let component: NewVilleComponent;
  let fixture: ComponentFixture<NewVilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVilleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
