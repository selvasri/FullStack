import { RouterModule, Routes } from '@angular/router';

import { AddMedicineFormComponent } from './addmedicine-form.component';
import { MedicinesComponent } from './medicines.component';
import { EditMedicineFormComponent } from './editmedicine-form.component'

const appRoutes: Routes = [
    { path: '', component: MedicinesComponent },   
    { path: 'addmedicine', component: AddMedicineFormComponent},
    { path: 'editmedicine/:medicineId', component: EditMedicineFormComponent}
  ];
  
  export const routing = RouterModule.forRoot(appRoutes);