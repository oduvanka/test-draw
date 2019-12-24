import { CanvasWhiteboardShape, CanvasWhiteboardPoint, CanvasWhiteboardShapeOptions, CanvasWhiteboardUpdate } from 'ng2-canvas-whiteboard';
import { DataService } from '../data.service';

export class PolygonalChainShape extends CanvasWhiteboardShape { 
  linePositions: CanvasWhiteboardPoint[];
  endPosition: CanvasWhiteboardPoint;
  private pointsCoords: Object[];
 
  constructor(
    positionPoint?: CanvasWhiteboardPoint, 
    options?: CanvasWhiteboardShapeOptions, 
    endPosition?: CanvasWhiteboardPoint,
    private _dataService?: DataService,
  ) {
    super(positionPoint, options);
    this.linePositions = [];
    this.endPosition = endPosition || new CanvasWhiteboardPoint(this.positionPoint.x, this.positionPoint.y);

    console.log("broken-line - contructor");
    console.log(this._dataService);
  }

  getShapeName(): string {
    return 'PolygonalChain';
  }

  draw(context: CanvasRenderingContext2D): any {
    Object.assign(context, this.options);

    context.beginPath();

    context.moveTo(this.positionPoint.x, this.positionPoint.y);
    this.linePositions.forEach((linePosition) => {
      context.lineTo(linePosition.x, linePosition.y);
    });
    context.lineTo(this.endPosition.x, this.endPosition.y);
    context.stroke();
    console.log(this.endPosition);
  }

  drawPreview(context: CanvasRenderingContext2D): any {
    this.positionPoint = new CanvasWhiteboardPoint(5, 5);
      this.linePositions = [
        new CanvasWhiteboardPoint(context.canvas.width - 10, 5),
        new CanvasWhiteboardPoint(context.canvas.width/4, context.canvas.height/2),
        new CanvasWhiteboardPoint(context.canvas.width - 10, context.canvas.height - 10),
      ];
      this.endPosition = this.linePositions[2];
      this.draw(context);
  }

  onUpdateReceived(update: CanvasWhiteboardUpdate): any {
    const xFixed = Number(update.x.toFixed(0));
    const yFixed = Number(update.y.toFixed(0));
    if ((xFixed % 100 === 0) && (yFixed % 100 === 0)) {
      //console.log(xFixed, yFixed);
      this.linePositions.push(new CanvasWhiteboardPoint(xFixed, yFixed));
    }
    this.endPosition = new CanvasWhiteboardPoint(update.x, update.y);
  }

  onStopReceived(update: CanvasWhiteboardUpdate): void {
    console.log(">>> onStopReceived");
    const xFixed = Number(update.x.toFixed(0));
    const yFixed = Number(update.y.toFixed(0));
    if ((xFixed % 100 !== 0) || (yFixed % 100 !== 0)) {
      if (this.linePositions.length > 0) {
        // сбрасывает в последнюю зафиксированную точку
        this.endPosition = this.linePositions[this.linePositions.length-1];
      }
      else {
        // пока что сбрасывает в стартовую точку
        this.endPosition = new CanvasWhiteboardPoint(this.positionPoint.x, this.positionPoint.y);
      }
    }
  }
}
