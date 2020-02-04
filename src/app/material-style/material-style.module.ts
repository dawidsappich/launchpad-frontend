import {NgModule} from '@angular/core';
import {
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [MatInputModule, MatFormFieldModule, MatCardModule, MatToolbarModule, MatSnackBarModule, MatListModule, MatDialogModule],
  exports: [MatInputModule, MatFormFieldModule, MatCardModule, MatToolbarModule, MatSnackBarModule, MatListModule, MatDialogModule]
})
export class MaterialStyleModule { }
