import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = [
    {
      id: 101,
      name: "mine 1",
      coords: { x: 11, y: 15, z: 10 },
      mineral: { name: "bauxite", color: "#FF7033" }
    },
    {
      id: 102,
      name: "mine 2",
      coords: { x: 40, y: 10, z: 10 },
      mineral: { name: "iron", color: "#0055BB" }
    },
    {
      id: 103,
      name: "mine 3",
      coords: { x: 68, y: 12, z: 10 },
      mineral: { name: "gold", color: "#FFCF48" }
    },
    {
      id: 104,
      name: "mine 4",
      coords: { x: 27, y: 30, z: 10 },
      mineral: { name: "iron", color: "#0055BB" }
    },
    {
      id: 105,
      name: "mine 5",
      coords: { x: 66, y: 32, z: 10 },
      mineral: { name: "bauxite", color: "#FF7033" }
    },
    {
      id: 106,
      name: "mine 6",
      coords: { x: 52, y: 69, z: 10 },
      mineral: { name: "iron", color: "#0055BB" }
    },
    {
      id: 107,
      name: "mine 7",
      coords: { x: 80, y: 81, z: 10 },
      mineral: { name: "bauxite", color: "#FF7033" }
    },
    {
      id: 108,
      name: "mine 8",
      coords: { x: 17, y: 90, z: 10 },
      mineral: { name: "oil", color: "#000000" }
    },
    {
      id: 109,
      name: "mine 9",
      coords: { x: 33, y: 89, z: 10 },
      mineral: { name: "bauxite", color: "#FF7033" }
    },
    {
      id: 110,
      name: "mine 10",
      coords: { x: 90, y: 85, z: 10 },
      mineral: { name: "iron", color: "#0055BB" }
    }
  ]

  constructor() { }

  getData() {
    return this.data;
  }

  getCoords() {
    let pointsCoords: Object[];
    this.data.map((item) => {
      const coords = item['coords'];
      const coordX = coords['x'];
      const coordY = coords['y'];
      pointsCoords.push([coordX, coordY]);
    });
    return pointsCoords;
  }
}
