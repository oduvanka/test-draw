import { Component, OnInit } from '@angular/core';
import { 
  CanvasWhiteboardComponent, CanvasWhiteboardOptions, CanvasWhiteboardService, CanvasWhiteboardShapeService, CanvasWhiteboardUpdate, 
  CircleShape, RectangleShape, CanvasWhiteboardShapeOptions, /*FreeHandShape, LineShape, SmileyShape, StarShape*/
} from 'ng2-canvas-whiteboard';

import { PolygonalChainShape } from '../customShapes/polygonal-chain-shape';
import { TriangleShape } from '../customShapes/triangle-shape';
import { DataService } from '../data.service';


@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css'],
  viewProviders: [CanvasWhiteboardComponent],
})
export class DrawComponent implements OnInit {

  private canvasOptions: CanvasWhiteboardOptions;
  private selectedShapeOptions: CanvasWhiteboardShapeOptions;
  private points: Object[];
  private minerals: Map<number, Object>;
  private update: CanvasWhiteboardUpdate[] = [];
  private isDraw: boolean;

  constructor(
    private _canvasWhiteboardService: CanvasWhiteboardService, 
    private _canvasWhiteboardShapeService: CanvasWhiteboardShapeService,
    private _dataService: DataService
  ) { 
    _canvasWhiteboardShapeService.registerShapes([PolygonalChainShape, TriangleShape]);
    _canvasWhiteboardShapeService.unregisterShapes([CircleShape, RectangleShape, /*FreeHandShape, LineShape, SmileyShape, StarShape*/]);
    
    this.isDraw = false;

    console.log("draw - constructor");
    console.log(_dataService);
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
      startingColor: "rgba(0, 128, 0, 0.25)",
      shouldDownloadDrawing: true,
      drawingEnabled: true,
      showShapeSelector: true
    };

    this.selectedShapeOptions = {
      shouldFillShape: true,
      fillStyle: "rgba(0, 0, 0, 0.75)",
      strokeStyle: "rgb(0, 0, 0)",
      lineWidth: 1,
      lineJoin: "round",
      lineCap: "round",
    };

    this.points = this._dataService.getData();
    this.minerals = this._dataService.getMinerals();
  }

  onCanvasDraw(evt) {
    //console.log("DrawComponent - onCanvasDraw");
    if (!this.isDraw) {
      this.isDraw = true;
      this.setPoints();
    }
  }
  onCanvasClear() {
    //console.log("DrawComponent - onCanvasClear");
    this.setPoints();
  }
  onCanvasUndo(uuid) {
    //console.log("DrawComponent - onCanvasUndo");
  }
  onCanvasRedo(uuid) {
    //console.log("DrawComponent - onCanvasRedo");
  }

  setPoints() {
    console.log("DrawComponent - setPoints");

    this.update = [];
    const selectedTriangle = "TriangleShape";
    const selectedPolygonalLine = /* "PolygonalChainShape"; */ "FreeHandShape";
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
      const hexColor = mineral['color'];
      const triangleOptions = Object.assign({}, this.selectedShapeOptions, { strokeStyle: hexColor, fillStyle: hexColor+"75" });
      
      this.update.push(new CanvasWhiteboardUpdate(xStart, yStart, typeStart, UUID, selectedTriangle, triangleOptions));
      this.update.push(new CanvasWhiteboardUpdate(xEnd, yEnd, typeDrag, UUID, undefined, undefined));
      this.update.push(new CanvasWhiteboardUpdate(xEnd, yEnd, typeEnd, UUID, undefined, undefined));
    });

    for (let mineral of this.minerals.values()) {
      const mineralPoints = mineral['points'];
      const lengthMinerals = mineralPoints.length;
      if (lengthMinerals > 1) {
        // есть смысл рисовать линию
        const UUID = /* "" + mineral["id"]; */ mineral['color'];

        const hexColor = mineral['color'];
        const lineOptions = Object.assign({}, this.selectedShapeOptions, { strokeStyle: hexColor, fillStyle: hexColor+"25" });

        for (let i=1; i < lengthMinerals; i++) {
          const xStart = mineralPoints[i-1]['x'] / 100;
          const yStart = mineralPoints[i-1]['y'] / 100;
          
          const xEnd = mineralPoints[i]['x'] / 100;
          const yEnd = mineralPoints[i]['y'] / 100;
          
          this.update.push(new CanvasWhiteboardUpdate(xStart, yStart, typeStart, UUID, selectedPolygonalLine, lineOptions));
          this.update.push(new CanvasWhiteboardUpdate(xEnd, yEnd, typeDrag, UUID, undefined, undefined));
          this.update.push(new CanvasWhiteboardUpdate(xEnd, yEnd, typeEnd, UUID, undefined, undefined));        
        }
      }
    }
    this._canvasWhiteboardService.drawCanvas(this.update);
  }
}
