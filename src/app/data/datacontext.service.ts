import { Injectable, Injector } from '@angular/core';
import { UserManagementService } from './repositories/users/user-management.service';
import { NotesService } from './repositories/notes/notes.service'
@Injectable({
  providedIn: 'root'
})
export class DatacontextService {
  private _userManagement: UserManagementService;
  private _notesService: NotesService;

  constructor(private injector: Injector) { }

  public get userManagement(): UserManagementService {
    if (!this._userManagement) {
      this._userManagement = this.injector.get(UserManagementService);
    }
    return this._userManagement;
  }

  public get notesService(): NotesService {
    if (!this._notesService) {
      this._notesService = this.injector.get(NotesService);
    }
    return this._notesService;
  }
}
