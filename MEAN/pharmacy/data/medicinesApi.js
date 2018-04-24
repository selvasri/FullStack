"use strict";

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/pharmacydb', {useMongoClient: true});
mongoose.connect('mongodb://127.0.0.1:27017/pharmacydb', {useMongoClient: true});

var medicineSchema = new mongoose.Schema({
  name: String,
  manufacturer: String,
  batchNo: String,
  expirationDate: String,
  price: Number,
  type:String
});

var Medicine = mongoose.model('medicine', medicineSchema);

var _clone = function(item) {
	return JSON.parse(JSON.stringify(item));
};

var MedicinesApi = {
	getAllMedicines: function(callback) {
        Medicine.find({}, function (err, medicines) {
            if (err){
                res.send(err);
            }
            else {
                callback(null, _clone(medicines));
            }
        });
	},
    getMedicineById: function(id, callback) {
        Medicine.findOne({ _id: id }, function (err, medicine) {
            if (err)
                res.send(err);
            else {
                callback (null, _clone(medicine));
            }
        });
    },
    updateMedicineById: function(id, medicine, callback) {
        Medicine.findOneAndUpdate(
            { _id: id },
            { $set: { name : medicine.name, 
                      manufacturer :medicine.manufacturer, 
                      batchNo : medicine.batchNo,
                      expirationDate : medicine.expirationDate, 
                      price: parseInt(medicine.price), 
                      type : medicine.type
                    }
            },
            {new: true},
            function (err, medicine) {
                if (err)
                    res.send(err);
                else {
                    callback (null, _clone(medicine));
                }
            });
    },
	saveMedicine: function(medicine, callback) {
        var newMedicine = new Medicine();
        newMedicine.name = medicine.name;
        newMedicine.manufacturer = medicine.manufacturer;
        newMedicine.batchNo = medicine.batchNo;
        newMedicine.expirationDate = medicine.expirationDate;
        newMedicine.price = parseInt(medicine.price);
        newMedicine.type = medicine.type;
    
        newMedicine.save(function (err, medicine) {
            if (err)
                res.send(err);
            else {
                callback(null, _clone(medicine));
            }
        });
	},
	deleteMedicineById: function(id, callback) {
        Medicine.findOneAndRemove({ _id: id }, function (err, medicine) {
            if (err)
                res.send(err);
            else {
                callback(null);
            }
        });
    },

    deleteMultipleMedicines: function(medArray, callback) {
        var ids = [];
        medArray.forEach((medicine)=> ids.push(medicine._id) );
        Medicine.deleteMany(
                    {_id: {$in:ids} }, 
                    function(err, medicine){
                       if(err)
                            res.send(err);
                        else {
                            callback(null);
                        }
        });
    }

};

module.exports = MedicinesApi;
