const server = require('express');
const app = server();
const db = require('./database')
const bodyParser = require('body-parser');
let todoList = [];
app.use('/',server.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/makePost',function(req,res){
    console.log(req.body);
    res.sendStatus(200);
});
app.use('/delete',function(req,res){
    let ind = req.body.id;
    todoList.splice(ind,1);
    res.send(todoList);
});

// app.get('/display', function(req,res) {
//     res.send(todoList);
//
// });
app.use('/update',function(req,res){
    todoList[req.body.id]=req.body.val;
    res.send(todoList);
});

app.use('/add',function(req,res){
    console.log(req.body.todo);
    todoList.push(req.body.todo);
    res.send(todoList);
});
// app.get('/display',function(req,res){
//     db.display(function (data) {
//         res.send(data);
//     });
// })
app.listen(5000,function (req,res) {
    console.log("Server 5000");
    db.connectDb();
})