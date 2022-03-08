import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesListDesktopComponent } from './notes-list-desktop.component';

describe('NotesListDesktopComponent', () => {
  let component: NotesListDesktopComponent;
  let fixture: ComponentFixture<NotesListDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesListDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesListDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
