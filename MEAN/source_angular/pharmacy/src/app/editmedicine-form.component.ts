import { Component } from '@angular/core'
import { Router, Params, ActivatedRoute } from '@angular/router';

import { MedicineService } from './medicines.service';

@Component({
    templateUrl: './editmedicine-form.component.html'
})
export class EditMedicineFormComponent{
    types: string[] =["Capsule", "Tablet", "Syrup", "Gel"];

    constructor(private _medicineService: MedicineService, private router: Router, private route: ActivatedRoute) { }
    medicineId: string;
    medicine: any = {};

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.medicineId = params['medicineId'];
        });
        this._medicineService.getMedicine(this.medicineId).subscribe(
            (medicine:any) =>  this.medicine = medicine,
            err => console.log(err)
        );
    }

    onUpdate(formValue: any){
        let updateMedicine = {
            _id: this.medicine._id,
            name: formValue.name,
            manufacturer: formValue.manufacturer,
            batchNo: formValue.batchNo,
            expirationDate: formValue.expirationDate,
            price: formValue.price,
            type: formValue.type
        };
       this._medicineService.updateMedicine(updateMedicine).subscribe(
            (medicines:any) => { this.router.navigate(['']);},
            err => console.log(err)
        );
    }


}