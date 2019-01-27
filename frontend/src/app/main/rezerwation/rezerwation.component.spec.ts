import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezerwationComponent } from './rezerwation.component';

describe('RezerwationComponent', () => {
  let component: RezerwationComponent;
  let fixture: ComponentFixture<RezerwationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezerwationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezerwationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
