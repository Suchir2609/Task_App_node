const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const multer = require('multer')

const upload = multer({
    dest: 'videos'
})

app.post('/upload', upload.single('upload'),(req,res)=>{
    res.send()
})

app.listen (port, ()=>{
    console.log('server is running on port '+port)
})