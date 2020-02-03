import {Application} from './application.model';

export interface Template {
  id: number;
  templateName: string;
  templateDescription: string;
  applications: Application[];
}
