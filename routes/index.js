var express = require('express');
var router = express.Router();
var pg = require('pg');
var Pool = require('pg').Pool;
var config = {
  user: 'caareuser', //env var: PGUSER
  database: 'caaredb', //env var: PGDATABASE
  password: 'cs316', //env var: PGPASSWORD
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var pool = new Pool(config)




/* GET home page. */

router.get('/', function(req, res, next) {


    pool.query("SELECT * FROM Patient_Info", function (err, dbres) {
      // console.log(dbres);
    var fields = [];
    for (f in dbres.fields){
      fields.push(dbres.fields[f].name);
    }
    res.render('list',{title: "Patients", info:dbres.rows, fields:fields, message: "All patients listed."});
  })

});
router.get('/personal', function(req, res, next) {
  var id = req.query.id;
  console.log(parseInt(id));
  if(!Number.isInteger(parseInt(id))){
    	return res.redirect('/');
  }else{
    var id = req.query.id;
    // console.log(id);
    pool.query("SELECT * FROM patient_info WHERE patient_id = '" + id + "'", function (err, dbres) {
    if (err) console.log(err)
    // console.log(dbres);
    if (dbres.rows.length > 0){
    var fields = [];
    for (f in dbres.fields){
      fields.push(dbres.fields[f].name);
    }
    // console.log(fields);
    res.render('personal', {id:id,  info: dbres.rows[0], fields: fields });
  } else{
    pool.query("SELECT * FROM patient_info", function (err, dbres) {
    var fields = [];
    for (f in dbres.fields){
      fields.push(dbres.fields[f].name);
    }
    res.render('list',{title: "Patients", info:dbres.rows, fields:fields, message: "Patient not found. All patients listed."});
    }
  )}
})
}});

router.get('/medical', function(req, res, next) {
  if(req.query.id == null){
    	return res.redirect('/');
  }else{
    var id = req.query.id;
    // console.log(id);
    pool.query("SELECT * FROM Patient_Medical_Info WHERE patient_id = '" + id + "'", function (err, dbres) {
    if (err) console.log(err)
    // console.log(dbres.fields[0]);
    var fields = [];
    for (f in dbres.fields){
      fields.push(dbres.fields[f].name);
    }
    console.log(dbres.rows[0]);
    res.render('medical', { id:id, info: dbres.rows[0], fields: fields });
  })
}
});



router.get('/checkuphistory', function(req, res, next) {
  if(req.query.id == null){
    	return res.redirect('/');
  }else{
    var id = req.query.id;
    // console.log(id);
    pool.query("SELECT * FROM checkup_info WHERE patient_id = '" + id + "'", function (err, dbres) {
    if (err) console.log(err)

    var fields = [];
    for (f in dbres.fields){
      fields.push(dbres.fields[f].name);
    }
    // console.log(dbres);
  res.render('checkuphistory', {id:id, info: dbres.rows, fields: fields });
  })

    }
});


router.get('/newcheckup', function(req,res,next){

  res.render('tbi');
})

router.get('/newpatient', function(req,res,next){

  res.render('tbi');
})


module.exports = router;
