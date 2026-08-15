const express = require('express')
const app = express()

app.use(express.json());

require('dotenv').config();

app.get('/', (req,res)=>{
    res.send('hello')
})

app.listen(process.env.PORT,()=>{
    console.log('running on port ', process.env.PORT)
})