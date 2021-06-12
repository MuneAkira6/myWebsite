const express = require('express');
var exec = require('child_process').exec;
const fs = require('fs');
const querystring = require('querystring');
var url = require('url');
//1.创建服务器
var app = express()

//2.路由

//使静态文件可被访问
app.use('/public', express.static('public'));
//允许跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    // res.header('Content-Type', 'application/json;charset=utf-8');
    next();
  });

app.get('/', (req, res) => {//初始化
    //首页
    res.sendFile( __dirname + "/view/" + "index.html" );
    //执行python文件夹里的脚本
    console.log('我正在执行py脚本，稍等');
    exec('python3 /root/实战/setence_motion_cls/bert_predict.py');
})
app.get('/bert', (req, res) => {
    res.sendFile( __dirname + "/view/" + "bert.html" );
    console.log('进来了');
})
app.get('/apple', (req, res) => {
    res.sendFile( __dirname + "/view/" + "apple.html" );
    // console.log('进来了');
})
app.get('/fake-bilibili', (req, res) => {
    res.sendFile( __dirname + "/view/" + "fake-bilibili.html" );
})

app.use('/search', (req, res) => {//这儿应该使用use
    var currentUrl = req.url;
    var paramObj = url.parse(currentUrl, true).query;//字典
    console.log('开始写文件');
    var ws = fs.createWriteStream('./input.txt', 'utf-8');
    ws.write(paramObj.keywords);//写入了输入的关键词
    ws.end();
    //文件写入结束
    console.log('文件写入成功');
    //等待一段时间，使python那边写入完成
    setTimeout(function() {
        data = fs.readFileSync('./output.txt', 'utf8');
    
        res.send(data.toString());
    }, 5000);
    
})
//3.启动服务
app.listen(80, () => {
    console.log('Server run at localhost:80');
})
