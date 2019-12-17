import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasWhiteboardShape, CanvasWhiteboardPoint, CanvasWhiteboardShapeOptions, CanvasWhiteboardUpdate } from 'ng2-canvas-whiteboard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TriangleShape extends CanvasWhiteboardShape {
  width: number;
  height: number;
  endPosition: CanvasWhiteboardPoint;
 
  constructor(
    positionPoint?: CanvasWhiteboardPoint, 
    options?: CanvasWhiteboardShapeOptions,
    width?: number,
    height?: number,
    endPosition?: CanvasWhiteboardPoint
  ) {
      // Optional constructor if you need some additional setup
      super(positionPoint, options);
      this.width = width || 0;
      this.height = height || 0;
      this.endPosition = endPosition || new CanvasWhiteboardPoint(this.positionPoint.x, this.positionPoint.y);
  }

  getShapeName(): string {
      return 'TriangleShape';
  }

  draw(context: CanvasRenderingContext2D): any {
    if (!this.width || !this.height || !this.endPosition) {
      return;
    }

    Object.assign(context, this.options);

    context.beginPath();

    context.moveTo(this.positionPoint.x, this.positionPoint.y); // смещение курсора

    context.lineTo(this.endPosition.x, this.positionPoint.y);
    context.lineTo(this.positionPoint.x + this.width/2, this.positionPoint.y - this.height);
    context.lineTo(this.positionPoint.x, this.positionPoint.y);

    if (this.options.shouldFillShape) context.fill(); // заливка
    context.stroke(); // обводка контуров

    context.closePath();
  }

  drawPreview(context: CanvasRenderingContext2D): any {
    this.positionPoint = new CanvasWhiteboardPoint(0, context.canvas.height);
    this.endPosition = new CanvasWhiteboardPoint(context.canvas.width, 0);
    this.width = context.canvas.width;
    this.height = context.canvas.height;
    this.draw(context);
  }

  onUpdateReceived(update: CanvasWhiteboardUpdate): any {
    this.width = update.x - this.positionPoint.x;
    this.height = update.y - this.positionPoint.y;
    this.endPosition = new CanvasWhiteboardPoint(update.x, update.y);
  }

  onStopReceived(update: CanvasWhiteboardUpdate): void {
  }
}
