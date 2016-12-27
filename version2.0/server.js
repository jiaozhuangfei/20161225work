var express = require('express'),
    route = require('./route/user'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express();
app.set('view engine', 'html');
app.set('views', path.resolve('template'));
app.engine('html', require('ejs').__express);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', route);
//静态文件设置
app.use(express.static(path.resolve()));
app.use(express.static(path.resolve('template')));
app.listen(8080, function () {
    console.log('8080');
});