var express = require('express');
var router = express.Router();
var users = [];
router.get('/signup',function(req,res){
  res.render('signup',{title:'用户注册'});
});

router.post('/signup',function(req,res){
     var user = req.body;
     users.push(user);
     res.redirect('/user/signin');
});
router.get('/signin',function(req,res){
    res.render('signin',{title:'用户登录'});
});
router.post('/signin',function(req,res){
  var user = req.body;
  var existUser = users.find(function(item){
        return user.username == item.username && user.password == item.password;
  });
  if(existUser){
      res.redirect('/user/welcome');
  }else{
      res.redirect('/user/signin');
  }
});
router.get('/welcome',function(req,res){
    res.render('welcome',{title:'欢迎页'});
});
module.exports = router;