import {Application} from './application.model';

export interface Tile {
  id: number;
  title: string;
  description: string;
  icon: string;
  application: Application;
}
