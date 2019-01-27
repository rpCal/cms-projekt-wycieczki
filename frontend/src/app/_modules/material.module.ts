import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from "@angular/material";

import { NgModule } from '@angular/core';


@NgModule({
  exports: [
    MatSnackBarModule,
    MatDialogModule,    
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  declarations: []
})
export class MaterialModule { }
