import {NgModule} from '@angular/core';
import {MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [MatInputModule, MatFormFieldModule, MatCardModule],
  exports: [MatInputModule, MatFormFieldModule, MatCardModule]
})
export class MaterialStyleModule { }
