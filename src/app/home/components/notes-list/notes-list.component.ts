import { Component, OnInit, Input } from '@angular/core';
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
    }); 
  }

  addNote(id?){
    this.addNoteFlag = true;
    // const dialogRef = this.dialog.open(AddNotesComponent, {
    //   panelClass: 'full-screen-dialog-container',
    //   data: {"id": id}
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if(result){
    //     this.getNoteList();
    //     if(result && result.id){
    //       this.commonNotificationService.showSnackBar(" Note is edited successfully", 'success', 2000);
    //     } else {
    //       this.commonNotificationService.showSnackBar(" Note is added successfully", 'success', 2000);
    //     }
    //   }
    // });

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

}
