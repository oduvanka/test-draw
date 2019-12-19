import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
/* площадка 100 на 100 метров */
  private objects = [
    { id: 101, name: "peg 1", x: 1, y: 5, z: 10 },
    { id: 102, name: "peg 2", x: 40, y: 0, z: 10 },
    { id: 103, name: "peg 3", x: 98, y: 2, z: 10 },
    { id: 104, name: "peg 4", x: 27, y: 30, z: 10 },
    { id: 105, name: "peg 5", x: 76, y: 32, z: 10 },
    { id: 106, name: "peg 6", x: 22, y: 69, z: 10 },
    { id: 107, name: "peg 7", x: 80, y: 81, z: 10 },
    { id: 108, name: "peg 8", x: 7, y: 100, z: 10 },
    { id: 109, name: "peg 9", x: 33, y: 99, z: 10 },
    { id: 110, name: "peg 10", x: 100, y: 95, z: 10 }
  ]

  constructor() { }

  ngOnInit() {
  }

}
