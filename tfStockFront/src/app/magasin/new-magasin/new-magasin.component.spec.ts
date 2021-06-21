import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMagasinComponent } from './new-magasin.component';

describe('NewMagasinComponent', () => {
  let component: NewMagasinComponent;
  let fixture: ComponentFixture<NewMagasinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMagasinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
