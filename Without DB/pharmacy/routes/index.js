var MedicineApi = require('../data/MedicinesApi');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/medicine', function(req, res) {
  MedicineApi.getAllMedicines(function(err, items){
    res.json(items);
  });
});

router.post('/medicine', function(req, res) {
  var medicine = {};
  medicine.name = req.body.name;
  medicine.manufacturer = req.body.manufacturer;
  medicine.batchNo = req.body.batchNo;
  medicine.expirationDate = req.body.expirationDate;
  medicine.price = req.body.price;
  medicine.type = req.body.type;

  MedicineApi.saveMedicine(medicine, function(err, medicine) {
   res.json(medicine);
  });
});

router.get('/medicine/:id', function(req, res) {
  MedicineApi.getMedicineById(req.params.id, function(err, medicine) {
    res.json(medicine);
  });
});

router.put('/medicine/:id', function(req, res) {
  var updatedMedicine = {};
  updatedMedicine.name = req.body.name;
  updatedMedicine.manufacturer = req.body.manufacturer;
  updatedMedicine.batchNo = req.body.batchNo;
  updatedMedicine.expirationDate = req.body.expirationDate;
  updatedMedicine.price = req.body.price;
  updatedMedicine.type = req.body.type;
  MedicineApi.updateMedicineById(req.params.id, updatedMedicine, function(err) {
    res.json(updatedMedicine);
  });
});

router.delete('/medicine/:id', function(req, res) {
  MedicineApi.deleteMedicineById(req.params.id, function(err) {
    res.json();
  });
});

router.post('/medicine/deleteall', function(req, res) {
  MedicineApi.deleteMultipleMedicines(req.body, function(err) {
     res.json();
   });
});

module.exports = router;
