import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';

import { AppComponent } from './app.component';
import { DrawComponent } from './draw/draw.component';
import { FieldComponent } from './field/field.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawComponent,
    FieldComponent
  ],
  imports: [
    BrowserModule,
    CanvasWhiteboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
