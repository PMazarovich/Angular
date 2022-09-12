import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
  { id: 1, name: 'Crash Bandicoot' },
  { id: 2, name: 'Neo Cortex' },
  { id: 3, name: 'N-Gin' },
  { id: 4, name: 'Coco Bandicoot' },
  { id: 5, name: 'Ripper Roo' },
  { id: 6, name: 'Papu Papu' },
  { id: 7, name: 'Tiny Tiger' },
  { id: 8, name: 'Polar' },
  { id: 9, name: 'Pura' },
  { id: 10, name: 'Dingodile' }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}