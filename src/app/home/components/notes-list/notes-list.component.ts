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
  notesMap: any = {};
  sorting: any = [{"name": "Importance", "key": "imp"}, {"name": "Difficulty", "key": "diff"}];
  levels: any = ["1","2","3","4","5"];
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
      this.originalData = JSON.parse(JSON.stringify(this.notes));
      this.prepareNoteMap(this.originalData || []);
      this.prepareUniqueTags(this.originalData || []);
    }); 
  }

  prepareNoteMap(noteList){
    let map: any = {
      "tag": {},
      "imp": {},
      "diff": {},
      "cate": {},
      "sub": {}
    }

    for(let i=0; i < noteList.length; i++){
      let note = noteList[i];
      let tags = note['tags'] || [];
      let imp = note['imp'];
      let diff = note['diff'];
      let cate = note['cate'];
      let sub = note['subject'];
      
      for(let j=0; j< tags.length; j++){
        let tag = tags[j]['name'];
        (map['tag'][tag] && tag in map['tag']) ? map['tag'][tag].push(note) : map['tag'][tag] = [note];
      }

      (map['imp'][imp] && imp in map['imp']) ? map['imp'][imp].push(note) : map['imp'][imp] = [note];
      (map['diff'][diff] && diff in map['diff']) ? map['diff'][diff].push(note) : map['diff'][diff] = [note];
      (map['cate'][cate] && cate in map['cate']) ? map['cate'][cate].push(note) : map['cate'][cate] = [note];
      (map['sub'][sub] && sub in map['sub']) ? map['sub'][sub].push(note) : map['sub'][sub] = [note];

    }
    this.notesMap = map;
    console.log("this.notesMap ::", this.notesMap);

  }

  prepareUniqueTags(noteList){
    this.uniqueTags = Object.keys(this.notesMap.tag);
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
    this.onFilter();
  }

  onImpSelect(e){
    console.log("onImpSelect :: selectedImp ::", this.selectedImp.value);
    this.onFilter();
  }

  onDiffSelect(e){
    console.log("onDiffSelect :: selectedDiff ::", this.selectedDiff.value);
    this.onFilter();
  }

  onSortSelect(e){
    console.log("onSortSelect :: selectedSort ::", this.selectedSort.value);
    this.onFilter();
  }

  onFilter(){
    let isValueProvided = false;
    const selectedTags = this.selectedTags.value;
    const selectedImp = this.selectedImp.value;
    const selectedDiff = this.selectedDiff.value;
    const selectedSort = this.selectedSort.value;

    const dataCopy = JSON.parse(JSON.stringify(this.notesMap));
    let noteIdMap = {};
    if(selectedTags && selectedTags.length){
      isValueProvided = true;
      let tags = Object.keys(dataCopy.tag);
      for(let i = 0; i < tags.length; i++){
        let tag = tags[i];
        if(selectedTags.includes(tag)){
          let notes = dataCopy.tag[tag];
          for(let n of notes){
            noteIdMap[n.id] = n;
          }
          
          // notes = [...notes, ...dataCopy.tag[tag]];
        }
      }
    }

    if (selectedImp && selectedImp.length) {
      isValueProvided = true;
      const imp: any = Object.keys(dataCopy.imp);

      for(let im of imp){
        if (selectedImp.includes(im)) {
          let notes = dataCopy.imp[im];
          for(let n of notes){
            noteIdMap[n.id] = n;
          }
          //notes = [...notes, ...dataCopy.imp[imp]];
        }
      }
    }

    if(selectedDiff && selectedDiff.length){
      isValueProvided = true;
      const diff: any = Object.keys(dataCopy.diff);

      for(let di of diff){
        if (selectedDiff.includes(di)) {
          let notes = dataCopy.diff[di];
          for(let n of notes){
            noteIdMap[n.id] = n;
          }
          //notes = [...notes, ...dataCopy.diff[diff]];
        }
      }
      
    }

    this.notes = (Object.values(noteIdMap).length || isValueProvided) ? Object.values(noteIdMap) : this.originalData;
  }

}
