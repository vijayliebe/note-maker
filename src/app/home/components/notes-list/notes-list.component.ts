import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { DatacontextService } from "src/app/data/datacontext.service";
import { AddNotesComponent } from '../add-notes/add-notes.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { CommonNotificationService } from "src/app/shared/services/common-notification/common-notification.service";

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  originalData: any;
  sorting: any = [{"name": "Importance", "key": "imp"}, {"name": "Difficulty", "key": "diff"}];
  levels: any = [1,2,3,4,5];
  selectedSort = new FormControl("");
  selectedTags = new FormControl();
  selectedImp = new FormControl();
  selectedDiff = new FormControl();
  uniqueTags: any = [];
  addNoteFlag : boolean = false;
  @Input() subjectName: any;
  notes: any = [];
  editNoteData: any;
  constructor(private datacontextService: DatacontextService, 
    private commonNotificationService: CommonNotificationService,
    public dialog: MatDialog) { }

  ngOnInit() {
   this.getNoteList();
  }

  getNoteList(){
    this.datacontextService.notesService.getNote(this.subjectName).subscribe((res)=>{
      console.log("getNote ::", res);
      this.notes = res;
      this.prepareUniqueTags(this.notes || []);
    }); 
  }

  prepareUniqueTags(noteList){
    let tagMap = {};
    for(let i=0; i < noteList.length; i++){
        let tags = noteList[i]['tags'] || [];
        
        for(let j=0; j< tags.length; j++){
          let tag = tags[j]['name'];
          if(!(tag in tagMap)) tagMap[tag] = 1;
        }
    }
    this.uniqueTags = Object.keys(tagMap);
    console.log("this.uniqueTags ::", this.uniqueTags);
  }

  addNote(id?){
    this.addNoteFlag = true;
  }

  editNote(noteData, idx){
    this.editNoteData = null;
    this.addNoteFlag = false;
    setTimeout(() => {
      this.editNoteData = noteData;
      this.addNoteFlag = true;
    }, 200);
  }

  closeBtnClk(ev){
    console.log("closeBtnClk :: ev ::", ev);
    this.addNoteFlag = false;
    this.editNoteData = null;
  }

  addEditBtnClk(ev){
    console.log("addEditBtnClk :: ev ::", ev);
    this.editNoteData = null;
    this.addNoteFlag = false;
    this.getNoteList();
  }

  dltNote(noteId){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'generic-dialog-container-sm',
      disableClose: true,
      data: {
        'title': 'Delete Note',
        'body': 'Are you sure you want to delete note ?'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.datacontextService.notesService.dltNote(this.subjectName, noteId).subscribe((res)=>{
          console.log("getNote ::", res);
          this.getNoteList();
        });
      }
    });
  }

  onTagSelect(e){
    console.log("onTagSelect :: selectedTags ::", this.selectedTags.value);
  }

  onImpSelect(e){
    console.log("onImpSelect :: selectedImp ::", this.selectedImp.value);
  }

  onDiffSelect(e){
    console.log("onDiffSelect :: selectedDiff ::", this.selectedDiff.value);
  }

  onSortSelect(e){
    console.log("onSortSelect :: selectedSort ::", this.selectedSort.value);
  }

}
