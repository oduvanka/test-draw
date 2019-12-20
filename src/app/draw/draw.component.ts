import { Component, OnInit, Input } from '@angular/core';
import { 
  CanvasWhiteboardComponent, CanvasWhiteboardOptions, CanvasWhiteboardService, CanvasWhiteboardShapeService, CanvasWhiteboardUpdate, 
  CircleShape, RectangleShape, CanvasWhiteboardShapeOptions, FreeHandShape, LineShape, SmileyShape, StarShape
} from 'ng2-canvas-whiteboard';
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
  @Input() points: Array<Object>;
  private update: CanvasWhiteboardUpdate[];
  private newShape: CanvasWhiteboardUpdate;
  private selectedShapeOptions: CanvasWhiteboardShapeOptions;

  constructor(private _canvasWhiteboardService: CanvasWhiteboardService, private _canvasWhiteboardShapeService: CanvasWhiteboardShapeService) { 
    _canvasWhiteboardShapeService.registerShapes([BrokenLineShape, TriangleShape]);
    _canvasWhiteboardShapeService.unregisterShapes([CircleShape, RectangleShape, FreeHandShape, LineShape, SmileyShape, StarShape]);
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

    this.selectedShapeOptions = {
      shouldFillShape: true,
      fillStyle: "rgba(0,0,0,0)",
      strokeStyle: "rgb(0,0,0)",
      lineWidth: 5,
      lineJoin: "round",
      lineCap: "round",
    }
    
    this.points.map((item) => {
      /*const x = item['x'];
      const y = item["y"];
      const type = 2;
      const UUID = item["id"];
      const selectedShape = "CircleShape";
      const selectedShapeOptions = this.selectedShapeOptions;
     
      this.newShape = {
        x: item['x'],
        y: item["y"],
        type: 2,
        UUID: item["id"],
        selectedShape: "CircleShape",
        selectedShapeOptions: this.selectedShapeOptions
      }*/

      //this.newShape.x = 15;
      //this.newShape.x = item['x'];

      //this.update.push(this.newShape);
    })

    this._canvasWhiteboardService.drawCanvas(this.update);
  }

  onCanvasDraw(evt) {
    console.log("onCanvasDraw");
    console.log(evt);
  }
  onCanvasClear() {
    //console.log("onCanvasClear");
  }
  onCanvasUndo(evt) {
    /*console.log("onCanvasUndo");
    console.log(evt);*/
    console.log(this);
  }
  onCanvasRedo(evt) {
    /*console.log("onCanvasRedo");
    console.log(evt);*/
  }
}
