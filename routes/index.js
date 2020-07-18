var express = require('express');
var router = express.Router();
var bodyParser =require('body-parser');
var mongoose=require('mongoose');
/* GET home page. */
mongoose.connect("mongodb://localhost:27017/Personaldb",(err) => {
  if (err) {
    throw err;
  }
  else {
    console.log('mongodb connected...');
  }
});
router.get('/', function(req, res, next) {
    res.render("index.html");
});

const Schema = mongoose.Schema;

const sc = mongoose.Schema({
  name:{
    type: String,
    require: true
  },
  replyTo:{
    type: String,
    require: true
  },
  subject:{
    type: String,
    require: true
  },
  message:{
    type: String,
    require: true
  }
});

const dbmodel = mongoose.model('details', sc);

router.post('/', function (req,res) {
  console.log(req.body);
  var nm=req.body.name;
  var sub =req.body.subject;
  var reply_id=req.body._replyto;
  var msg=req.body.message;
  var sent=new dbmodel();
  sent.name=nm;
  sent.replyTo=reply_id;
  sent.subject=sub;
  sent.message=msg;
  sent.save((err) => {
    if (err) {
      console.log(err);

    } else {
      console.log('Database saved');
    }
  });
  res.render("index.html");
});
module.exports = router;
