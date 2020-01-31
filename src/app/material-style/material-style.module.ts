import {NgModule} from '@angular/core';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatToolbarModule} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [MatInputModule, MatFormFieldModule, MatCardModule, MatToolbarModule, MatSnackBarModule],
  exports: [MatInputModule, MatFormFieldModule, MatCardModule, MatToolbarModule, MatSnackBarModule]
})
export class MaterialStyleModule { }
