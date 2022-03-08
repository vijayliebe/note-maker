import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesListMobileComponent } from './notes-list-mobile.component';

describe('NotesListMobileComponent', () => {
  let component: NotesListMobileComponent;
  let fixture: ComponentFixture<NotesListMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesListMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesListMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
