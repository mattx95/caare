var express = require('express');
var router = express.Router();
var pg = require('pg');
var Pool = require('pg').Pool;

// Not super secure at the moment. Will switch to environmenttal variables later on.
pg.defaults.ssl = true;
var config = {
  user: 'zwvaworjsyflcb',
  database: 'dabucp2i60ed53',
  host: 'ec2-23-23-176-135.compute-1.amazonaws.com',
  password: 'D_pVMDMHWpUAiO0sY2yhj8j_mx',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};
var pool = new Pool(DATABASE_URL);




/* GET home page. List all patients */

router.get('/', function(req, res, next) {


    pool.query("SELECT * FROM Patient_Info", function (err, dbres) {
      // console.log(err);
    var fields = [];
    for (f in dbres.fields){
      fields.push(dbres.fields[f].name);
    }
    res.render('list',{title: "Patients", info:dbres.rows, fields:fields, message: "All patients listed."});
  })

});


// Patient personal info
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

//Patient Medical Info

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


// List check up history of patients
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
