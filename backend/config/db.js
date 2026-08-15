const mongoose = require('mongoose');

const connection = mongoose.connect(process.env.MONGO_URL)

connection.on('connected',()=>{
    console.log('connected to mongoDB')
})

connection.on('error',(err)=>{
    console.log('error connecting to mongoDB', err)
})

connection.on('disconnected',()=>{
    console.log('disconnected from mongoDB')
})

module.exports = connection