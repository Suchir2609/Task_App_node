require('../src/db/mongoose')
const User = require('../src/models/user')

//6598e919f3616c719999e07a 

// User.findByIdAndUpdate('6598edaba4742ce33f3045f4', {age: 1}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age : 1})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeAndCount = async (id, age)=>{
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('6598edaba4742ce33f3045f4', 2).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})