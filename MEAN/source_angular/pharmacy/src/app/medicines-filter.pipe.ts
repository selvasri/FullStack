import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'medicineFilter'})
export class MedicineFilterPipe implements PipeTransform {
    transform(value: any[], args: string): any[] {
        let filter: string = args ? args.toLocaleLowerCase() : null;
        return filter ? value.filter((medicine) =>
                medicine.name.toLocaleLowerCase().includes(filter) != false) : value;
    }
}