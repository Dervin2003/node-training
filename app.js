const express = require('express')
const app = express()
const port = 3000

const content=[]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about',(req,res)=>{
    res.send(content)
})
app.post('/about' ,(req,res)=>{
    content.push(1)
    res.end()
})
app.patch('/about',(req,res)=>{
    for(i=0;i<content.length;i++){
        if(content[i]===1){
            content[i]="patched"
        }
    }  
    content.push(3);
    res.end()
})
app.put('/about',(req,res)=>{
    for(i=0;i<content.length;i++){
        if(content[i]===1){
            content[i]="putted"
        }
    }  
    content.push(2)
    res.end()
})


app
    .use('/middle' , (req,res,next) => {
        console.log('I am a middleware')
        next();
    })
    .get('/middle' ,(req,res)=>{
        res.send('executed')
    })

app.get('/user/:name/user_id/:id',(req,res)=>{
    console.log(req.params)
})

app.get('/test',(req,res)=>{
    console.log(req.query)
})

app.get(/^\/a[b|d]c$/, (req, res) => {
  res.send('Matched abc or adc');
});

app.get(/^\/home\/?$/, (req, res) => {
  res.send('Flexible Home Route');
});

app.get(/^\/user\/(\d+)$/, (req, res) => {
  res.send('Flexible User Route');
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
