"use strict";

var medicines = require('./medicinesData').medicines;
var _ = require('lodash');

// var currentID = 5;
var _clone = function(item) {
	return JSON.parse(JSON.stringify(item));
};

var currentID = _clone(medicines).length;

var MedicinesApi = {
	getAllMedicines: function(callback) {
		callback(null, _clone(medicines));
	},
  getMedicineById: function(id, callback) {
    var medicine = _.find(medicines, {medicineId: parseInt(id)});
    callback (null, _clone(medicine));
  },
  updateMedicineById: function(id, medicine, callback) {
    var existingMedicineIndex = _.indexOf(medicines, _.find(medicines, {medicineId: parseInt(id)}));
    medicine.medicineId = parseInt(id);
    medicines.splice(existingMedicineIndex, 1, medicine);
    callback (null);
  },
	saveMedicine: function(medicine, callback) {
		currentID += 1;
    medicine.medicineId = currentID;
    medicines.push(medicine);
		callback(null, _clone(medicine));
	},
	deleteMedicineById: function(id, callback) {
		_.remove(medicines, { medicineId: parseInt(id)});
    callback(null);
  },

  deleteMultipleMedicines: function(medArray, callback) {
      medArray.forEach(function(med){
          _.remove(medicines, { medicineId: parseInt(med.medicineId)});
      });

    callback(null);
  }

};

module.exports = MedicinesApi;
