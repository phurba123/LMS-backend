var express = require('express');
var router = express.Router();
// const customerController = require('../controllers/customers-controller');
var mongoose = require('mongoose');
const customerModel = require('../models/customers.model');
var responseLib = require('../lib/response')


/* GET customers listing. */
router.get('/', (req, res) => {
  
  customerModel.find().exec((err, result) => {
    if(err) {
      res.status(500).send(responseLib(err, 'Error finding all customer', null));
    }
    else {
      res.status(200).send({...responseLib(null, 'List of all customers', result), total: result.length})
    }
  })
});

/**
 * Get Single customer by id
 */
router.get('/cus/:id', (req, res) => {
  if(!req.params.id) {
    res.status(500).send(responseLib(null, 'Id not provided', null));
    return;
  }

  customerModel.findById({_id: req.params.id}, (err, customerResult) => {
    if (err) {
      res.status(404).send(responseLib(err, 'Unable to find customer', null));
    }
    else {
      res.status(200).send(responseLib(null, 'Customer found', customerResult));
    }
  })
})

/**
 * Create new customer
 */
router.post('/create', (req, res) => {
  let newCustomer = new customerModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    contactNo: req.body.contactNo,
    dob: new Date(),
    department: req.body.department
  });

  newCustomer.save((err, result) => {
    if(err) {
      console.log('err : ', err);
      res.status(500).send( responseLib(err, 'some error while saving new customer', null));
    }
    else {
      res.status(200).send( responseLib(null, 'New customer saved', result));
    }
  })
})

/**
 * edit customer
 */
router.put('/edit/:id', (req, res) => {
  //temp obj to update
  let newObj = req.body;
  customerModel.findByIdAndUpdate({_id: req.params.id}, newObj, { returnDocument: 'after'}, (err, result) => {
    if(err) {
      res.status(500).send( responseLib(err, 'cannot update a given customer', null));
    }
    else {
      res.status(200).send( responseLib(null, 'Customer Updated', result));
    }
  })
})

/**
 * delete  customer
 * return, return a deleted customer as a result
 */
router.delete('/delete/:id', (req, res) => {

  customerModel.findByIdAndDelete(req.params.id, (err, result) => {
    if(err) {
      res.status(500).send( responseLib(err, 'cannot delete a given customer', null));
    }
    else {
      res.status(200).send( responseLib(null, 'Customer Deleted', result));
    }
  })
})

/**
 * delete multiple
 */
router.delete('/multiple/delete', (req, res) => {
  customerModel.deleteMany({firstName: 'phursafng'}, (err, result) => {
    if(err) {
      res.status(500).send( responseLib(err, 'cannot delete a multiple customer', null));
    }
    else {
      res.status(200).send( responseLib(null, 'Multiple Customer Deleted', result));
    }
  })
})


module.exports = router;
