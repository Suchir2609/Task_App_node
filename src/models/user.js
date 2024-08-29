const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        //index:true,
        required : true,
        trim : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    password:{
        type: String,
        required : true,
        trim : true,
        minLength : 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("password should not contain 'password'")
            }
        }
    },
    tokens:[{
        token:{
            type: String,
            required : true,
        }
    }],
    avatar:{
        type: Buffer,
    }
}, {
    timestamps: true
})

userSchema.virtual('tasks',{
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function (){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({_id: user.id.toString()},'thisismynewcourse')
    
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({ email })

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

//hashing password
userSchema.pre('save', async function (next){
    const user = this 

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)

    }

    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User
