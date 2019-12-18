import { Component, OnInit } from '@angular/core';
import { CanvasWhiteboardComponent, CanvasWhiteboardOptions, CanvasWhiteboardService, CanvasWhiteboardShapeService } from 'ng2-canvas-whiteboard';
import { BrokenLineShape } from '../customShapes/broken-line-shape';
import { TriangleShape } from '../customShapes/triangle-shape';


@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css'],
  viewProviders: [CanvasWhiteboardComponent],
})
export class DrawComponent implements OnInit {

  private canvasOptions: CanvasWhiteboardOptions;

  constructor(private _canvasWhiteboardService: CanvasWhiteboardService, private _canvasWhiteboardShapeService: CanvasWhiteboardShapeService) { 
    _canvasWhiteboardShapeService.registerShape(BrokenLineShape);
    _canvasWhiteboardShapeService.registerShape(TriangleShape);
  }

  ngOnInit() {
    this.canvasOptions = {
      drawButtonEnabled: false,
      drawButtonClass: "drawButtonClass",
      drawButtonText: "Draw",
      clearButtonEnabled: true,
      clearButtonClass: "clearButtonClass",
      clearButtonText: "Clear",
      undoButtonText: "Undo",
      undoButtonEnabled: true,
      redoButtonText: "Redo",
      redoButtonEnabled: true,
      colorPickerEnabled: true,
      saveDataButtonEnabled: true,
      saveDataButtonText: "Save",
      lineWidth: 5,
      strokeColor: "rgb(0,0,0)",
      shouldDownloadDrawing: true,
      drawingEnabled: true,
      showShapeSelector: true
    };
  }

  onCanvasDraw(evt) {
    /*console.log("onCanvasDraw");
    console.log(evt);*/
  }
  onCanvasClear() {
    //console.log("onCanvasClear");
  }
  onCanvasUndo(evt) {
    /*console.log("onCanvasUndo");
    console.log(evt);*/
  }
  onCanvasRedo(evt) {
    /*console.log("onCanvasRedo");
    console.log(evt);*/
  }
}
