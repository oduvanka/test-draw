import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';

import { AppComponent } from './app.component';
import { DrawComponent } from './draw/draw.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawComponent
  ],
  imports: [
    BrowserModule,
    CanvasWhiteboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
