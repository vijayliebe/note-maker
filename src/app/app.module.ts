import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    MaterialModule,
    MaterialModule,
    Angular2PromiseButtonModule
      .forRoot({
        // the class used to indicate a pending promise
        btnLoadingClass: 'btn-loader',
        // only disable and show is-loading class for clicked button,
        // even when they share the same promise
        handleCurrentBtnOnly: false
      }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
