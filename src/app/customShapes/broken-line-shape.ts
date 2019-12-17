import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasWhiteboardPoint, CanvasWhiteboardShapeOptions, CanvasWhiteboardUpdate, CanvasWhiteboardShape } from 'ng2-canvas-whiteboard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class BrokenLineShape extends CanvasWhiteboardShape { 
  linePositions: Array<number>;
 
  constructor(positionPoint?: CanvasWhiteboardPoint, options?: CanvasWhiteboardShapeOptions) {
      // Optional constructor if you need some additional setup
      super(positionPoint, options);
      this.linePositions = [];
  }

  getShapeName(): string {
      // Abstract method which should return a string with the shape name
      // Should be the same as the class name
      return 'BrokenLineShape';
  }

  draw(context: CanvasRenderingContext2D): any {
      // Tell the canvas how to draw your shape here

      // Use the selected options from the canvas whiteboard
      // Object.assign(context, this.options);

      // Start drawing
      // context.save();
      // context.beginPath();
      // context.stroke();
      // context.fill();
      // context.closePath();
      // context.restore();
  }

  drawPreview(context: CanvasRenderingContext2D): any {
      // Provide info or update this object when it's needed for preview drawing.
      // Example: The CIRCLE selects the center point and updates the radius.
      // Example: The RECT selects 0,0 and updates width and height to 100%.

      // Then call the draw method with the updated object if you want your shape
      // to have a proper preview.

      // this.draw(context);
  }

  onUpdateReceived(update: CanvasWhiteboardUpdate): any {
      // Choose what your shape does when an update is registered for it
      // For example the CircleShape updates it's radius
  }

  onStopReceived(update: CanvasWhiteboardUpdate): void {
      // This method is optional but CAN be overriden
  }
}
