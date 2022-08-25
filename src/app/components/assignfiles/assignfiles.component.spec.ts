import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignfilesComponent } from './assignfiles.component';

describe('AssignfilesComponent', () => {
  let component: AssignfilesComponent;
  let fixture: ComponentFixture<AssignfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
