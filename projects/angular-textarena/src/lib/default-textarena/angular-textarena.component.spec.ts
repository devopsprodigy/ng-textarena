import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularTextarenaComponent } from './angular-textarena.component';

describe('AngularTextarenaComponent', () => {
  let component: AngularTextarenaComponent;
  let fixture: ComponentFixture<AngularTextarenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularTextarenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularTextarenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
