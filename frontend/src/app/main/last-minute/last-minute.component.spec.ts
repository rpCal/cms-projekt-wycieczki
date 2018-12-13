import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMinuteComponent } from './last-minute.component';

describe('LastMinuteComponent', () => {
  let component: LastMinuteComponent;
  let fixture: ComponentFixture<LastMinuteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastMinuteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastMinuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
