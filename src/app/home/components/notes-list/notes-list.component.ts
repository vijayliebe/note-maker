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
  showFilters: boolean = false;
  isFilterApplied: boolean = false;
  isclassicTheme: boolean = false;
  originalData: any;
  subjects: any = [];
  allCategories: any = {};
  categories: any = [];
  notesMap: any = {};
  sorting: any = [{"name": "Importance", "key": "imp"}, {"name": "Difficulty", "key": "diff"}];
  levels: any = ["1","2","3","4","5"];
  selectedSort = new FormControl("");
  selectedTags = new FormControl();
  selectedImp = new FormControl();
  selectedDiff = new FormControl();
  //selectedSubjects = new FormControl();
  selectedSubjects = new FormControl("algo");
  selectedCate = new FormControl();
  
  uniqueTags: any = [];
  addNoteFlag : boolean = false;
  @Input() subjectName: any;
  notes: any = [];
  editNoteData: any;
  randomNote: any;
  constructor(private datacontextService: DatacontextService, 
    private commonNotificationService: CommonNotificationService,
    public dialog: MatDialog) { }

  ngOnInit() {
   this.datacontextService.notesService.fetchDbData().subscribe((res: any) => {
    this.getNoteList();
    this.getSubjects();
    this.getCategories();
   });
  }

  onSubjectChange(){
    this.subjectName = this.selectedSubjects.value;
    this.ngOnInit();
  }
  
  getNoteList(){
    this.datacontextService.notesService.getNote(this.subjectName).subscribe((res)=>{
      console.log("getNote ::", res);
      this.notes = res;
      this.originalData = JSON.parse(JSON.stringify(this.notes));
      this.prepareNoteMap(this.originalData || []);
      this.prepareUniqueTags(this.originalData || []);

      if(this.isFilterApplied) this.onFilter();
    }); 
  }

  getSubjects(){
    this.datacontextService.notesService
      .getSubjects()
      .subscribe((data: any) => {
        if (!data.is_error) {
        }
        console.log("getSubjects ::", data);
        this.subjects = data;
      });
  }

  getCategories(){
    this.datacontextService.notesService
      .getCategories()
      .subscribe((data: any) => {
        if (!data.is_error) {
        }
        console.log("getCategories ::", data);
        this.allCategories = data;
        this.categories = this.allCategories[this.subjectName];
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

  onFilter(){
    this.isFilterApplied = true;
    // const selectedSubjects = this.selectedSubjects.value;
    const selectedCate = this.selectedCate.value;
    const selectedTags = this.selectedTags.value;
    const selectedImp = this.selectedImp.value;
    const selectedDiff = this.selectedDiff.value;
    const selectedSort = this.selectedSort.value;
    

    let dataCopy = JSON.parse(JSON.stringify(this.originalData));

    /* 
      if(selectedSubjects && selectedSubjects.length){
        // update categories as per subject selected - start 
        this.categories = this.allCategories[selectedSubjects];
        // update categories as per subject selected - end 
        dataCopy = dataCopy.filter((data)=>{
          if(selectedSubjects.includes(data.subject)){
            return data;
          }
        });
      } 
    */

    if(selectedCate && selectedCate.length){

      dataCopy = dataCopy.filter((data)=>{
        let dataMap = {};
        for(let cat of data.cate){
          if(selectedCate.includes(cat)){
            dataMap[data.id] = data;
          }
        }
        let values = Object.values(dataMap);
        if(values.length){
          return values;
        }

      });
    }

    if(selectedTags && selectedTags.length){
      dataCopy = dataCopy.filter((data)=>{
        let dataMap = {};
        for(let tag of data.tags){
          if(selectedTags.includes(tag.name)){
            dataMap[data.id] = data;
          }
        }
        let values = Object.values(dataMap);
        if(values.length){
          return values;
        }
      });
    }

    if (selectedImp && selectedImp.length) {
      dataCopy = dataCopy.filter((data)=>{
        if(selectedImp.includes(String(data.imp))){
          return data;
        }
      });
    }

    if(selectedDiff && selectedDiff.length){
      dataCopy = dataCopy.filter((data)=>{
        if(selectedDiff.includes(String(data.diff))){
          return data;
        }
      });
    }

    
    this.notes = dataCopy;
  
    if(selectedSort){
      let copyNotes = JSON.parse(JSON.stringify(this.notes));

      this.notes = copyNotes.sort((a, b)=>{
        return a[selectedSort] - b[selectedSort];
      });      
    }
  }

  onClassicThemeChange(e, idx){
    console.log("onClassicThemeChange :: e ::", e.checked);
    this.notes[idx]['classicTheme'] = e.checked;
  }

  displayCate(categories){
    return categories.join(' | ');
  }

  getRandomNote(){
    let rIdx = Math.floor(Math.random() * this.originalData.length);
    this.randomNote = this.originalData[rIdx];
    this.randomNote.random = true;
    this.randomNote.color = '#'+(Math.random().toString(16)+'00000').slice(2,8);
    this.notes.splice(0, (this.notes[0].random ? 1 : 0),this.randomNote);
  }


}
