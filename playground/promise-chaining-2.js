require('../src/db/mongoose.js')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('659a4f1c0004b961ea88e9ef').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed : false})
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })

const deleteTaskAndCount = async (id)=>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('65979d2a0b6e2c55ebf3d9ae').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})