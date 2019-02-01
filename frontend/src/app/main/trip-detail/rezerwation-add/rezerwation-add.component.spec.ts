import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezerwationAddComponent } from './rezerwation-add.component';

describe('RezerwationAddComponent', () => {
  let component: RezerwationAddComponent;
  let fixture: ComponentFixture<RezerwationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezerwationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezerwationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
