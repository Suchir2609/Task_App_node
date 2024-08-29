const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')


// const me = new User({
//     name: '         rahul   ',
//     email: 'RAHUL@GMAIL.COM       ',
//     password:'test123'
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })


// const task = new Tasks({
//     description : '   make lunch',
// })

// task.save().then(()=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log('Error')
// })