var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
// 创建 application/json 解析 
var jsonParser = bodyParser.json() 
// 创建 application/x-www-form-urlencoded 解析 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});
//基础的api路径 baseURL
var baseURL = "https://mrobot.pconline.com.cn/s-300/best/cms/listHomepagev2.xsp?"
//get :请求内容放在请求链接内
//post:放到一个对象里
//http://localhost:3000/api/jingxuan?
//req: 存储了请求信息,请求的内容会放置到req的query属性Hong Kong
app.get('/api/home',function(req,res){
    var sectionId = req.query.sectionId;
    var pageNo = req.query.pageNo;
    var pageSize = req.query.pageSize;
    var url = `${baseURL}sectionId=${sectionId}&pageNo=${pageNo}&pageSize=${pageSize}`
    // 在node服务器中向其他的服务器发起请求
    // console.log(url);
    request(url, function (error, response, body) {
        res.send(body);
    });
})

// 轮播图
app.get('/api/focus',function(req,res){
    var focusList = "https://mrobot.pconline.com.cn/s-300/best/cms/listFocus.xsp?platform=ios&v=3.3.0&inReview=0"
    request(focusList,function(error, response, body){
        res.send(body);
    });
})
//分类页面
app.get('/api/category',function(req,res){
    var categoryURL = "https://mrobot.pconline.com.cn/s-3600/best/search/classfyIndex.xsp?type=1&platform=ios&v=3.3.0&inReview=0";
    request(categoryURL,function(error,response,body){
        res.send(body);
    })
})

//搜索功能
app.get('/api/search',function(req,res){
    var searchValue = req.query.searchValue;
    var searchURL = `https://mrobot.pconline.com.cn/s-300/best/search/listTopicSearch.xsp?searchCondition=${searchValue}&sectionId=0&searchType=4&pageNo=1&pageSize=20`
    // console.log(usearchValue);
    console.log(encodeURI(searchURL));
    request(encodeURI(searchURL),function(error,response,body){
        res.send(body);
    })
})

// post请求和get请求在服务器端的处理方式是不一样的,所以需要特殊的插件来
// 处理post请求,post请求的数据会存储到req.body对象里
app.post('/login',urlencodedParser,function(req,res){
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var responseData = {"username": username,"message":"请求成功"};
    if(username == "admin" && password=='123'){
        res.send(responseData);
    }
})
app.listen(3000,function(req,res){
    console.log("在浏览器中输入 http://localhost:3000");
})