//var MedicineApi = require('../data/MedicinesApi');
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/medicine', function(req, res) {
    MedicineApi.getAllMedicines(function(err, items){
        res.json(items);
      });
  Medicine.find({}, function (err, medicines) {
    if (err)
        res.send(err);
    else {
        console.log(medicines);
        res.json(medicines);
    }
});

});

router.post('/medicine', function(req, res) {
  var newMedicine = new Medicine();
  //newMedicine._id = 2;
  //newMedicine.medcineId = 1;
  newMedicine.name = req.body.name;
  newMedicine.manufacturer = req.body.manufacturer;
  newMedicine.batchNo = req.body.batchNo;
  newMedicine.expirationDate = req.body.expirationDate;
  newMedicine.price = parseInt(req.body.price);
  newMedicine.type = req.body.type;

  newMedicine.save(function (err, medicine) {
      if (err)
          res.send(err);
      else {
         // console.log(medicine);
          res.json(medicine);
      }
 });

 MedicineApi.saveMedicine(medicine, function(err, medicine) {
    res.json(medicine);
   });

});

router.get('/medicine/:id', function(req, res) {
  /*
  MedicineApi.getMedicineById(req.params.id, function(err, medicine) {
    res.json(medicine);
  }); */
  console.log('gettting medicine by _id... ');
  console.log(req.params);
  Medicine.findOne({ _id: req.params.id }, function (err, medicine) {
      if (err)
          res.send(err);
      else {
          console.log(medicine);
          res.json(medicine);
      }
  });
});

router.put('/medicine/:id', function(req, res) {
  /*
  var updatedMedicine = {};
  updatedMedicine.name = req.body.name;
  updatedMedicine.manufacturer = req.body.manufacturer;
  updatedMedicine.batchNo = req.body.batchNo;
  updatedMedicine.expirationDate = req.body.expirationDate;
  updatedMedicine.price = req.body.price;
  updatedMedicine.type = req.body.type;
  MedicineApi.updateMedicineById(req.params.id, updatedMedicine, function(err) {
    res.json(updatedMedicine);
  }); */
  console.log('updating medicine by _id... ');
    Medicine.findOneAndUpdate({ _id: req.params.id },
        { $set: { name : req.body.name, 
                  manufacturer :req.body.manufacturer, 
                  batchNo : req.body.batchNo,
                  expirationDate : req.body.expirationDate, 
                  price: parseInt(req.body.price), 
                  type : req.body.type} },
        {new: true},
        function (err, medicine) {
            if (err)
                res.send(err);
            else {
                console.log(medicine);
                res.json(medicine);
            }
        });

        MedicineApi.updateMedicineById(req.params.id, updatedMedicine, function(err) {
            res.json(updatedMedicine);
          });
});

router.delete('/medicine/:id', function(req, res) {
  console.log('deleting medicine by _id... ');
  Medicine.findOneAndRemove({ _id: req.params.id }, function (err, medicine) {
      if (err)
          res.send(err);
      else {
         // console.log(medicine);
          res.json(medicine);
      }
  });

  MedicineApi.deleteMedicineById(req.params.id, function(err) {
    res.json();
  });

});

router.post('/medicine/deleteall', function(req, res) {
  console.log(req.body);
  /*
  MedicineApi.deleteMultipleMedicines(req.body, function(err) {
     res.json();
   });
   */
   var ids = [];
   req.body.forEach((medicine)=> ids.push(medicine._id) );
   console.log('ids...');
   console.log(ids);
   Medicine.deleteMany({_id: {$in:ids} }, function(err, medicine){
     if(err)
        res.send(err);
     else {
       res.json(medicine);
     }
   });
   MedicineApi.deleteMultipleMedicines(req.body, function(err) {
    res.json();
  });
});

module.exports = router;
