import {NgModule} from '@angular/core';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [MatInputModule, MatFormFieldModule, MatCardModule, MatToolbarModule],
  exports: [MatInputModule, MatFormFieldModule, MatCardModule, MatToolbarModule]
})
export class MaterialStyleModule { }
