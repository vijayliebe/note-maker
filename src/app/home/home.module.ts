import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { routing } from './home-routing';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { AddNotesComponent } from '../home/components/add-notes/add-notes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { NotesListDesktopComponent } from './components/notes-list/notes-list-desktop/notes-list-desktop.component';
import { NotesListMobileComponent } from './components/notes-list/notes-list-mobile/notes-list-mobile.component';
import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AceEditorModule,
    routing
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ],
  declarations: [AddNotesComponent, DashboardComponent, NotesListComponent, NotesListDesktopComponent, NotesListMobileComponent]
})
export class HomeModule { }
