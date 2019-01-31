import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezerwationUserComponent } from './rezerwation-user.component';

describe('RezerwationUserComponent', () => {
  let component: RezerwationUserComponent;
  let fixture: ComponentFixture<RezerwationUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezerwationUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezerwationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
