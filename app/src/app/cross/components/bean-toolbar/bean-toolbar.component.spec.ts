import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeanToolbarComponent } from './bean-toolbar.component';

describe('BeanToolbarComponent', () => {
  let component: BeanToolbarComponent;
  let fixture: ComponentFixture<BeanToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeanToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeanToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
