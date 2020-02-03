import {Tile} from './tile.model';

export interface Launchpad {
  id: number;
  title: string;
  template: object;
  tiles: Tile[];
}
