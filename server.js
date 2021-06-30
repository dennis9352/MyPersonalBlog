const express = require('express')
const app = express()
const port = 3000

// 몽고db 붕어빵 틀
const connect = require('./schemas')
connect();

// 바디,json,media 데이터
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'));

// 라우터
const postsRouter = require("./routers/posts");
app.use("/api", [postsRouter]);

app.use((req, res, next) => {
    console.log(req);
    next();
});



// 템플릿 엔진
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// 각종 url
app.get('/', (req, res) => {
    res.render('home');
})

app.get('/write', (req, res) => {
    res.render('write');
})

app.get('/read', (req, res) => {
    res.render('read');
})

app.get('/list', (req, res) => {
    res.render('list');
})

app.get('/edit', (req, res) => {
    res.render('edit');
})


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })
  