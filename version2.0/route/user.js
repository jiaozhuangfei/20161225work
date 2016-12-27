var express = require('express'),
    fs = require('fs'),
    session = require('express-session'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    route = express.Router();
route.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'abc'
}));
route.use(cookieParser());
route.get('', function (req, res) {
    req.session.regSuccess = req.session.regError = '';
    //fs.createReadStream('./template/login.html').pipe(res);
    res.render('login.html', {
        title: 'Login',
        loginSuccess: req.session.loginSuccess,
        loginError: req.session.loginError
    })
});
route.post('', function (req, res) {
    req.session.loginSuccess = req.session.loginError = '';
    var data = fs.readFileSync('data.json', 'utf8');
    data = data ? JSON.parse(data) : [];
    var target = data.find(function (item) {
            return (item.username == req.body.username && item.password == req.body.password);
        });
    if(target){
        req.session.loginSuccess = '登录成功';
        if(req.body.flag){
            res.cookie('name', target.username);
        }
        res.cookie('nameValue', target.username);
        //res.redirect('/home');
    }else {
        req.session.loginError = '用户名或密码不正确，请重新输入';
    }
    res.redirect('/');
});

route.get('/reg', function (req, res) {
    req.session.loginSuccess = req.session.loginError = '';
    res.render('register.html', {
        title: 'Register',
        regSuccess: req.session.regSuccess,
        regError: req.session.regError
    })
});
route.post('/reg', function (req, res) {
    req.session.regSuccess = req.session.regError = '';
    var data = fs.readFileSync('data.json', 'utf8');
    data = data ? JSON.parse(data) : [];
    var target = data.find(function (item) {
        return (item.username == req.body.username);
    });
    if(target){
        req.session.regError = '用户名已存在';
    }else {
        req.session.regSuccess = '注册成功';
        req.body.id = data.length + 1;
        data.push(req.body);
        fs.writeFileSync('data.json', JSON.stringify(data), 'utf8');
    }
    res.redirect('/reg');
});

route.get('/home', function (req, res) {
    req.session.loginSuccess = req.session.loginError = '';
    res.render('home.html', {
        title: 'Home',
        name: req.cookies.nameValue
    });
});
module.exports = route;