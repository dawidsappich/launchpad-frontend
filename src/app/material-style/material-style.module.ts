import {NgModule} from '@angular/core';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatListModule, MatSnackBarModule, MatToolbarModule} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [MatInputModule, MatFormFieldModule, MatCardModule, MatToolbarModule, MatSnackBarModule, MatListModule],
  exports: [MatInputModule, MatFormFieldModule, MatCardModule, MatToolbarModule, MatSnackBarModule, MatListModule]
})
export class MaterialStyleModule { }
