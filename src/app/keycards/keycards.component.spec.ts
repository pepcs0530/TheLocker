import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeycardsComponent } from './keycards.component';

describe('KeycardsComponent', () => {
  let component: KeycardsComponent;
  let fixture: ComponentFixture<KeycardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeycardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeycardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
