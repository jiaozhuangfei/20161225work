var express = require('express'),
    router = express.Router(),
    session = require('express-session'),
    users = [];
router.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'zfpx'
}));
router.get('/signup', function (req, res) {
    res.render('signup', {
        title: '用户注册',
        error: req.session.errorUp,
        success: req.session.successUp
    });
});

router.post('/signup', function (req, res) {
    req.session.errorIn = req.session.successIn = '';
    req.session.errorUp = req.session.successUp = '';
    var user = req.body;
    var flag = users.find(function (item) {
        return (item.username == user.username)
    });
    if (flag) {
        req.session.errorUp = '账号已存在，请重新输入';
    }else {
        req.session.successUp = '注册成功';
        users.push(user);
    }
    res.redirect('/user/signup');
});

router.get('/signin', function (req, res) {
    res.render('signin', {
        title: '用户登录',
        error: req.session.errorIn,
        success: req.session.successIn
    });
});
router.post('/signin', function (req, res) {
    req.session.errorUp = req.session.successUp = '';
    var user = req.body;
    var existUser = users.find(function (item) {
        return (user.username == item.username && user.password == item.password);
    });
    if (existUser) {
        req.session.successIn = '登录成功';
        req.session.username = user.username;
        res.redirect('/user/welcome');
    } else {
        req.session.errorIn = '账号或密码有误，请重新输入';
        res.redirect('/user/signIn');
    }
});
router.get('/welcome', function (req, res) {
    res.render('welcome', {
        title: '欢迎页',
        username: req.session.username
    });
});
module.exports = router;