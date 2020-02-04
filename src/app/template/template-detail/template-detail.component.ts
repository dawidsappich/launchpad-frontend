import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';
import {Template} from '../../model/template.model';
import {LaunchpadService} from '../../launchpad/service/launchpad.service';


@Component({
  selector: 'app-template-detail',
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.scss']
})
export class TemplateDetailComponent implements OnInit {
  private templateDetailForm: FormGroup;

  constructor(
              public dialogRef: MatDialogRef<TemplateDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Template,
              private launchpadService: LaunchpadService
  ) {
  }

  ngOnInit() {
    this.templateDetailForm = new FormGroup({
        name: new FormControl(this.data.templateName),
        desc: new FormControl(this.data.templateDescription),
      }
    );
  }

  onSubmit() {
    this.updateTemplateValues();

    this.launchpadService.addTile(this.data);

    this.dialogRef.close();
  }

  private updateTemplateValues() {
    const name = this.templateDetailForm.get('name').value;
    const desc = this.templateDetailForm.get('name').value;

    this.data.templateName = name;
    this.data.templateDescription = desc;
  }

  onCancel() {
    this.dialogRef.close();
  }
}
