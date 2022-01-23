import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CommonNotificationService {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar) { }

  public showSnackBar(message: string, type: 'default' | 'error' | 'success' | 'warn', durationInMs?: number, action?: string) {
   this.snackBar.open(message, action, {
      'duration': durationInMs ? durationInMs : 2000,
      'horizontalPosition': this.horizontalPosition,
      'verticalPosition': this.verticalPosition,
      'panelClass': type
    });
  }
}
