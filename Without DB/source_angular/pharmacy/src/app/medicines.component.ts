import { Component, OnInit } from '@angular/core';
import { MedicineService } from './medicines.service'
import { Medicine } from './medicine';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-medicines',
    templateUrl: './medicines.component.html'
})
export class MedicinesComponent implements OnInit {
    title = 'Pharmacy app';
    //show=false;
    mfg = true;
    batch = true;
    exp = true;
    price = true;
    type = true;

    searchMedicine: string;

    medicines: Medicine[];
    delArray: Medicine[]=[];
  
    
    constructor(private _medicineService: MedicineService, private router: Router){}

    ngOnInit(){
        this._medicineService.getMedicines().subscribe(
            (medicines:any) =>  this.medicines = medicines,
            err => console.log(err)
          );        
    }

    deletemedicine(id: any){
        if(!confirm('Are you sure you want to delete this medicine?')) return;
        this._medicineService.deleteMedicine(id).subscribe(
            (data) => { this.ngOnInit(); },
            err => console.log(err)
        );        
    }

    onChkChange(medicine: Medicine){
        if(this.delArray.find(med => med==medicine)){
            this.delArray.splice(this.delArray.indexOf(medicine), 1);
            console.log("test if");
        }
        else{
           this.delArray.push(medicine);
           console.log("test else");
        }
    }

    deleteMultipleMedicines()
    {
        if(!confirm('Are you sure you want to delete all the selected medicines?')) return;

        this._medicineService.deleteMultipleMedicines(this.delArray).subscribe(
            (data) => { this.ngOnInit(); },
            err => console.log(err)
        );
    }
}

