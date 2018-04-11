import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing } from './app.routing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MedicinesComponent } from './medicines.component';
import { AddMedicineFormComponent } from './addmedicine-form.component';
import { EditMedicineFormComponent } from './editmedicine-form.component';
import { MedicineService } from './medicines.service';
import { MedicineFilterPipe } from './medicines-filter.pipe';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    MedicinesComponent,
    AddMedicineFormComponent,
    EditMedicineFormComponent,
    MedicineFilterPipe
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [MedicineService], 
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }

