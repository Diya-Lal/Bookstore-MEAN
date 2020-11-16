import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessDialogBoxComponent } from './success-dialog-box.component';

describe('SuccessDialogBoxComponent', () => {
  let component: SuccessDialogBoxComponent;
  let fixture: ComponentFixture<SuccessDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
