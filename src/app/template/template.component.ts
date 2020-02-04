import {Component, Input, OnInit} from '@angular/core';
import {Template} from '../model/template.model';
import {MatDialog} from '@angular/material';
import {TemplateDetailComponent} from './template-detail/template-detail.component';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  @Input()
  private template: Template;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {

  }

  onAdd() {
    const data: Template = this.template;
    // open dialog to alter metadata
    this.dialog.open(TemplateDetailComponent, {data, width: '400px'});
  }
}
