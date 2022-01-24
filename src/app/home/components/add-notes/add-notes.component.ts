import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { DatacontextService } from "src/app/data/datacontext.service";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material";
import { CommonNotificationService } from "src/app/shared/services/common-notification/common-notification.service";

@Component({
  selector: "app-add-notes",
  templateUrl: "./add-notes.component.html",
  styleUrls: ["./add-notes.component.scss"],
})
export class AddNotesComponent implements OnInit {
  @Input() editNoteData: any; 
  @Output() closeBtnClk = new EventEmitter<any>();
  @Output() addEditBtnClk = new EventEmitter<any>();
  addNoteForm: any;
  subjects: any = [];
  allCategories: any = [];
  categories: any = [];
  difficultyValue: any =  1;
  impValue: any =  1;
  answerText: any = "";
  constructor(private datacontextService: DatacontextService, private commonNotificationService: CommonNotificationService) {}

  ngOnInit() {
    this.createNoteForm();
    this.datacontextService.notesService
      .getSubjects()
      .subscribe((data: any) => {
        if (!data.is_error) {
        }
        console.log("getSubjects ::", data);
        this.subjects = data;
      });

    this.datacontextService.notesService
      .getCategories()
      .subscribe((data: any) => {
        if (!data.is_error) {
        }
        console.log("getCategories ::", data);
        this.allCategories = data;
        this.categories = this.allCategories["algo"];
      });
  }
  createNoteForm(){
    if(this.editNoteData){
      this.difficultyValue = this.editNoteData.diff || 1;
      this.impValue = this.editNoteData.imp || 1;
      this.links = this.editNoteData.links || [];
      this.tags = this.editNoteData.tags || [];
      this.answerText = this.editNoteData.ans;
      this.addNoteForm = new FormGroup({
        subject: new FormControl(this.editNoteData.subject),
        ques: new FormControl(this.editNoteData.ques),
        links: new FormControl(""),
        tags: new FormControl(""),
        ans: new FormControl(this.editNoteData.ans),
        diff: new FormControl(""),
        imp: new FormControl(""),
        cate: new FormControl(this.editNoteData.cate),
      });
    } else {
      this.addNoteForm = new FormGroup({
        subject: new FormControl("algo"),
        ques: new FormControl(""),
        links: new FormControl(""),
        tags: new FormControl(""),
        ans: new FormControl(""),
        diff: new FormControl(""),
        imp: new FormControl(""),
        cate: new FormControl(""),
      });
    }
    
  }

  resetForm(){
    this.addNoteForm.reset();
    this.difficultyValue = 1;
    this.impValue = 1;
    this.links = [];
    this.tags = [];
    this.answerText = "";
  }

  onNoteSubmit() {
    this.addNoteForm.controls.diff.setValue(this.difficultyValue);
    this.addNoteForm.controls.imp.setValue(this.impValue);
    this.addNoteForm.controls.links.setValue(this.links);
    this.addNoteForm.controls.tags.setValue(this.tags);
    this.addNoteForm.controls.ans.setValue(this.answerText);
    console.log("onNoteSubmit :: payload :: ", this.addNoteForm.value);
    this.editNoteData ? this.editNote() : this.addNewNote();
  }

  addNewNote() {
    this.datacontextService.notesService.createNote(this.addNoteForm.value).subscribe((data: any)=>{
      if (!data.is_error) {
      }
      console.log("onNoteSubmit :: addNewNote :: res data", data);
      this.resetForm();
      this.addEditBtnClk.emit(data);
      this.commonNotificationService.showSnackBar(" Note is added successfully", 'success', 2000);     
    });
  }

  editNote(){
    let payload = this.addNoteForm.value;
    payload['id'] = this.editNoteData.id;
    this.datacontextService.notesService.editNote(payload).subscribe((data)=>{
      console.log("onNoteSubmit :: editNote :: res data", data);
      this.addEditBtnClk.emit(data);
      this.resetForm();
      this.commonNotificationService.showSnackBar(" Note is edited successfully", 'success', 2000);
    });
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  links: any = [];
  tags: any = [];

  add(event: MatChipInputEvent, collection): void {
    const input = event.input;
    const value = event.value;

    // Add 
    if ((value || "").trim()) {
      this[collection].push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(link: any, collection): void {
    const index = this[collection].indexOf(link);

    if (index >= 0) {
      this[collection].splice(index, 1);
    }
  }

  onSubjectSelect(){
    this.categories = this.allCategories[this.addNoteForm.value.subject]
  }

  onCloseClk(){
    this.closeBtnClk.emit(true);
  }

  onAnswerTextChange(e){
    console.log("onAnswerTextChange :: e ::", e);
    this.answerText = e;
  }
  
}
