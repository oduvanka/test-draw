import { Component, OnInit, Input } from '@angular/core';
import { 
  CanvasWhiteboardComponent, CanvasWhiteboardOptions, CanvasWhiteboardService, CanvasWhiteboardShapeService, CanvasWhiteboardUpdate, 
  CircleShape, RectangleShape, CanvasWhiteboardShapeOptions, /*FreeHandShape, LineShape, SmileyShape, StarShape*/
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
  private update: CanvasWhiteboardUpdate[] = [];
  private selectedShapeOptions: CanvasWhiteboardShapeOptions;

  constructor(private _canvasWhiteboardService: CanvasWhiteboardService, private _canvasWhiteboardShapeService: CanvasWhiteboardShapeService) { 
    _canvasWhiteboardShapeService.registerShapes([BrokenLineShape, TriangleShape]);
    _canvasWhiteboardShapeService.unregisterShapes([CircleShape, RectangleShape, /*FreeHandShape, LineShape, SmileyShape, StarShape*/]);
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
      strokeColor: "rgb(0, 0, 0)",
      shouldDownloadDrawing: true,
      drawingEnabled: true,
      showShapeSelector: true
    };

    this.selectedShapeOptions = {
      shouldFillShape: true,
      fillStyle: "rgba(255, 112, 51, 0.25)",
      strokeStyle: "rgb(255, 112, 51)",
      lineWidth: 1,
      lineJoin: "round",
      lineCap: "round",
    }
  }

  onCanvasDraw(evt) {
    console.log("onCanvasDraw");
    console.log(evt);
  }
  onCanvasClear() {
    console.log("onCanvasClear");
    
    this.update = [];
    const selectedShape = "TriangleShape";
    const typeStart = 0;
    const typeDrag = 1;
    const typeEnd = 2;

    this.points.map((item) => {
      const coorsd = item['coords'];
      const xStart = coorsd['x'] / 100;
      const xEnd = (coorsd['x'] + 2) / 100;
      const yStart = coorsd['y'] / 100;
      const yEnd = (coorsd['y'] + 10) / 100;

      const UUID = "" + item["id"];

      const mineral = item['mineral'];
      const mineralName = mineral['name'];
      const hexColor = mineral['color'];
      const shapeOptions = Object.assign({}, this.selectedShapeOptions, { strokeStyle: hexColor, fillStyle: hexColor+"75" })
      
      this.update.push(new CanvasWhiteboardUpdate(xStart, yStart, typeStart, UUID, selectedShape, shapeOptions));
      this.update.push(new CanvasWhiteboardUpdate(xEnd, yEnd, typeDrag, UUID, undefined, undefined));
      this.update.push(new CanvasWhiteboardUpdate(xEnd, yEnd, typeEnd, UUID, undefined, undefined));  
    })

    this._canvasWhiteboardService.drawCanvas(this.update);
  }
  onCanvasUndo(uuid) {
    console.log("onCanvasUndo");
  }
  onCanvasRedo(uuid) {
    console.log("onCanvasRedo");
  }
}
