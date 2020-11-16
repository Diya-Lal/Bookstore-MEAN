import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooklistsComponent } from './booklists.component';

describe('BooklistsComponent', () => {
  let component: BooklistsComponent;
  let fixture: ComponentFixture<BooklistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooklistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
