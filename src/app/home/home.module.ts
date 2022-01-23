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
  declarations: [AddNotesComponent, DashboardComponent, NotesListComponent]
})
export class HomeModule { }
