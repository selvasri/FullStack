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
    MedicineApi.saveMedicine(req.body, function(err, medicine) {
        res.json(medicine);
    });
});

router.get('/medicine/:id', function(req, res) {  
    MedicineApi.getMedicineById(req.params.id, function(err, medicine) {
        res.json(medicine);
    });
});

router.put('/medicine/:id', function(req, res) {
    MedicineApi.updateMedicineById(req.params.id, req.body, function(err, updatedMedicine) {
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
