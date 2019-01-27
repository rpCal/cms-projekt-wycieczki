import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatDatepickerModule, MatNativeDateModule } from "@angular/material";

import { NgModule } from '@angular/core';


@NgModule({
  exports: [
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  declarations: []
})
export class MaterialModule { }
