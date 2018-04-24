import { Injectable } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

//import { Medicine } from './medicine';


@Injectable()
export class MedicineService {
    private _pharmacyUrl = "http://localhost:3000/medicine/";
    
    constructor (private _http: HttpClient) { }

    getMedicines() {  
        return this._http.get(this._pharmacyUrl);
    }

    addMedicine(newMedicine: any) {
        return this._http.post(this._pharmacyUrl, newMedicine);
      }

    getMedicine(id:any) {
        return this._http.get(this._pharmacyUrl + id);
    } 
    
    updateMedicine(updatedMedicine: any) {
        let id = updatedMedicine._id;
        return this._http.put(this._pharmacyUrl + id, updatedMedicine);
    }

    deleteMedicine(id: any) {
        return this._http.delete(this._pharmacyUrl + id);
    }

    deleteMultipleMedicines(delArray:any[]) {
        return this._http.post(this._pharmacyUrl + 'deleteall', delArray);
    }
}