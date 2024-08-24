const express = require('express')
const userRouter = require('./src/routes/userRouter')
const taskRouter = require('./src/routes/taskRouter')
const connectToDb = require('./src/configs/db')


const app = express()
app.use(express.json())

const URL = process.env.URL
const PORT = process.env.PORT || 6000

app.get('/home' , (req, res) =>{
    try {
        console.log("home");
        res.status(200).json("this is ho,e  route")
    } catch (err) {
        res.status(500).json(err.message)
    }
})

//routes
app.use('/users', userRouter)
app.use('/tasks' , taskRouter)

app.listen(PORT , async () =>{
    try {
        await connectToDb(URL)
console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        
    }
})