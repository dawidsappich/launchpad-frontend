import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TemplateDetailComponent} from '../../template/template-detail/template-detail.component';
import {Tile} from '../../model/tile.model';
import {FormControl, FormGroup} from '@angular/forms';
import {LaunchpadService} from '../../launchpad/service/launchpad.service';

@Component({
  selector: 'app-tile-detail',
  templateUrl: './tile-detail.component.html',
  styleUrls: ['./tile-detail.component.scss']
})
export class TileDetailComponent implements OnInit {

  tileDetailForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<TemplateDetailComponent>,
              @Inject(MAT_DIALOG_DATA) private data: Tile,
              private launchpadService: LaunchpadService) {
  }

  ngOnInit() {
    this.tileDetailForm = new FormGroup({
      title: new FormControl(this.data.title),
      desc: new FormControl(this.data.description)
    });
  }

  onSubmit() {
    this.updateTileValues();
    this.launchpadService.updateTile(this.data);
    this.dialogRef.close();
  }

  private updateTileValues() {
    const title = this.tileDetailForm.get('title').value;
    const desc = this.tileDetailForm.get('desc').value;

    this.data.title = title;
    this.data.description = desc;
  }

  onCancel() {
    this.dialogRef.close();
  }
}
