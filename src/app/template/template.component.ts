import {Component, Input, OnInit} from '@angular/core';
import {Template} from '../model/template.model';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  @Input()
  private template: Template;
  isAdded: boolean;

  constructor() { }

  ngOnInit() {

  }

}
