import { Component } from '@angular/core';
import { MedicineService } from './medicines.service';
import { Router } from '@angular/router';


@Component({
    selector: 'addmedicine-form',
    templateUrl: './addmedicine-form.component.html'
})
export class AddMedicineFormComponent{
    types: string[] =["Capsule", "Tablet", "Syrup", "Gel"];
    name: string;
    constructor(private _medicineService: MedicineService, private router: Router) { }

    onSave(formValue: any){
      let newMedicine = {
           // medicineId: medicinesCount + 1,
            name: formValue.name,
            manufacturer: formValue.manufacturer,
            batchNo: formValue.batchNo,
            expirationDate: formValue.expirationDate,
            price: formValue.price,
            type: formValue.type
          };
      this._medicineService.addMedicine(newMedicine).subscribe(
        (medicines:any) => this.router.navigate(['']),
        err => console.log(err)
      );
    }
    
}

